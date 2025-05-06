<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\DashboardClientController;


//1-ROUTE REGISTRATION ET LOGIN

       //1-1 Client

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');



//1-2 pharmacie
Route::post('/register/pharmacie', [AuthController::class, 'registerPharmacie']);
Route::post('/login/pharmacie', [AuthController::class, 'loginPharmacie']);


//1-3 admin
Route::post('/create-first-admin', [AuthController::class, 'createFirstAdmin']);
Route::post('/register/admin', [AuthController::class, 'registerAdmin']);

// Connexion (login)
// Les routes protégées nécessitent l'auth via Sanctum
Route::middleware('auth:sanctum')->group(function () {


    //Connecter une pharmacie
   
    // Récupérer les informations de la pharmacie connectée
    Route::get('/pharmacie', [AuthController::class, 'getPharmacieInfo']);
    
    // Enregistrement admin (protégé)
    
    Route::post('/login/admin', [AuthController::class, 'login']);

    // (exemple) Récupérer les rôles de l'utilisateur connecté
    Route::get('/roles', [AuthController::class, 'getUserRoles']);
    
    // Déconnexion (optionnel)
    Route::post('/logout', [AuthController::class, 'logout']);
});







Route::get('/produits', [ProduitController::class, 'index']);
Route::get('/produits/{id}', [ProduitController::class, 'show']);


//route dashboardclient

// ... existing code ...

// Routes pour le dashboard client
Route::middleware(['auth:sanctum'])->group(function () {
    // Récupérer les données du dashboard
    Route::get('/dashboard/data', [DashboardClientController::class, 'getDashboardData']);
    
    // Gestion des commandes
    Route::get('/commandes/{id}', [DashboardClientController::class, 'getCommandeDetails']);
    
    // Gestion des favoris
    Route::post('/favoris', [DashboardClientController::class, 'addToFavorites']);
    Route::delete('/favoris/{id}', [DashboardClientController::class, 'removeFromFavorites']);
    
    // Gestion du profil
    Route::put('/profile', [DashboardClientController::class, 'updateProfile']);
    
    // Gestion des adresses
    Route::post('/adresses', [DashboardClientController::class, 'addAddress']);
    Route::put('/adresses/{id}', [DashboardClientController::class, 'updateAddress']);
    Route::delete('/adresses/{id}', [DashboardClientController::class, 'deleteAddress']);
});

// ... existing code ...

// ... existing code ...

// Routes pour le dashboard client
Route::middleware(['auth:sanctum'])->group(function () {
    // Recherche
    Route::get('/search', [DashboardClientController::class, 'search']);
    
    // Récupérer les données du dashboard
    Route::get('/dashboard/data', [DashboardClientController::class, 'getDashboardData']);
    
    // Gestion des commandes
    Route::post('/commandes', [DashboardClientController::class, 'passerCommande']);
    Route::get('/commandes/{id}', [DashboardClientController::class, 'getCommandeDetails']);
    
    // Gestion des favoris
    Route::post('/favoris', [DashboardClientController::class, 'addToFavorites']);
    Route::delete('/favoris/{id}', [DashboardClientController::class, 'removeFromFavorites']);
    
    // Gestion du profil
    Route::put('/profile', [DashboardClientController::class, 'updateProfile']);
    
    // Gestion des adresses
    Route::post('/adresses', [DashboardClientController::class, 'addAddress']);
    Route::put('/adresses/{id}', [DashboardClientController::class, 'updateAddress']);
    Route::delete('/adresses/{id}', [DashboardClientController::class, 'deleteAddress']);
});

// ... existing code ...