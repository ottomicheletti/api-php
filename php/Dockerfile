FROM php:8.1-apache
WORKDIR /var/www/html
RUN apt-get update && \
    docker-php-ext-install mysqli pdo pdo_mysql
