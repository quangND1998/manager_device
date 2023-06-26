<?php

use App\Http\Controllers\Admin\PermisionsController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PermisssionController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\GameController;
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


        Route::get('permissions',[PermisssionController::class,'index']);
        Route::post('permission',[PermisssionController::class,'store']);
        Route::get('permission/{id}',[PermisssionController::class,'get']);
        Route::put('permission/{id}/update',[PermisssionController::class,'update']);
        Route::delete('permission/delete/{id}',[PermisssionController::class,'delete']);
        // room
        Route::get('room',[RoomController::class,'index']);
        Route::post('room/store',[RoomController::class,'store']);
        Route::post('room/update/{id}',[RoomController::class,'update']);
        Route::delete('room/delete/{id}',[RoomController::class,'delete']);

        // event
        Route::get('events',[EventController::class,'index']);
        Route::post('event/store',[EventController::class,'store']);
        Route::post('event/update/{id}',[EventController::class,'update']);
        Route::delete('event/delete/{id}',[EventController::class,'delete']);

        // game
        Route::get('game',[GameController::class,'index']);
    });


    // Route::get('getDevices', function(){
    //     return Devices::get();
    // });
    Route::post('create-user',[AuthController::class,'create_user']);
    
    Route::put('update-user',[AuthController::class,'update_user']);
});