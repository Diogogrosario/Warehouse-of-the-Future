<?php

use Illuminate\Support\Facades\Route;
use ..\..\

Route::get('/', '../Home@index');

//Route::get('/', function () {
//    return view('home');
//});

Route::get('/filters', function () {
    return view('metrics_filter');
})->name('filters');

Route::get('/layouts', function () {
    return view('layout');
})->name('layouts');
