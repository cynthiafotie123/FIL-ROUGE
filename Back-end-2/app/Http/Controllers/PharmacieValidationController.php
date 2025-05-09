<?php

namespace App\Http\Controllers;

use App\Models\Pharmacie;
use App\Models\User;
use App\Models\Authentification;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class PharmacieValidationController extends Controller
{
    public function getPendingPharmacies()
    {
        $pharmacies = Pharmacie::where('is_validated', false)
            ->with(['users' => function($query) {
                $query->with('authentification');
            }])
            ->get();

        return response()->json($pharmacies);
    }

    public function validatePharmacie(Request $request, $id)
    {
        $pharmacie = Pharmacie::findOrFail($id);
        
        // Générer un mot de passe temporaire
        $tempPassword = str_random(8);
        
        // Mettre à jour la pharmacie
        $pharmacie->is_validated = true;
        $pharmacie->save();

        // Créer l'utilisateur associé à la pharmacie
        $user = User::create([
            'nom' => $pharmacie->nom,
            'telephone' => $pharmacie->telephone,
            'id_pharmacie' => $pharmacie->id_Pharmacie,
            'email' => $request->email
        ]);

        // Créer l'authentification
        $auth = Authentification::create([
            'email' => $request->email,
            'password' => Hash::make($tempPassword),
            'user_id' => $user->user_id,
        ]);

        // Attribution du rôle "pharmacie"
        $rolePharmacie = Role::where('role_name', 'pharmacie')->first();
        if ($rolePharmacie) {
            $user->roles()->attach($rolePharmacie->idRole, ['role_name' => 'pharmacie']);
        }

        // Envoyer l'email de confirmation
        Mail::send('emails.pharmacie-validation', [
            'pharmacie' => $pharmacie,
            'email' => $request->email,
            'password' => $tempPassword
        ], function($message) use ($request) {
            $message->to($request->email)
                    ->subject('Votre compte pharmacie a été validé');
        });

        return response()->json([
            'message' => 'Pharmacie validée avec succès',
            'pharmacie' => $pharmacie
        ]);
    }

    public function rejectPharmacie($id)
    {
        $pharmacie = Pharmacie::findOrFail($id);
        $pharmacie->delete();

        return response()->json([
            'message' => 'Demande de pharmacie rejetée'
        ]);
    }
} 