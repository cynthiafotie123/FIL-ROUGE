<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Authentification;
use App\Models\Utilisateur;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:45',
            'email' => 'required|string|email|max:100|unique:authentification',
            'password' => 'required|string|min:8|confirmed',
            'telephone' => 'nullable|string|max:15',
            //'role' => 'required|string|in:client,pharmacie',
            //'id_pharmacie' => 'required_if:role,pharmacie|exists:pharmacies,id',
        ]);

        // Création de l'utilisateur
        $utilisateur = Utilisateur::create([
            'nom' => $request->nom,
            'telephone' => $request->telephone,
            //'id_pharmacie' => $request->id_pharmacie,
        ]);

        // Création de l'authentification
        $auth = Authentification::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'id_Utilisateur' => $utilisateur->id_Utilisateur,
        ]);

       // Attribution du rôle par défaut (client)
       $role = Role::where('name', 'client')->first();
       if ($role) {
           $utilisateur->roles()->attach($role->idRole);
       }

        $token = $auth->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie',
            'user' => $auth->load('utilisateur', 'utilisateur.roles'),
            'access_token' => $token,
            'token_type' => 'Bearer'
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
   // 'role' => 'required|string|in:client,admin,pharmacie',
]);

$authentification = Authentification::where('email', $request->email)->first();

 
// ... vérification du mot de passe ...
 if (!$authentification || !Hash::check($request->password, $authentification->password)) {
    throw ValidationException::withMessages([
        'email' => ['Les informations fournies ne correspondent pas à nos enregistrements.'],
    ]);
}

  // Vérification de rôle si nécessaire
    // if (isset($request->role) && !$authentification->utilisateur->hasRole($request->role)) {
    //     throw ValidationException::withMessages([
    //         'role' => ['Ce compte n\'a pas le rôle requis.'],
    //     ]);
    // }
    
    $authentification->is_connect = true;
    $authentification->save();


     // Créer le token avec ou sans rôle selon votre besoin
     $token = isset($request->role) 
     ? $authentification->createToken('auth_token', [$request->role])->plainTextToken
     : $authentification->createToken('auth_token')->plainTextToken;

   //de la ligne 64 a la 90 c'est pour creer un token sanctum en utilisant le modele Authentification et non le modele User    

     
        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $auth->load('utilisateur', 'utilisateur.roles'),
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function logout(Request $request)
    {
        $auth = $request->user();
        $auth->is_connect = false;
        $auth->save();
        $auth->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user()->load('utilisateur', 'utilisateur.roles'));
    }
}