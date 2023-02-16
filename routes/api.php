<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\WifiController;
use App\Models\Devices;
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
        Route::get('getDevice/{id}',[DeviceController::class ,'getDevice']);
        Route::post('device',[DeviceController::class ,'store']);
        Route::post('default-app',[DeviceController::class ,'default_app']);
        Route::post('getUser',[AuthController::class,'getUserByToken']);

        Route::get('getActiveDevice/{id}', [DeviceController::class, 'getActiveDevice']);
    });

    // Route::get('getDevices', function(){
    //     return Devices::get();
    // });
    Route::post('create-user',[AuthController::class,'create_user']);
    
    Route::put('update-user',[AuthController::class,'update_user']);
});