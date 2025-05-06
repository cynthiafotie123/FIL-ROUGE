<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Authentification;
use App\Models\Pharmacie;
use App\Models\Produit;
use App\Models\Stock;
use App\Models\Commande;
use App\Models\Paiement;
use App\Models\Favori;
use App\Models\Adresse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Rechercher des produits ou des pharmacies
     */
    public function search(Request $request)
    {
        try {
            $query = $request->input('query');
            
            // Recherche des produits
            $produits = Produit::where(function($q) use ($query) {
                    $q->where('nom', 'like', "%{$query}%")
                      ->orWhere('description', 'like', "%{$query}%");
                })
                ->with(['stocks' => function($q) {
                    $q->with('pharmacie');
                }])
                ->get();

            // Recherche des pharmacies
            $pharmacies = Pharmacie::where('nom', 'like', "%{$query}%")
                ->with(['stocks' => function($q) {
                    $q->with('produit');
                }])
                ->get();

            return response()->json([
                'produits' => $produits,
                'pharmacies' => $pharmacies
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la recherche',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer les données du dashboard client
     */
    public function getDashboardData()
    {
        try {
            $auth = Auth::user();
            $utilisateur = $auth->utilisateur;
            
            // Récupérer les commandes récentes avec les produits et le paiement
            $commandes = Commande::where('utilisateur_id', $utilisateur->id_utilisateur)
                ->with(['produits' => function($query) {
                    $query->with(['images', 'stocks' => function($q) {
                        $q->with('pharmacie');
                    }]);
                }, 'paiement'])
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();

            // Récupérer les produits favoris
            $favoris = Favori::where('utilisateur_id', $utilisateur->id_utilisateur)
                ->with(['produit' => function($query) {
                    $query->with(['images', 'stocks' => function($q) {
                        $q->with('pharmacie');
                    }]);
                }])
                ->get();

            // Récupérer les adresses
            $adresses = Adresse::where('utilisateur_id', $utilisateur->id_utilisateur)->get();

            return response()->json([
                'auth' => [
                    'id' => $auth->id_auth,
                    'email' => $auth->email,
                    'utilisateur' => $utilisateur,
                    'roles' => $auth->utilisateur->roles->pluck('role_name')->toArray()
                ],
                'commandes' => $commandes,
                'favoris' => $favoris,
                'adresses' => $adresses
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des données',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Passer une commande
     */
    public function passerCommande(Request $request)
    {
        try {
            DB::beginTransaction();

            $request->validate([
                'produits' => 'required|array',
                'produits.*.id' => 'required|exists:produits,id',
                'produits.*.quantite' => 'required|integer|min:1',
                'adresse_id' => 'required|exists:adresses,id',
                'paiement' => 'required|array',
                'paiement.montant' => 'required|numeric|min:0',
                'paiement.methode' => 'required|string',
                'paiement.details' => 'required|array'
            ]);

            $auth = Auth::user();
            $utilisateur = $auth->utilisateur;
            $total = 0;

            // Vérifier la disponibilité des produits
            foreach ($request->produits as $produit) {
                $stock = Stock::where('produit_id', $produit['id'])
                    ->where('quantite', '>=', $produit['quantite'])
                    ->first();

                if (!$stock) {
                    throw new \Exception("Produit non disponible en quantité suffisante");
                }

                $total += $stock->prix * $produit['quantite'];
            }

            // Créer le paiement
            $paiement = Paiement::create([
                'montant' => $total,
                'methode' => $request->paiement['methode'],
                'details' => $request->paiement['details'],
                'statut' => 'en_attente'
            ]);

            // Créer la commande
            $commande = Commande::create([
                'utilisateur_id' => $utilisateur->id_utilisateur,
                'adresse_id' => $request->adresse_id,
                'paiement_id' => $paiement->id,
                'total' => $total,
                'statut' => 'en_attente'
            ]);

            // Ajouter les produits à la commande
            foreach ($request->produits as $produit) {
                $commande->produits()->attach($produit['id'], [
                    'quantite' => $produit['quantite'],
                    'prix_unitaire' => Stock::where('produit_id', $produit['id'])->first()->prix
                ]);

                // Mettre à jour le stock
                Stock::where('produit_id', $produit['id'])
                    ->decrement('quantite', $produit['quantite']);
            }

            DB::commit();

            return response()->json([
                'message' => 'Commande passée avec succès',
                'commande' => $commande->load(['produits', 'paiement'])
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors de la commande',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer les détails d'une commande
     */
    public function getCommandeDetails($id)
    {
        try {
            $auth = Auth::user();
            $utilisateur = $auth->utilisateur;

            $commande = Commande::where('id', $id)
                ->where('utilisateur_id', $utilisateur->id_utilisateur)
                ->with(['produits' => function($query) {
                    $query->with(['images', 'stocks' => function($q) {
                        $q->with('pharmacie');
                    }]);
                }, 'paiement', 'adresse'])
                ->firstOrFail();

            return response()->json($commande);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Commande non trouvée',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Ajouter un produit aux favoris
     */
    public function addToFavorites(Request $request)
    {
        try {
            $request->validate([
                'produit_id' => 'required|exists:produits,id'
            ]);

            $auth = Auth::user();
            $utilisateur = $auth->utilisateur;

            $favori = Favori::create([
                'utilisateur_id' => $utilisateur->id_utilisateur,
                'produit_id' => $request->produit_id
            ]);

            return response()->json([
                'message' => 'Produit ajouté aux favoris',
                'favori' => $favori->load('produit')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de l\'ajout aux favoris',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer un produit des favoris
     */
    public function removeFromFavorites($id)
    {
        try {
            $auth = Auth::user();
            $utilisateur = $auth->utilisateur;

            $favori = Favori::where('id', $id)
                ->where('utilisateur_id', $utilisateur->id_utilisateur)
                ->firstOrFail();

            $favori->delete();

            return response()->json([
                'message' => 'Produit retiré des favoris'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression des favoris',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour les informations du profil
     */
    public function updateProfile(Request $request)
    {
        try {
            $request->validate([
                'nom' => 'required|string|max:255',
                'email' => 'required|email|unique:authentifications,email,' . Auth::id() . ',id_auth',
                'telephone' => 'required|string|max:20'
            ]);

            $auth = Auth::user();
            $utilisateur = $auth->utilisateur;

            // Mettre à jour l'authentification
            $auth->update([
                'email' => $request->email
            ]);

            // Mettre à jour l'utilisateur
            $utilisateur->update([
                'nom' => $request->nom,
                'telephone' => $request->telephone
            ]);

            return response()->json([
                'message' => 'Profil mis à jour avec succès',
                'auth' => [
                    'id' => $auth->id_auth,
                    'email' => $auth->email,
                    'utilisateur' => $utilisateur,
                    'roles' => $auth->utilisateur->roles->pluck('role_name')->toArray()
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Ajouter une nouvelle adresse
     */
    public function addAddress(Request $request)
    {
        try {
            $request->validate([
                'rue' => 'required|string|max:255',
                'ville' => 'required|string|max:255',
                'code_postal' => 'required|string|max:10',
                'pays' => 'required|string|max:255'
            ]);

            $auth = Auth::user();
            $utilisateur = $auth->utilisateur;

            $adresse = Adresse::create([
                'utilisateur_id' => $utilisateur->id_utilisateur,
                'rue' => $request->rue,
                'ville' => $request->ville,
                'code_postal' => $request->code_postal,
                'pays' => $request->pays
            ]);

            return response()->json([
                'message' => 'Adresse ajoutée avec succès',
                'adresse' => $adresse
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de l\'ajout de l\'adresse',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mettre à jour une adresse
     */
    public function updateAddress(Request $request, $id)
    {
        try {
            $request->validate([
                'rue' => 'required|string|max:255',
                'ville' => 'required|string|max:255',
                'code_postal' => 'required|string|max:10',
                'pays' => 'required|string|max:255'
            ]);

            $auth = Auth::user();
            $utilisateur = $auth->utilisateur;

            $adresse = Adresse::where('id', $id)
                ->where('utilisateur_id', $utilisateur->id_utilisateur)
                ->firstOrFail();

            $adresse->update($request->only(['rue', 'ville', 'code_postal', 'pays']));

            return response()->json([
                'message' => 'Adresse mise à jour avec succès',
                'adresse' => $adresse
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour de l\'adresse',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Supprimer une adresse
     */
    public function deleteAddress($id)
    {
        try {
            $auth = Auth::user();
            $utilisateur = $auth->utilisateur;

            $adresse = Adresse::where('id', $id)
                ->where('utilisateur_id', $utilisateur->id_utilisateur)
                ->firstOrFail();

            $adresse->delete();

            return response()->json([
                'message' => 'Adresse supprimée avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression de l\'adresse',
                'error' => $e->getMessage()
            ], 500);
        }
    }
} 