#!/bin/bash  

composer install

php artisan db:wipe

php artisan db:seed &

npm install

npm run prod &

php-fpm -F