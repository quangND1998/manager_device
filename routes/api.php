<?php

use App\Http\Controllers\Api\AppLaucher\ApiController;
use App\Http\Controllers\Api\AppLaucher\AppController;
use App\Http\Controllers\Api\AppLaucher\AppWindowController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PermisssionController;
use App\Http\Controllers\DeviceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;

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
        Route::get('language/{language}', function ($language) {
            // Session()->put('locale', $language);
            app()->setLocale($language);
            return response()->json('Successfully', 200);
        });
        Route::get('dashboard', [ApiController::class, 'dashboard']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('getDevice/{id}', [DeviceController::class, 'getDevice']);
        Route::post('device', [DeviceController::class, 'store']);
        Route::post('default-app', [DeviceController::class, 'default_app']);
        Route::post('getUser', [AuthController::class, 'getUserByToken']);
        Route::get('user', [AuthController::class, 'user']);
        
        Route::get('getActiveDevice/{id}', [DeviceController::class, 'getActiveDevice']);

        Route::put('active-device/{id}', [DeviceController::class, 'activeDevice']);


        Route::get('permissions', [PermisssionController::class, 'index']);
        Route::post('permission', [PermisssionController::class, 'store']);
        Route::get('permission/{id}', [PermisssionController::class, 'get']);
        Route::put('permission/{id}/update', [PermisssionController::class, 'update']);
        Route::delete('permission/delete/{id}', [PermisssionController::class, 'delete']);

        Route::prefix('devices')->as('devices.')->group(function () {
            Route::get('', [ApiController::class, 'devices'])->name('devices');
            Route::get('/{id}/show', [ApiController::class, 'showDevice'])->name('show');
            
            Route::put('{id}/edit-name', [ApiController::class, 'saveName'])->name('saveName');

            Route::delete('{id}/delete', [ApiController::class, 'delete'])->name('delete');
            Route::post('/setDefaultApp', [ApiController::class, 'setDefaultApp'])->name('setDefaultApp');
            Route::post('checkDevice', [ApiController::class, 'checkDevice'])->name('checkDevice');
            Route::post('checkActiveDevice', [ApiController::class, 'checkActiveDevice'])->name('checkActiveDevice');
            Route::get('{id}/disableDefaultApp', [ApiController::class, 'disableDefaultApp'])->name('disableDefaultApp');
            Route::post('launchApp', [ApiController::class, 'launchApp'])->name('launchApp');
            Route::post('checkDevice', [ApiController::class, 'checkDevice'])->name('checkDevice');
            Route::post('checkActiveDevice', [ApiController::class, 'checkActiveDevice'])->name('checkActiveDevice');
        });
        Route::prefix('applications')->as('app.')->group(function () {

            Route::post('/get', [AppController::class, 'applications'])->name('index');
        });

        Route::prefix('application')->as('app.')->group(function () {

            Route::post('/devices', [AppController::class, 'devices'])->name('devices');
        });
        Route::prefix('group')->as('api-group.')->group(function () {
         
            Route::get('devices', [GroupController::class, 'devices'])->name('devices');
            Route::get('', [GroupController::class, 'getGroups']);
            Route::get('{id}', [GroupController::class, 'groupById']);
            Route::post('{id}', [GroupController::class, 'groupByIdwithApp']);
            Route::post('', [GroupController::class, 'store'])->name('store');
            Route::put('/update/{id}', [GroupController::class, 'update'])->name('update');

            Route::post('/{id}/ownerDevice', [GroupController::class, 'ownerDevice'])->name('ownerDevice');
            Route::post('/deleteOwnerDevice/{id}', [GroupController::class, 'deleteOwnerDevice'])->name('deleteOwnerDevice');
            Route::get('/devices/{id}', [GroupController::class, 'getDeviceGourps'])->name('device');
            Route::delete('/delete/{id}', [GroupController::class, 'delete'])->name('destroy');

            Route::post('default-app/{id}', [GroupController::class, 'setAppDefaultGroup'])->name('default-app');
            Route::post('runAppGoup/{id}', [GroupController::class, 'runAppGoup'])->name('runAppGoup');
        });

        Route::prefix('window-app')->as('window-app.')->group(function () {
            Route::get('', [AppWindowController::class, 'index']);
            Route::get('{id}/show', [AppWindowController::class, 'show']);
            Route::post('', [AppWindowController::class, 'store']);
            Route::post('/update/{app}', [AppWindowController::class, 'update']);
            Route::delete('/delete/{app}', [AppWindowController::class, 'delete']);
        });
    });


    // Route::get('getDevices', function(){
    //     return Devices::get();
    // });
    Route::post('create-user', [AuthController::class, 'create_user']);

    Route::put('update-user', [AuthController::class, 'update_user']);
});
