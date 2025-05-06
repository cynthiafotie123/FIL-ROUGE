<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\DashboardController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');




//Route::post('/register', [AuthController::class, 'register']);
//Route::post('/login', [AuthController::class, 'login']);

/*Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Routes protégées pour clients
    Route::middleware('role:client')->prefix('client')->group(function () {
        // Routes spécifiques aux clients
    });
    
    // Routes protégées pour admins
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        // Routes spécifiques aux admins
    });
    
    // Routes protégées pour pharmacies
    Route::middleware('role:pharmacie')->prefix('pharmacie')->group(function () {
        // Routes spécifiques aux pharmacies
    });
});*/
// routes/api.php

// Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

// Administration des rôles (réservé aux admins)
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::post('/users/{user}/assign-role', [AdminController::class, 'assignRole']);
    Route::get('/roles', [AdminController::class, 'getRoles']);
    Route::get('/users', [AdminController::class, 'getUsersWithRoles']);
});

// Routes pour le dashboard client
Route::middleware(['auth:sanctum'])->group(function () {
    // Recherche
    Route::get('/search', [DashboardController::class, 'search']);
    
    // Récupérer les données du dashboard
    Route::get('/dashboard/data', [DashboardController::class, 'getDashboardData']);
    
    // Gestion des commandes
    Route::post('/commandes', [DashboardController::class, 'passerCommande']);
    Route::get('/commandes/{id}', [DashboardController::class, 'getCommandeDetails']);
    
    // Gestion des favoris
    Route::post('/favoris', [DashboardController::class, 'addToFavorites']);
    Route::delete('/favoris/{id}', [DashboardController::class, 'removeFromFavorites']);
    
    // Gestion du profil
    Route::put('/profile', [DashboardController::class, 'updateProfile']);
    
    // Gestion des adresses
    Route::post('/adresses', [DashboardController::class, 'addAddress']);
    Route::put('/adresses/{id}', [DashboardController::class, 'updateAddress']);
    Route::delete('/adresses/{id}', [DashboardController::class, 'deleteAddress']);
});