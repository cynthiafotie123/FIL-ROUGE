<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Produit;
use App\Models\Stock;
use App\Models\Commande;
use App\Models\Pharmacie;
use App\Models\Authentification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdminDashboardController extends Controller
{
    // Dashboard principal
    public function index()
    {
        // Statistiques
        $totalClientsConnectes = Authentification::distinct('user_id')->count();
        $totalProduits = Produit::count();
        $produitsEnStock = Stock::where('quantite', '>', 0)->count();
        $totalCommandes = Commande::count();
        
        // Données détaillées
        $commandes = Commande::with(['user:id,user_id,nom,email', 'produit:id_produit,nom_produit,prix'])
            ->orderBy('created_at', 'desc')
            ->get();

        $pharmacies = Pharmacie::with('commandes')
            ->orderBy('nom', 'asc')
            ->get();

        $topProduits = Stock::with('produit:id_produit,nom_produit')
            ->where('quantite', '>', 0)
            ->orderBy('quantite', 'desc')
            ->take(5)
            ->get();

        return response()->json([
            'stats' => [
                'totalUsers' => $totalClientsConnectes,
                'totalProducts' => $totalProduits,
                'productsInStock' => $produitsEnStock,
                'totalOrders' => $totalCommandes
            ],
            'data' => [
                'orders' => $commandes,
                'pharmacies' => $pharmacies,
                'topProducts' => $topProduits
            ]
        ]);
    }

    // Gestion des produits
    public function storeProduit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'prix' => 'required|numeric|min:0',
            'quantite' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $photoPath = $request->file('photo')->store('produits', 'public');

        $produit = Produit::create([
            'nom_produit' => $request->nom,
            'description' => $request->description,
            'photo' => $photoPath,
            'prix' => $request->prix
        ]);

        Stock::create([
            'produit_id' => $produit->id_produit,
            'quantite' => $request->quantite
        ]);

        return response()->json(['message' => 'Produit créé avec succès', 'produit' => $produit]);
    }

    // Gestion des pharmacies
    public function storePharmacie(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'adresse' => 'required|string',
            'telephone' => 'required|string',
            'email' => 'required|email|unique:pharmacies,email'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pharmacie = Pharmacie::create($request->all());
        return response()->json(['message' => 'Pharmacie créée avec succès', 'pharmacie' => $pharmacie]);
    }

    public function deletePharmacie($id)
    {
        $pharmacie = Pharmacie::findOrFail($id);
        $pharmacie->delete();
        return response()->json(['message' => 'Pharmacie supprimée avec succès']);
    }

    // Gestion des commandes
    public function updateCommande(Request $request, $id)
    {
        $commande = Commande::findOrFail($id);
        $commande->statut = $request->statut;
        $commande->save();
        return response()->json(['message' => 'Statut de commande mis à jour avec succès']);
    }

    // Gestion des paiements
    public function updatePaiement(Request $request, $id)
    {
        $commande = Commande::findOrFail($id);
        $commande->statut_paiement = $request->statut_paiement;
        $commande->save();
        return response()->json(['message' => 'Statut de paiement mis à jour avec succès']);
    }
}


