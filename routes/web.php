<?php

use App\Http\Controllers\Admin\PermisionsController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
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
    return Inertia::render('Index');
});
Route::get('/route', function () {
    return Inertia::render('Index');
})->name('route');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');


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
            // Route::post('import/user',  [UserController::class, 'import'])->name('import');
        });
    }
);
require __DIR__ . '/auth.php';
