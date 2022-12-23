<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\WifiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'v1'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('applications',[ApplicationController::class ,'saveApplication']);
    Route::middleware('jwt.refresh')->get('/token/refresh', [AuthController::class, 'refresh']);
    Route::group(['middleware' => 'jwt.verify'], function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('getDevice',[DeviceController::class ,'getDevice']);
        Route::post('device',[DeviceController::class ,'store']);
    });
});