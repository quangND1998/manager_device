<?php

use App\Http\Controllers\Admin\PermisionsController;
use App\Http\Controllers\Api\AppLaucher\ApiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PermisssionController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\WifiController;
use App\Models\Devices;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\HTTP\Controllers\Api\AppLaucher\apiAppController;
use App\Http\Controllers\Api\AppLaucher\GroupController;

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
    Route::post('applications', [ApplicationController::class, 'saveApplication']);
    Route::middleware('jwt.refresh')->get('/token/refresh', [AuthController::class, 'refresh']);

    Route::group(['middleware' => 'jwt.verify'], function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('getDevice/{id}', [DeviceController::class, 'getDevice']);
        Route::post('device', [DeviceController::class, 'store']);
        Route::post('default-app', [DeviceController::class, 'default_app']);
        Route::post('getUser', [AuthController::class, 'getUserByToken']);

        Route::get('getActiveDevice/{id}', [DeviceController::class, 'getActiveDevice']);

        Route::put('active-device/{id}', [DeviceController::class, 'activeDevice']);


        Route::get('permissions', [PermisssionController::class, 'index']);
        Route::post('permission', [PermisssionController::class, 'store']);
        Route::get('permission/{id}', [PermisssionController::class, 'get']);
        Route::put('permission/{id}/update', [PermisssionController::class, 'update']);
        Route::delete('permission/delete/{id}', [PermisssionController::class, 'delete']);

        Route::prefix('devices')->as('devices.')->group(function () {
            Route::get('', [ApiController::class, 'devices'])->name('devices');

            Route::put('{id}/edit-name', [ApiController::class, 'saveName'])->name('saveName');

            Route::delete('{id}/delete', [ApiController::class, 'delete'])->name('delete');
            Route::post('/setDefaultApp', [ApiController::class, 'setDefaultApp'])->name('setDefaultApp');
            Route::post('checkDevice', [ApiController::class, 'checkDevice'])->name('checkDevice');
            Route::post('checkActiveDevice', [ApiController::class, 'checkActiveDevice'])->name('checkActiveDevice');
            Route::get('{id}/disableDefaultApp', [ApiController::class, 'disableDefaultApp'])->name('disableDefaultApp');
            Route::post('/lanchApp', [ApiController::class, 'lanchApp'])->name('lanchApp');
        });
        // Route::prefix('applications')->as('applications.')->group(function () {
        //     Route::post('list', [apiAppController::class, 'applications'])->name('list');
        // });


        Route::prefix('groups')->as('group.')->group(function () {
            Route::get('', [GroupController::class, 'getGroups']);
        });
    });


    // Route::get('getDevices', function(){
    //     return Devices::get();
    // });
    Route::post('create-user', [AuthController::class, 'create_user']);

    Route::put('update-user', [AuthController::class, 'update_user']);
});
