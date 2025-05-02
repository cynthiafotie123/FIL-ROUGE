<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ClientAuthController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\Auth\PharmacieAuthController;
use App\Http\Controllers\Auth\BaseAuthController;
use App\Http\Controllers\Auth\CheckRole;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return view('welcome');
});

// Routes pour les clients
Route::prefix('client')->name('client.')->group(function () {
    Route::middleware('guest:client')->group(function () {
        Route::get('/login', [ClientAuthController::class, 'showLoginForm'])->name('login');
        Route::post('/login', [ClientAuthController::class, 'login']);
        Route::get('/register', [ClientAuthController::class, 'showRegisterForm'])->name('register');
        Route::post('/register', [ClientAuthController::class, 'register']);
        
        // Routes Socialite
        Route::get('/login/{provider}', [ClientAuthController::class, 'redirectToProvider'])->name('social.redirect');
        Route::get('/login/{provider}/callback', [ClientAuthController::class, 'handleProviderCallback'])->name('social.callback');
    });

    Route::middleware(['auth:client', 'role:client'])->group(function () {
        Route::get('/dashboard', function () {
            return view('client.dashboard');
        })->name('dashboard');
        Route::post('/logout', [ClientAuthController::class, 'logout'])->name('logout');
    });
});

// Routes pour les admins
Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest:admin')->group(function () {
        Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('login');
        Route::post('/login', [AdminAuthController::class, 'login']);
    });

    Route::middleware(['auth:admin', 'role:admin'])->group(function () {
        Route::get('/dashboard', function () {
            return view('admin.dashboard');
        })->name('dashboard');
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
    });
});

// Routes pour les pharmacies
Route::prefix('pharmacie')->name('pharmacie.')->group(function () {
    Route::middleware('guest:pharmacie')->group(function () {
        Route::get('/login', [PharmacieAuthController::class, 'showLoginForm'])->name('login');
        Route::post('/login', [PharmacieAuthController::class, 'login']);
        Route::get('/register', [PharmacieAuthController::class, 'showRegisterForm'])->name('register');
        Route::post('/register', [PharmacieAuthController::class, 'register']);
    });

    Route::middleware(['auth:pharmacie', 'role:pharmacie'])->group(function () {
        Route::get('/dashboard', function () {
            return view('pharmacie.dashboard');
        })->name('dashboard');
        Route::post('/logout', [PharmacieAuthController::class, 'logout'])->name('logout');
    });
});