<?php

use App\Http\Controllers\Admin\PermisionsController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\WifiController;
use App\Http\Controllers\Payment\PackageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Payment\OnePayController;
use Inertia\Inertia;

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
    return redirect('/login');
});
Route::get('/test', function () {
    return view('socket');
});
Route::get('/route', function () {
    return Inertia::render('Index');
})->name('route');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/topup', function () {
    return Inertia::render('topup');
})->middleware(['auth'])->name('topup');

Route::middleware(['auth'])->group(
    function () {
        Route::prefix('permissions')->as('permissions.')->group(function () {
            Route::get('', [PermisionsController::class, 'index'])->name('index');
            Route::post('', [PermisionsController::class, 'store'])->name('store');
            Route::put('/update/{id}', [PermisionsController::class, 'update'])->name('update');
            Route::delete('/delete/{id}', [PermisionsController::class, 'delete'])->name('delete');
        });

        Route::prefix('roles')->as('roles.')->group(function () {
            Route::get('', [RoleController::class, 'index'])->name('index');
            Route::post('', [RoleController::class, 'store'])->name('store');
            Route::put('/update/{id}', [RoleController::class, 'update'])->name('update');
            Route::delete('/delete/{id}', [RoleController::class, 'delete'])->name('delete');
        });

        Route::prefix('users')->as('users.')->group(function () {
            Route::get('', [UserController::class, 'index'])->name('index');
            Route::post('', [UserController::class, 'store'])->name('store');
            Route::put('/update/{id}', [UserController::class, 'update'])->name('update');
            Route::delete('/delete/{id}', [UserController::class, 'destroy'])->name('destroy');

            Route::post('import',  [UserController::class, 'importUser'])->name('import');
        });

        Route::prefix('groups')->as('group.')->group(function () {
            Route::get('', [GroupController::class, 'index'])->name('index');
            Route::post('', [GroupController::class, 'store'])->name('store');
            Route::put('/update/{id}', [GroupController::class, 'update'])->name('update');

            Route::post('/{id}/ownerDevice', [GroupController::class, 'ownerDevice'])->name('ownerDevice');
            Route::post('/deleteOwnerDevice/{id}', [GroupController::class, 'deleteOwnerDevice'])->name('deleteOwnerDevice');
            Route::get('/devices/{id}', [GroupController::class, 'getDeviceGourps'])->name('device');
            Route::delete('/delete/{id}', [GroupController::class, 'destroy'])->name('destroy');

            Route::post('default-app/{id}',[GroupController::class,'setAppDefaultGroup'])->name('default-app');
            Route::post('runAppGoup/{id}',[GroupController::class,'runAppGoup'])->name('runAppGoup');
        });

        Route::prefix('devices')->as('device.')->group(function () {
            Route::get('', [DeviceController::class, 'index'])->name('index');
            Route::put('/saveName/{id}', [DeviceController::class, 'saveName'])->name('saveName');
            Route::delete('/delete/{id}', [DeviceController::class, 'delete'])->name('destroy');
            Route::post('/lanchApp', [DeviceController::class, 'lanchApp'])->name('lanchApp');
            Route::post('/setDefaultApp', [DeviceController::class, 'setDefaultApp'])->name('setDefaultApp');
            Route::post('connectWifi',[DeviceController::class ,'connectWifi'])->name('connectWifi');
        });

        Route::prefix('applications')->as('application.')->group(function () {
            Route::get('', [ApplicationController::class, 'index'])->name('index');
            Route::post('changeDefault', [ApplicationController::class,'changeDefault'])->name('default');
        });

        Route::prefix('wifis')->as('wifi.')->group(function () {
            Route::get('', [WifiController::class, 'index'])->name('index');
            Route::post('',[WifiController::class ,'store'])->name('store');
            Route::put('update/{id}',[WifiController::class ,'update'])->name('update');
            Route::delete('delete/{id}',[WifiController::class ,'delete'])->name('delete');

        });

        Route::prefix('packages')->as('package.')->group(function(){
            Route::get('list',[PackageController::class,'index'])->name('index');
        });
        Route::prefix('payment')->as('payment.')->group(function(){
            Route::get('order',[OnePayController::class,'postDataPayment'])->name('order');
            Route::get('response_order',[OnePayController::class,'responsePaymentOrder'])->name('response_order');
        });

    }
);
require __DIR__ . '/auth.php';
