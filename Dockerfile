# Set master image

FROM php:7.4-fpm-alpine


# Set working directory
WORKDIR /home/holomia/manager_device

# Install Additional dependencies
RUN apk update && apk add --no-cache \
    build-base shadow supervisor

# Add and Enable PHP-PDO Extenstions for PHP connect Mysql
RUN apk add --no-cache zip libzip-dev
RUN docker-php-ext-configure zip
RUN docker-php-ext-install zip
RUN docker-php-ext-install pdo pdo_mysql 
RUN docker-php-ext-install json 
RUN docker-php-ext-install session
# This extension required for Laravel Horizon
RUN docker-php-ext-install pcntl

# Remove Cache
RUN rm -rf /var/cache/apk/*

COPY .docker/supervisord.conf /etc/supervisord.conf
COPY .docker/supervisor.d /etc/supervisor.d
COPY package.json package.json

# Use the default production configuration for PHP-FPM ($PHP_INI_DIR variable already set by the default image)
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"


# Add UID '1000' to www-data
RUN usermod -u 1000 www-data
RUN chmod -R 777 /home/holomia/manager_device

# Copy existing application directory
COPY . .

# Chang app directory permission
RUN chown -R www-data:www-data .

ENV ENABLE_WORKER 1
ENTRYPOINT ["sh", "/home/holomia/manager_device/.docker/docker-entrypoint.sh"]



CMD supervisord -n -c /etc/supervisord.conf