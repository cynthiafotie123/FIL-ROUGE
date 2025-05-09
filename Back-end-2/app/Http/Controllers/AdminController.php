<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pharmacie;
use App\Models\Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Récupère les statistiques du tableau de bord admin
     */
    public function getDashboardStats()
    {
        try {
            $stats = [
                'total_users' => User::count(),
                'total_pharmacies' => Pharmacie::count(),
                'total_commandes' => Commande::count(),
                'commandes_en_cours' => Commande::where('statut', 'en_cours')->count(),
                'commandes_terminees' => Commande::where('statut', 'terminee')->count(),
                'revenus_totaux' => Commande::where('statut', 'terminee')->sum('montant_total'),
                'pharmacies_en_attente' => Pharmacie::where('statut', 'en_attente')->count(),
                'dernieres_commandes' => Commande::with(['user', 'pharmacie'])
                    ->latest()
                    ->take(5)
                    ->get(),
                'dernieres_pharmacies' => Pharmacie::latest()
                    ->take(5)
                    ->get()
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération des statistiques'], 500);
        }
    }

    /**
     * Récupère la liste des utilisateurs
     */
    public function getUsers()
    {
        try {
            $users = User::with('utilisateur.roles')->get();
            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération des utilisateurs'], 500);
        }
    }

    /**
     * Récupère les détails d'un utilisateur
     */
    public function getUser($id)
    {
        try {
            $user = User::with('utilisateur.roles')->findOrFail($id);
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
    }

    /**
     * Met à jour un utilisateur
     */
    public function updateUser(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->update($request->all());
            return response()->json(['message' => 'Utilisateur mis à jour avec succès']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la mise à jour de l\'utilisateur'], 500);
        }
    }

    /**
     * Supprime un utilisateur
     */
    public function deleteUser($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return response()->json(['message' => 'Utilisateur supprimé avec succès']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la suppression de l\'utilisateur'], 500);
        }
    }

    /**
     * Récupère la liste des pharmacies
     */
    public function getPharmacies()
    {
        try {
            $pharmacies = Pharmacie::with('user')->get();
            return response()->json($pharmacies);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération des pharmacies'], 500);
        }
    }

    /**
     * Récupère les détails d'une pharmacie
     */
    public function getPharmacie($id)
    {
        try {
            $pharmacie = Pharmacie::with('user')->findOrFail($id);
            return response()->json($pharmacie);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Pharmacie non trouvée'], 404);
        }
    }

    /**
     * Met à jour une pharmacie
     */
    public function updatePharmacie(Request $request, $id)
    {
        try {
            $pharmacie = Pharmacie::findOrFail($id);
            $pharmacie->update($request->all());
            return response()->json(['message' => 'Pharmacie mise à jour avec succès']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la mise à jour de la pharmacie'], 500);
        }
    }

    /**
     * Supprime une pharmacie
     */
    public function deletePharmacie($id)
    {
        try {
            $pharmacie = Pharmacie::findOrFail($id);
            $pharmacie->delete();
            return response()->json(['message' => 'Pharmacie supprimée avec succès']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la suppression de la pharmacie'], 500);
        }
    }

    /**
     * Récupère les statistiques générales
     */
    public function getStats()
    {
        try {
            $stats = [
                'users' => [
                    'total' => User::count(),
                    'new_this_month' => User::whereMonth('created_at', now()->month)->count()
                ],
                'pharmacies' => [
                    'total' => Pharmacie::count(),
                    'active' => Pharmacie::where('statut', 'active')->count(),
                    'pending' => Pharmacie::where('statut', 'en_attente')->count()
                ],
                'commandes' => [
                    'total' => Commande::count(),
                    'this_month' => Commande::whereMonth('created_at', now()->month)->count(),
                    'revenue' => Commande::where('statut', 'terminee')->sum('montant_total')
                ]
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération des statistiques'], 500);
        }
    }

    /**
     * Récupère le rapport des ventes
     */
    public function getSalesReport()
    {
        try {
            $sales = Commande::where('statut', 'terminee')
                ->select(
                    DB::raw('DATE(created_at) as date'),
                    DB::raw('COUNT(*) as total_commandes'),
                    DB::raw('SUM(montant_total) as revenu_total')
                )
                ->groupBy('date')
                ->orderBy('date', 'desc')
                ->get();

            return response()->json($sales);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération du rapport des ventes'], 500);
        }
    }

    /**
     * Récupère le rapport des utilisateurs
     */
    public function getUsersReport()
    {
        try {
            $users = User::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as total_users')
            )
                ->groupBy('date')
                ->orderBy('date', 'desc')
                ->get();

            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de la récupération du rapport des utilisateurs'], 500);
        }
    }
} 