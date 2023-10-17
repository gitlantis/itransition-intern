FROM ubuntu:20.04
RUN apt update
RUN apt-get install nginx -y
COPY ./files/* /var/www/html
EXPOSE  80
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]