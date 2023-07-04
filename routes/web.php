<?php

use App\Http\Controllers\Admin\PermisionsController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ApkFileController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ApplicationDefaultController;
use App\Http\Controllers\AppWindowController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\WifiController;
use App\Http\Controllers\Payment\PackageController;
use App\Http\Controllers\Payment\PricingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Payment\OnePayController;
use Inertia\Inertia;
use App\Http\Controllers\Payment\BillManager;
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

Route::get('language/{language}', function ($language) {
    Session()->put('locale', $language);

    return redirect()->back();
})->name('language');
// Route::get('/topup', function () {
//     return Inertia::render('topup');
// })->middleware(['auth'])->name('topup');

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
            Route::post('update-users',  [UserController::class, 'updateUsers'])->name('update-users');
        });

        Route::prefix('user')->as('user.')->group(function () {
            Route::prefix('{id}/detail')->as('detail.')->group(function () {
                Route::get('', [UserController::class, 'detail'])->name('index');
                Route::get('devices', [UserController::class, 'list_device'])->name('devices');
            });
            Route::prefix('{id}/devices')->as('devices.')->group(function () {
                Route::get('', [UserController::class, 'list_device'])->name('index');
                Route::get('history', [UserController::class, 'history_login'])->name('history');
            });
        });


        Route::prefix('groups')->as('group.')->group(function () {
            Route::get('', [GroupController::class, 'index'])->name('index');
            Route::post('', [GroupController::class, 'store'])->name('store');
            Route::put('/update/{id}', [GroupController::class, 'update'])->name('update');

            Route::post('/{id}/ownerDevice', [GroupController::class, 'ownerDevice'])->name('ownerDevice');
            Route::post('/deleteOwnerDevice/{id}', [GroupController::class, 'deleteOwnerDevice'])->name('deleteOwnerDevice');
            Route::get('/devices/{id}', [GroupController::class, 'getDeviceGourps'])->name('device');
            Route::delete('/delete/{id}', [GroupController::class, 'delete'])->name('destroy');

            Route::post('default-app/{id}', [GroupController::class, 'setAppDefaultGroup'])->name('default-app');
            Route::post('runAppGoup/{id}', [GroupController::class, 'runAppGoup'])->name('runAppGoup');
        });

        Route::prefix('devices')->as('device.')->group(function () {
            Route::get('', [DeviceController::class, 'index'])->name('index');
            Route::put('/saveName/{id}', [DeviceController::class, 'saveName'])->name('saveName');
            Route::delete('/delete/{id}', [DeviceController::class, 'delete'])->name('destroy');
            Route::post('/launchApp', [DeviceController::class, 'launchApp'])->name('launchApp');
            Route::post('/setDefaultApp', [DeviceController::class, 'setDefaultApp'])->name('setDefaultApp');
            Route::post('connectWifi', [DeviceController::class, 'connectWifi'])->name('connectWifi');
            Route::get('disableDefaultApp/{id}', [DeviceController::class, 'disableDefaultApp'])->name('disableDefaultApp');

            Route::post('checkDevice', [DeviceController::class, 'checkDevice'])->name('checkDevice');
            Route::post('checkActiveDevice', [DeviceController::class, 'checkActiveDevice'])->name('checkActiveDevice');
            Route::post('changeEnabled', [DeviceController::class, 'changeEnabled'])->name('enabled');
        });

        Route::prefix('applications')->as('application.')->group(function () {
            Route::get('', [ApplicationController::class, 'index'])->name('index');
         
            Route::post('get', [ApplicationController::class, 'applications']);
        });

        Route::prefix('default-application')->as('default-application.')->group(function () {
            Route::get('', [ApplicationDefaultController::class, 'index'])->name('index');
            Route::post('', [ApplicationDefaultController::class, 'store'])->name('store');
            Route::put('update/{app}', [ApplicationDefaultController::class, 'update'])->name('update');;
            Route::delete('delete/{app}', [ApplicationDefaultController::class, 'delete'])->name('delete');
        });


        Route::prefix('wifis')->as('wifi.')->group(function () {
            Route::get('', [WifiController::class, 'index'])->name('index');
            Route::post('', [WifiController::class, 'store'])->name('store');
            Route::put('update/{id}', [WifiController::class, 'update'])->name('update');
            Route::delete('delete/{id}', [WifiController::class, 'delete'])->name('delete');
        });

        Route::prefix('packages')->as('package.')->group(function () {
            Route::get('list', [PackageController::class, 'index'])->name('index');
            Route::post('', [PackageController::class, 'store'])->name('store');
            Route::put('update/{id}', [PackageController::class, 'update'])->name('update');
            Route::delete('delete/{id}', [PackageController::class, 'delete'])->name('delete');
            Route::post('changeState', [PackageController::class, 'changeState'])->name('changeState');
            Route::post('sort', [PackageController::class, 'sort'])->name('sort');
        });
        Route::prefix('payment')->as('payment.')->group(function () {
            Route::get('index', [BillManager::class, 'index'])->name('index');
            Route::get('order', [OnePayController::class, 'paidgate'])->name('order');
            Route::get('response_order', [OnePayController::class, 'responsePaymentOrder'])->name('response_order');
        });
        Route::prefix('topup')->as('topup.')->group(function () {
            Route::get('', [PricingController::class, 'index'])->name('index');
            Route::post('free', [PricingController::class, 'free'])->name('free');
            Route::post('addToCart', [PricingController::class, 'addToCart'])->name('addToCart');
            Route::post('updateCart', [PricingController::class, 'updateCart'])->name('updateCart');
            Route::get('order_final', [PricingController::class, 'getOrderfinal'])->name('order_final');
            Route::get('gate', [PricingController::class, 'gate'])->name('gate');
            Route::get('checkout', [PricingController::class, 'checkout'])->name('checkout');
            Route::get('response', [PricingController::class, 'response'])->name('response');
            Route::get('response_paypal', [PricingController::class, 'response_paypal'])->name('response_paypal');
        });
        Route::prefix('apk')->as('apk.')->group(function () {
            Route::get('list', [ApkFileController::class, 'index'])->name('index');
            Route::post('store', [ApkFileController::class, 'store'])->name('store');
            Route::post('update/{id}', [ApkFileController::class, 'update'])->name('update');
            Route::delete('delete/{id}', [ApkFileController::class, 'delete'])->name('delete');
            Route::post('install', [ApkFileController::class, 'installApk'])->name('install');
            Route::post('uninstall', [ApkFileController::class, 'UninstallApk'])->name('uninstall');
        });

        Route::prefix('window-app')->as('window-app.')->group(function () {
            Route::get('list', [AppWindowController::class, 'index'])->name('index');
            Route::post('store', [AppWindowController::class, 'store'])->name('store');
            Route::post('update/{app}', [AppWindowController::class, 'update'])->name('update');
            Route::delete('delete/{app}', [AppWindowController::class, 'delete'])->name('delete');
        });

        Route::get('convert', [ApplicationController::class, 'convert']);
    }
);
require __DIR__ . '/auth.php';
