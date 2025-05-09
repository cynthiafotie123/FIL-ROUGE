<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\DashboardClientController;
use App\Http\Controllers\PharmacieValidationController;
use App\Http\Controllers\AdminController;
use App\Models\Role;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\PharmacieController;
use App\Http\Controllers\PharmacieTestController;
use App\Models\Pharmacie;
use App\Http\Controllers\PharmacieDashboardController;



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
Route::middleware('auth:sanctum')->post('/register-admin', [AuthController::class, 'registerAdmin']);


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

// Routes pour la validation des pharmacies
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/pending-pharmacies', [PharmacieValidationController::class, 'getPendingPharmacies']);
    Route::post('/admin/validate-pharmacie/{id}', [PharmacieValidationController::class, 'validatePharmacie']);
    Route::post('/admin/reject-pharmacie/{id}', [PharmacieValidationController::class, 'rejectPharmacie']);
});

// ... existing code ...

// Routes pour l'administration
// Dans routes/api.php
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index']);
        // Autres routes admin...
    });


    // Dashboard
    // Dashboard
   
    
    // Gestion des produits
    Route::post('/produits', [AdminDashboardController::class, 'storeProduit']);
    
    // Gestion des pharmacies
    Route::post('/pharmacies', [AdminDashboardController::class, 'storePharmacie']);
    Route::delete('/pharmacies/{id}', [AdminDashboardController::class, 'deletePharmacie']);
    
    // Gestion des commandes
    Route::put('/commandes/{id}', [AdminDashboardController::class, 'updateCommande']);
    
    // Gestion des paiements
    Route::put('/paiements/{id}', [AdminDashboardController::class, 'updatePaiement']);
    
    // Gestion des utilisateurs
    Route::get('/users', [AdminController::class, 'getUsers']);
    Route::get('/users/{id}', [AdminController::class, 'getUser']);
    Route::put('/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
    
    // Gestion des pharmacies
    Route::get('/pharmacies', [AdminController::class, 'getPharmacies']);
    Route::get('/pharmacies/{id}', [AdminController::class, 'getPharmacie']);
    Route::put('/pharmacies/{id}', [AdminController::class, 'updatePharmacie']);
    Route::delete('/pharmacies/{id}', [AdminController::class, 'deletePharmacie']);
    
    // Validation des pharmacies
    Route::get('/pending-pharmacies', [PharmacieValidationController::class, 'getPendingPharmacies']);
    Route::post('/validate-pharmacie/{id}', [PharmacieValidationController::class, 'validatePharmacie']);
    Route::post('/reject-pharmacie/{id}', [PharmacieValidationController::class, 'rejectPharmacie']);
    
    // Statistiques et rapports
    Route::get('/stats', [AdminController::class, 'getStats']);
    Route::get('/reports/sales', [AdminController::class, 'getSalesReport']);
    Route::get('/reports/users', [AdminController::class, 'getUsersReport']);


// ... existing code ...

Route::get('/pharmacies-search/search', [PharmacieController::class, 'search']);


//dashboardpharmacie


Route::middleware(['auth:sanctum'])->prefix('pharmacie')->group(function () {
    Route::get('/dashboard', [PharmacieDashboardController::class, 'dashboard']);

    // CRUD Produits
    Route::get('/produits', [PharmacieDashboardController::class, 'indexProduits']);
    Route::post('/produits', [PharmacieDashboardController::class, 'storeProduit']);
    Route::get('/produits/{id}', [PharmacieDashboardController::class, 'showProduit']);
    Route::put('/produits/{id}', [PharmacieDashboardController::class, 'updateProduit']);
    Route::delete('/produits/{id}', [PharmacieDashboardController::class, 'destroyProduit']);

    // Commandes liées à la pharmacie
    Route::get('/commandes', [PharmacieDashboardController::class, 'indexCommandes']);
    Route::put('/commandes/{id}', [PharmacieDashboardController::class, 'updateCommande']);

    // Paiements liés aux produits de la pharmacie
    Route::get('/paiements', [PharmacieDashboardController::class, 'indexPaiements']);
    Route::put('/paiements/{id}', [PharmacieDashboardController::class, 'updatePaiement']);
});
