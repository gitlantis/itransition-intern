# 1. AWS ClaudFormation

Our concept is creating following architecture:

![Alt text](assets/image-1.png)

This is best place for starters. developer can make architecture from graphical interface

![Alt text](assets/image.png)

however I have created using script. I have three stacks for my nested stack template:
1. ```networking.yml``` - network creating stack template
2. ```security-group.yml``` - security group creats security groups for services 
3. ```instances-and-lb.yml``` - stack for instance and load balancer creating template

all sources are in the ```AWSClaudFormation``` folder

![Alt text](assets/image-2.png)

our load balancer template will return balancer dns url:  

![Alt text](assets/image-3.png)

and this is our result from load balancer

![Alt text](assets/image-4.png)

# 2. Terraform

1. initalize terraform template:

```terraform init```

2. check plans what will be changed:

```terraform plan```

3. apply changes to Amazon cloud:

```terraform apply```

subnet and whole VPC is created

![Alt text](assets/image-5.png)

and this is output from terraform script with public dns name:

![Alt text](assets/image-6.png)

if we missed up dns name, we can retake output value using this command:

```terraform output load_balancer_dns_name```

autoscaler returning response from first instance

![Alt text](assets/image-7.png)

and this is result ater stoping first instance

![Alt text](assets/image-8.png)

and last task is destroying all resources:

```terraform destroy```