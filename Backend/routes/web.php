<?php

use App\Http\Controllers\SSRController;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Admin CSR Route
Route::get('/admin/{any?}', function () {
    return View::make('csr');
})->where('any', '.*');

// SSR or Frontend Route
Route::get('/{any}', [SSRController::class, 'index'])->where('any', '.*')->middleware(HandleInertiaRequests::class);
