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

class DashboardClientController extends Controller
{
    /**
     * Rechercher des produits ou des pharmacies
     */
    public function search(Request $request)
    {
        try {
            $query = $request->input('query');
        
            // Recherche des produits (insensible à la casse)
            $produits = Produit::where(function($q) use ($query) {
                    $q->whereRaw('LOWER(nom) LIKE LOWER(?)', ["%{$query}%"])
                      ->orWhereRaw('LOWER(description) LIKE LOWER(?)', ["%{$query}%"]);
                })
                ->with(['stocks' => function($q) {
                    $q->with('pharmacie');
                }, 'images'])
                ->get();
    
            // Recherche des pharmacies (insensible à la casse)
            $pharmacies = Pharmacie::whereRaw('LOWER(nom) LIKE LOWER(?)', ["%{$query}%"])
                ->with(['stocks' => function($q) {
                    $q->with('produit');
                }])
                ->get();

            // Formater les données pour faciliter l'affichage
            $produitsFormattes = $produits->map(function($produit) {
                $pharmaciesDisponibles = $produit->stocks->map(function($stock) {
                    return [
                        'id' => $stock->pharmacie->id,
                        'nom' => $stock->pharmacie->nom,
                        'adresse' => $stock->pharmacie->adresse,
                        'latitude' => $stock->pharmacie->latitude,
                        'longitude' => $stock->pharmacie->longitude,
                        'quantite_disponible' => $stock->quantite,
                        'prix' => $stock->prix,
                    ];
                });
                
                return [
                    'id' => $produit->id,
                    'nom' => $produit->nom,
                    'description' => $produit->description,
                    'prix_moyen' => $produit->stocks->avg('prix'),
                    'images' => $produit->images,
                    'pharmacies' => $pharmaciesDisponibles,
                    'disponible' => $pharmaciesDisponibles->count() > 0
                ];
            });

            $pharmaciesFormattees = $pharmacies->map(function($pharmacie) {
                return [
                    'id' => $pharmacie->id,
                    'nom' => $pharmacie->nom,
                    'adresse' => $pharmacie->adresse,
                    'telephone' => $pharmacie->telephone,
                    'email' => $pharmacie->email,
                    'latitude' => $pharmacie->latitude,
                    'longitude' => $pharmacie->longitude,
                    'produits_disponibles' => $pharmacie->stocks->filter(function($stock) {
                        return $stock->quantite > 0;
                    })->count()
                ];
            });

            return response()->json([
                'produits' => $produitsFormattes,
                'pharmacies' => $pharmaciesFormattees
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la recherche',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Récupérer les détails d'un produit
     */
    public function getProduitDetails($id)
    {
        try {
            $produit = Produit::with(['images', 'stocks' => function($q) {
                $q->with('pharmacie');
            }])->findOrFail($id);

            $pharmaciesDisponibles = $produit->stocks->map(function($stock) {
                return [
                    'id' => $stock->pharmacie->id,
                    'nom' => $stock->pharmacie->nom,
                    'adresse' => $stock->pharmacie->adresse,
                    'latitude' => $stock->pharmacie->latitude,
                    'longitude' => $stock->pharmacie->longitude,
                    'quantite_disponible' => $stock->quantite,
                    'prix' => $stock->prix,
                    'stock_id' => $stock->id
                ];
            });

            $produitDetails = [
                'id' => $produit->id,
                'nom' => $produit->nom,
                'description' => $produit->description,
                'prix_moyen' => $produit->stocks->avg('prix'),
                'images' => $produit->images,
                'pharmacies' => $pharmaciesDisponibles,
                'disponible' => $pharmaciesDisponibles->count() > 0
            ];

            return response()->json($produitDetails);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Produit non trouvé',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Récupérer les détails d'une pharmacie
     */
    public function getPharmacieDetails($id)
    {
        try {
            $pharmacie = Pharmacie::with(['stocks' => function($q) {
                $q->where('quantite', '>', 0)->with('produit.images');
            }])->findOrFail($id);

            $produitsDisponibles = $pharmacie->stocks->map(function($stock) {
                return [
                    'id' => $stock->produit->id,
                    'nom' => $stock->produit->nom,
                    'description' => $stock->produit->description,
                    'prix' => $stock->prix,
                    'quantite_disponible' => $stock->quantite,
                    'images' => $stock->produit->images,
                    'stock_id' => $stock->id
                ];
            });

            $pharmacieDetails = [
                'id' => $pharmacie->id,
                'nom' => $pharmacie->nom,
                'adresse' => $pharmacie->adresse,
                'telephone' => $pharmacie->telephone,
                'email' => $pharmacie->email,
                'latitude' => $pharmacie->latitude,
                'longitude' => $pharmacie->longitude,
                'horaires' => $pharmacie->horaires,
                'produits' => $produitsDisponibles
            ];

            return response()->json($pharmacieDetails);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Pharmacie non trouvée',
                'error' => $e->getMessage()
            ], 404);
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
            $commandes = Commande::where('user_id', $utilisateur->id_utilisateur)
                ->with(['produit', 'payement'])
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();

            // Récupérer les produits favoris
            $favoris = Favori::where('user_id', $utilisateur->id_utilisateur)
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
                    'roles' => $auth->utilisateur->role->role_name
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
                'stock_id' => 'required|exists:stocks,id',
                'quantite' => 'required|integer|min:1',
                'adresse_id' => 'required|exists:adresses,id',
                'paiement' => 'required|array',
                'paiement.methode' => 'required|string',
                'paiement.details' => 'required|array'
            ]);

            $auth = Auth::user();
            $utilisateur = $auth->utilisateur;
            
            // Récupérer le stock et les informations associées
            $stock = Stock::with('produit', 'pharmacie')->findOrFail($request->stock_id);
            
            // Vérifier la disponibilité du produit
            if ($stock->quantite < $request->quantite) {
                throw new \Exception("Produit non disponible en quantité suffisante");
            }
            
            $montantTotal = $stock->prix * $request->quantite;

            // Créer le paiement
            $paiement = Paiement::create([
                'montant' => $montantTotal,
                'methode' => $request->paiement['methode'],
                'details' => $request->paiement['details'],
                'statut' => 'en_attente'
            ]);

            // Créer la commande
            $commande = Commande::create([
                'user_id' => $utilisateur->id_utilisateur,
                'id_produit' => $stock->produit->id,
                'quantite' => $request->quantite,
                'prix_unitaire' => $stock->prix,
                'idReservation' => null, // Si besoin d'un ID de réservation
                'idRole' => $utilisateur->idRole,
                'idPayement' => $paiement->id,
                'adresse_id' => $request->adresse_id,
                'statut' => 'en_attente',
                'pharmacie_id' => $stock->pharmacie->id
            ]);

            // Mettre à jour le stock
            $stock->decrement('quantite', $request->quantite);

            // Associer le paiement à la commande
            $paiement->update(['idReservation' => $commande->idCommande]);

            DB::commit();

            return response()->json([
                'message' => 'Commande passée avec succès',
                'commande' => $commande->load(['produit', 'payement'])
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
     * Traiter un paiement en ligne
     */
    public function processPayment(Request $request)
    {
        try {
            DB::beginTransaction();

            $request->validate([
                'commande_id' => 'required|exists:commandes,idCommande',
                'carte' => 'required|array',
                'carte.numero' => 'required|string|size:16',
                'carte.date_expiration' => 'required|string',
                'carte.cvv' => 'required|string|size:3'
            ]);

            $commande = Commande::with('payement')->findOrFail($request->commande_id);
            
            // Vérifier que l'utilisateur est bien propriétaire de la commande
            if ($commande->user_id != Auth::user()->utilisateur->id_utilisateur) {
                throw new \Exception("Vous n'êtes pas autorisé à effectuer cette action");
            }

            // Ici, intégrer avec un processeur de paiement réel
            // Pour cet exemple, nous simulons un paiement réussi
            $detailsPaiement = [
                'carte' => [
                    'numero_masque' => '****' . substr($request->carte['numero'], -4),
                    'date_expiration' => $request->carte['date_expiration']
                ],
                'transaction_id' => 'TRANS_' . uniqid(),
                'date_paiement' => now()->format('Y-m-d H:i:s')
            ];

            // Mettre à jour le paiement
            $commande->payement->update([
                'statut' => 'complete',
                'details' => array_merge($commande->payement->details, $detailsPaiement)
            ]);

            // Mettre à jour le statut de la commande
            $commande->update([
                'statut' => 'payee'
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Paiement traité avec succès',
                'commande' => $commande->fresh(['produit', 'payement'])
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors du traitement du paiement',
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

            $commande = Commande::where('idCommande', $id)
                ->where('user_id', $utilisateur->id_utilisateur)
                ->with(['produit', 'payement', 'user'])
                ->firstOrFail();

            // Récupérer l'adresse associée à la commande
            $adresse = Adresse::find($commande->adresse_id);

            // Récupérer les détails de la pharmacie
            $pharmacie = Pharmacie::find($commande->pharmacie_id);

            $commandeDetails = [
                'id' => $commande->idCommande,
                'date' => $commande->created_at->format('Y-m-d H:i:s'),
                'statut' => $commande->statut,
                'produit' => [
                    'id' => $commande->produit->id,
                    'nom' => $commande->produit->nom,
                    'description' => $commande->produit->description,
                    'images' => $commande->produit->images ?? []
                ],
                'quantite' => $commande->quantite,
                'prix_unitaire' => $commande->prix_unitaire,
                'total' => $commande->quantite * $commande->prix_unitaire,
                'adresse' => $adresse,
                'pharmacie' => [
                    'id' => $pharmacie->id,
                    'nom' => $pharmacie->nom,
                    'adresse' => $pharmacie->adresse,
                    'latitude' => $pharmacie->latitude,
                    'longitude' => $pharmacie->longitude
                ],
                'paiement' => [
                    'id' => $commande->payement->id,
                    'montant' => $commande->payement->montant,
                    'methode' => $commande->payement->methode,
                    'statut' => $commande->payement->statut,
                    'date' => $commande->payement->created_at->format('Y-m-d H:i:s')
                ]
            ];

            return response()->json($commandeDetails);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Commande non trouvée',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Récupérer l'historique des commandes
     */
    public function getCommandesHistory()
    {
        try {
            $auth = Auth::user();
            $utilisateur = $auth->utilisateur;

            $commandes = Commande::where('user_id', $utilisateur->id_utilisateur)
                ->with(['produit', 'payement'])
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($commandes);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération de l\'historique',
                'error' => $e->getMessage()
            ], 500);
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

            // Vérifier si le produit est déjà dans les favoris
            $existingFavori = Favori::where('utilisateur_id', $utilisateur->id_utilisateur)
                ->where('produit_id', $request->produit_id)
                ->first();

            if ($existingFavori) {
                return response()->json([
                    'message' => 'Ce produit est déjà dans vos favoris'
                ]);
            }

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
                    'roles' => $auth->utilisateur->role->role_name
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











































































































