<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'App\Http\Controllers\HomeController@index');

Route::get('/filters', function () {
    return view('metrics_filter');
})->name('filters');

Route::get('/layouts', function () {
    return view('layout');
})->name('layouts');
