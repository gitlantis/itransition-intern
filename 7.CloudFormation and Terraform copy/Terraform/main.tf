terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.26.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
}

resource "aws_default_route_table" "public" {
  default_route_table_id = aws_vpc.main.default_route_table_id
}

resource "aws_route" "public" {
  route_table_id         = aws_vpc.main.default_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

resource "aws_subnet" "public_subnet1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "eu-central-1a"
  map_public_ip_on_launch = true
}

resource "aws_route_table_association" "subnet_association1" {
  subnet_id      = aws_subnet.public_subnet1.id
  route_table_id = aws_default_route_table.public.id
}

resource "aws_subnet" "public_subnet2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "eu-central-1b"
  map_public_ip_on_launch = true
}

resource "aws_route_table_association" "subnet_association2" {
  subnet_id      = aws_subnet.public_subnet2.id
  route_table_id = aws_default_route_table.public.id
}

resource "aws_security_group" "web_sg" {
  name        = "Web Security Group"
  description = "Web Security Group"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["82.215.106.214/32"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "lb_sg" {
  name        = "Load Balancer Security Group"
  description = "Load Balancer Security Group"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elb" "main" {
  name     = "LoadBalancer"
  subnets  = [aws_subnet.public_subnet1.id, aws_subnet.public_subnet2.id]
  internal = false
  listener {
    instance_port     = 80
    instance_protocol = "HTTP"
    lb_port           = 80
    lb_protocol       = "HTTP"
  }
  health_check {
    target              = "HTTP:80/"
    interval            = 5
    timeout             = 3
    unhealthy_threshold = 2
    healthy_threshold   = 2
  }
  security_groups = [aws_security_group.lb_sg.id]
}

resource "aws_launch_configuration" "main" {
  name            = "LaunchConfiguration"
  image_id        = "ami-06dd92ecc74fdfb36"
  instance_type   = "t2.micro"
  key_name        = "balancer-key"
  security_groups = [aws_security_group.web_sg.id]
  user_data       = <<-EOF
                    #!/bin/bash
                    apt update -y
                    apt install -y nginx
                    echo "<br><h1> Instance <br> <b>$(ip address | grep 10.0)</b> </h1>" >> /var/www/html/index.html
                    service nginx start
                    EOF
}

resource "aws_autoscaling_group" "main" {
  desired_capacity     = 2
  min_size             = 2
  max_size             = 4
  vpc_zone_identifier  = [aws_subnet.public_subnet1.id, aws_subnet.public_subnet2.id]
  launch_configuration = aws_launch_configuration.main.id
  load_balancers       = [aws_elb.main.name]
}

output "load_balancer_dns_name" {
  value = aws_elb.main.dns_name
}
