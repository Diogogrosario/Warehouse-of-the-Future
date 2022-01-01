<?php

use App\Http\Controllers\CommunicationController;
use App\Http\Controllers\ProductRackController;
use App\Http\Controllers\ResultController;
use Illuminate\Support\Facades\Route;

Route::get('/', 'App\Http\Controllers\HomeController@index')->name('home');

Route::get('/layouts', [ProductRackController::class, 'show'])->name('layouts');

Route::resource('results', ResultController::class)->only('show');

Route::post('/layouts', [CommunicationController::class, 'communicate'])->name('communication.communicate');
