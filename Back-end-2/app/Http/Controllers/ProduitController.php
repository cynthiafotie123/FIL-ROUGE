<?php

//namespace App\Http\Controllers;

//use Illuminate\Http\Request;
//use App\Models\Produit;
//use Illuminate\Support\Facades\DB;


/*{
    // Recherche de produits avec filtres
    public function search(Request $request)
    {
        $query = Produit::query();

        // Filtrer par catégorie (champ texte)
        if ($request->filled('category')) {
            $query->where('categorie', 'like', "%{$request->category}%");
        }

        // Recherche par nom ou description
        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('nom', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        // Filtrer par disponibilité en pharmacie via la table stock
        if ($request->filled('id_Pharmacie')) {
            $query->whereExists(function ($subquery) use ($request) {
                $subquery->select(DB::raw(1))
                    ->from('stocks')
                    ->whereColumn('stocks.id_produit', 'produits.id_produit')
                    ->where('stock.id_Pharmacie', $request->pharmacy_id)
                    ->where('stock.quantite', '>', 0);
            });
        }

        // Pagination des résultats
        $products = $query->paginate($request->input('per_page', 5));

        return response()->json($products);
    }

    // Récupérer un produit par son ID avec info stock en pharmacie
    public function show($id)
    {
        $product = Product::findOrFail($id);

        // Pharmacies ayant ce produit en stock
        $stockInfo = DB::table('stock')
            ->join('pharmacies', 'stock.id_Pharmacie', '=', 'pharmacies.id_Pharmacie')
            ->where('stock.id_produit', $id)
            ->where('stock.quantite', '>', 0)
            ->select(
                'pharmacies.id_Pharmacie',
                'pharmacies.nom',
                'pharmacies.telephone',
                'pharmacies.adresse',
                'pharmacies.latitude',
                'pharmacies.longitude',
                'pharmacies.horaire_d_ouverture',
                'pharmacies.horaire_fermeture',
                'stock.quantite',
                
            )
            ->orderBy('stock.quantite', 'asc')
            ->get();

        return response()->json([
            'produit' => $product,
            'available_in_pharmacies' => $stockInfo
        ]);
    }

    // Renvoyer toutes les catégories distinctes
    public function categories()
    {
        $categories = Product::select('categorie')
            ->whereNotNull('categorie')
            ->distinct()
            ->pluck('categorie');

        return response()->json($categories);
    }
}*/
// app/Http/Controllers/Api/Client/ProduitController.php
namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;


class ProduitController extends Controller
{
    public function index(Request $request)
    {
        $query = Produit::query();

        if ($request->has('search')) {
            $search = strtolower($request->input('search'));

            $query->where(DB::raw('LOWER(nom)'), 'like', '%' . $search . '%')
                  ->orWhere(DB::raw('LOWER(description)'), 'like', '%' . $search . '%');
           
        }

        return response()->json($query->get());
    }

    public function show($id)
    {
        return response()->json(Produit::find($id));
    }
}

