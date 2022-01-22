#!/bin/bash  

php artisan db:wipe

php artisan db:seed

composer install &

npm install &

npm run prod &

php-fpm -F