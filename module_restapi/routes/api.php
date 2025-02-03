<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

Route::prefix('v1')->group(function(){

    Route::apiResource('user', UserController::class);

    Route::apiResource('games', GamesController::class);

    Route::post('/signin', [AuthController::class, 'SignIn']);
    Route::post('/signup', [AuthController::class, 'SignUp']);
});
