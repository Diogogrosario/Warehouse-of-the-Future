<?php

use App\Http\Controllers\ProductRackController;
use App\Http\Controllers\ResultController;
use Illuminate\Support\Facades\Route;

Route::get('/', 'App\Http\Controllers\HomeController@index');

Route::get('/filters', function () {
    return view('metrics_filter');
})->name('filters');

Route::get('/layouts', [ProductRackController::class, 'show'])->name('layouts');

Route::resource('results', ResultController::class)->only('show');
