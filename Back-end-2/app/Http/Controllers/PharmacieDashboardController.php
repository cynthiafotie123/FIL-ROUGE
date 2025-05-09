<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;
use App\Models\Commande;
use App\Models\Paiement;
use Illuminate\Support\Facades\Auth;

class PharmacieDashboardController extends Controller
{
    public function dashboard()
    {
        $pharmacieId = Auth::id();
        return response()->json([
            'produits' => Produit::where('pharmacie_id', $pharmacieId)->count(),
            'commandes' => Commande::where('pharmacie_id', $pharmacieId)->count(),
        ]);
    }

    // Produits
    public function indexProduits()
    {
        return Produit::where('pharmacie_id', Auth::id())->get();
    }

    public function storeProduit(Request $request)
    {
        $request->validate([
            'nom' => 'required',
            'prix' => 'required|numeric',
            'quantite' => 'required|integer'
        ]);

        return Produit::create([
            'nom' => $request->nom,
            'prix' => $request->prix,
            'quantite' => $request->quantite,
            'pharmacie_id' => Auth::id()
        ]);
    }

    public function showProduit($id)
    {
        return Produit::where('id', $id)
                      ->where('pharmacie_id', Auth::id())
                      ->firstOrFail();
    }

    public function updateProduit(Request $request, $id)
    {
        $produit = Produit::where('id', $id)->where('pharmacie_id', Auth::id())->firstOrFail();
        $produit->update($request->all());
        return $produit;
    }

    public function destroyProduit($id)
    {
        $produit = Produit::where('id', $id)->where('pharmacie_id', Auth::id())->firstOrFail();
        $produit->delete();
        return response()->json(['message' => 'Produit supprimé']);
    }

    // Commandes
    public function indexCommandes()
    {
        return Commande::where('pharmacie_id', Auth::id())->get();
    }

    public function updateCommande(Request $request, $id)
    {
        $commande = Commande::where('id', $id)->where('pharmacie_id', Auth::id())->firstOrFail();
        $commande->update($request->all());
        return $commande;
    }

    // Paiements
    public function indexPaiements()
    {
        return Paiement::where('pharmacie_id', Auth::id())->get();
    }

    public function updatePaiement(Request $request, $id)
    {
        $paiement = Paiement::where('id', $id)->where('pharmacie_id', Auth::id())->firstOrFail();
        $paiement->update($request->all());
        return $paiement;
    }
}

