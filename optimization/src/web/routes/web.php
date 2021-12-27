<?php

use App\Http\Controllers\ProductRackController;
use App\Http\Controllers\ResultController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::get('/filters', function () {
    return view('metrics_filter');
})->name('filters');

Route::get('/layouts', [ProductRackController::class, 'show'])->name('layouts');

Route::resource('results', ResultController::class)->only('show');
