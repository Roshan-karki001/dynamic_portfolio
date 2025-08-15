<?php

use App\Http\Controllers\Api\Admin\ContactMessageController;
use App\Http\Controllers\Api\Admin\ProjectController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\TechnologyController;
use App\Http\Controllers\Api\PortfolioController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('login', [AuthController::class, 'login']);

Route::get('/user-details', [PortfolioController::class, 'userDetails']);
Route::get('/technologies', [PortfolioController::class, 'technologies']);
Route::get('/projects', [PortfolioController::class, 'projects']);
Route::post('/message', [PortfolioController::class, 'message']);

Route::prefix('admin')->middleware(['auth:api'])->group(function () {
    Route::apiResource('technologies', TechnologyController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::get('/messages', [ContactMessageController::class, 'index']);
    Route::delete('/messages/{id}', [ContactMessageController::class, 'destroy']);
    Route::get('/user/info', [UserController::class, 'getInfo']);
    Route::post('/user/update-personal-info', [UserController::class, 'updatePersonalInfo']);
    Route::post('/user/update-password', [UserController::class, 'updatePassword']);
    Route::post('/user/update-social-links', [UserController::class, 'updateSocialMediaLinks']);
    Route::post('/user/upload-photo', [UserController::class, 'uploadPhoto']);
});
