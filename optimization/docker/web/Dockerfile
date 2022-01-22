FROM composer:1.10 as composerBoot

WORKDIR /app/

COPY ./src/web/composer.* .

RUN composer install --no-autoloader

FROM php:7.4-fpm

COPY --from=composerBoot /usr/bin/composer /usr/bin/composer

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libfreetype6-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN apt-get update && \
    apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd


RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -

RUN apt-get -y install nodejs

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath

RUN docker-php-ext-install sockets

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Set working directory
WORKDIR /var/www

USER $user

CMD ./startup.sh