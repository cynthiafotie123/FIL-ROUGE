<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Authentification;
use App\Models\User;
use App\Models\Role;
use App\Models\Pharmacie;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{

    
    // Inscription d'un utilisateur standard
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'telephone' => 'required|string|max:9',
            'email' => 'required|string|email|max:255|unique:authentifications',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Création de l'utilisateur
        $utilisateur = User::create([
            'nom' => $request->nom,
            'telephone' => $request->telephone,
            'email' => $request->email,
        ]);


          // Création de l'authentification
          $auth = Authentification::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_id' => $utilisateur->user_id,
            //'token' => $token,

            
        ]);

        
        $auth->is_connect = true;
        $auth->save();

           // Attribution du rôle "client" par défaut
           $roleClient = Role::where('role_name', 'client')->first();
           if ($roleClient) {
            $utilisateur->roles()->attach($roleClient->idRole, ['role_name' => 'client']);

           }
   
           $token = $auth->createToken('auth_token')->plainTextToken;
   
           return response()->json([
               'message' => 'Utilisateur créé avec succès',
               'user' => $utilisateur,
               'token_type' => 'Bearer',
               'is_connect' => true,
               'role' => 'client',
                'auth_token' => $token,
           ], 201);



      

     
    }



    
public function getUserRoles()
{
    $user = Auth::user();

    if ($user) {
        $roles = $user->roles()->pluck('role_name')->toArray();
        return response()->json(['roles' => $roles]);
    }

    return response()->json(['roles' => []], 401);
}



    // Inscription d'une pharmacie
    public function registerPharmacie(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'telephone' => 'required|string|max:9|',
            'email' => 'required|string|email|max:255|unique:authentifications',
            'password' => 'required|string|min:8',
            'adresse' => 'required|string',
            'horaire_d_ouverture' => 'required',
            'horaire_fermeture' => 'required',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Création de la pharmacie
        $pharmacie = Pharmacie::create([
            'nom' => $request->nom,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            'horaire_d_ouverture' => $request->horaire_d_ouverture,
            'horaire_fermeture' => $request->horaire_fermeture,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        
        ]);

        // Création de l'utilisateur associé à la pharmacie
        $utilisateur = User::create([
            'nom' => $request->nom,
            'telephone' => $request->telephone,
            'id_pharmacie' => $pharmacie->id_Pharmacie,
            'email' => $request->email,
        ]);

        // Création de l'authentification
        $auth = Authentification::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_id' => $utilisateur->user_id,
        ]);

        $auth->is_connect = true;
        $auth->save();

        // Attribution du rôle "pharmacie"
        $rolePharmacie = Role::where('role_name', 'pharmacie')->first();
        if ($rolePharmacie) {
            $utilisateur->roles()->attach($rolePharmacie->idRole, ['role_name' => 'pharmacie']);
        }

        $token = $auth->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Pharmacie créée avec succès',
            'pharmacie' => $pharmacie,
            'user' => $utilisateur,
            'auth_token' => $token,
            'token_type' => 'Bearer',
            'role' => 'pharmacie',
            'is_connect' => true,
        ], 201);
    }


    public function createFirstAdmin(Request $request)
    {
        // Vérifier si un admin existe déjà
        $adminExists = User::whereHas('roles', function($query) {
            $query->where('roles.role_name', 'admin');
        })->exists();
        
        if ($adminExists) {
            return response()->json([
                'message' => 'Un administrateur existe déjà dans le système'
            ], 403);
        }
        
        // Validation des données
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'telephone' => 'required|string|max:9',
            'email' => 'required|string|email|max:255|unique:authentifications',
            'password' => 'required|string|min:8',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }
        
        try {
            DB::beginTransaction();
            
            // Création de l'utilisateur
            $utilisateur = User::create([
                'nom' => $request->nom,
                'telephone' => $request->telephone,
                'email' => $request->email,
            ]);
            
            // Création de l'authentification
            $auth = Authentification::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_id' => $utilisateur->user_id,
                'is_connect' => true
            ]);
            
            // Récupération ou création du rôle admin
            $roleAdmin = Role::firstOrCreate(
                ['role_name' => 'admin'],
                ['description' => 'Administrateur système']
            );
            
            // Attribution du rôle admin à l'utilisateur avec le role_name
            $utilisateur->roles()->attach($roleAdmin->idRole, ['role_name' => 'admin']);
            
            // Génération du token
            $token = $auth->createToken('auth_token')->plainTextToken;
            
            DB::commit();
            
            return response()->json([
                'message' => 'Premier administrateur créé avec succès',
                'user' => $utilisateur->load('roles'),
                'access_token' => $token,
                'token_type' => 'Bearer',
                'is_connect' => true
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors de la création de l\'administrateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Inscription d'une pharnacie
    public function registerAdmin(Request $request)
    {
        // Vérifier si l'utilisateur actuel est admin
        $authUser = Auth::user();
        
        if (!$authUser || !$authUser->utilisateur || !$authUser->utilisateur->roles()
            ->where('role_name', 'admin')->exists()) {
            return response()->json([
                'message' => 'Accès non autorisé. Droits d\'administrateur requis.'
            ], 403);
        }
        
        // Validation des données
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'telephone' => 'required|string|max:9',
            'email' => 'required|string|email|max:255|unique:authentifications',
            'password' => 'required|string|min:8',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }
        
        try {
            DB::beginTransaction();
            
            // Création de l'utilisateur
            $utilisateur = User::create([
                'nom' => $request->nom,
                'telephone' => $request->telephone,
                'email' => $request->email,
            ]);
            
            // Création de l'authentification
            $auth = Authentification::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_id' => $utilisateur->user_id,
                'is_connect' => true
            ]);
            
            // Récupération du rôle admin
            $roleAdmin = Role::where('role_name', 'admin')->first();
            
            if (!$roleAdmin) {
                throw new \Exception('Le rôle admin n\'existe pas dans le système');
            }
            
            // Attribution du rôle admin à l'utilisateur
            $utilisateur->roles()->attach($roleAdmin->idRole);
            
            // Génération du token
            $token = $auth->createToken('auth_token')->plainTextToken;
            
            DB::commit();
            
            return response()->json([
                'message' => 'Administrateur créé avec succès',
                'user' => $utilisateur->load('roles'),
                'access_token' => $token,
                'token_type' => 'Bearer',
                'is_connect' => true
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur lors de la création de l\'administrateur',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Connexion
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Tentative de connexion
        $auth = Authentification::where('email', $request->email)->first();

        if (!$auth || !Hash::check($request->password, $auth->password)) {
            return response()->json([
                'message' => 'Identifiants invalides'
            ], 401);
        }

        // Mise à jour du statut de connexion
        $auth->is_connect = true;
        $auth->save();

        // Génération du token
        $token = $auth->createToken('auth_token')->plainTextToken;

        // Récupération des rôles
        $rolename=['client', 'admin', 'pharmacie'];
        $roles = $auth->utilisateur->roles->pluck('role_name')->toArray();



        return response()->json([
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $auth->id_auth,
                'email' => $auth->email,
                'utilisateur' => $auth->utilisateur,
                'roles' => $roles
            ],
            'access_token' => $token
        ]);
    }




    public function loginPharmacie(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Chercher l'authentification par email
    $auth = Authentification::where('email', $request->email)->first();
    
    // Vérifier si l'authentification existe et si le mot de passe correspond
    if (!$auth || !Hash::check($request->password, $auth->password)) {
        return response()->json([
            'message' => 'Identifiants invalides'
        ], 401);
    }
    
    // Récupérer l'utilisateur associé
    $user = User::find($auth->user_id);
    
    // Vérifier si l'utilisateur a une pharmacie associée
    if (!$user->id_pharmacie) {
        return response()->json([
            'message' => 'Ce compte n\'est pas associé à une pharmacie'
        ], 403);
    }
    
    // Récupérer la pharmacie
    $pharmacie = Pharmacie::find($user->id_pharmacie);
    
    // Vérifier si l'utilisateur a le rôle "pharmacie"
    $isPharmacie = $user->roles()->where('utilisateur_role.role_name', 'pharmacie')->exists();
    
    if (!$isPharmacie) {
        return response()->json([
            'message' => 'Vous n\'avez pas les droits pour accéder à cet espace'
        ], 403);
    }
    
    // Suppression des tokens existants (facultatif - déconnexion des autres appareils)
    // $auth->tokens()->delete();
    
    // Création du token
    $token = $auth->createToken('pharmacie_auth_token')->plainTextToken;
    $auth->is_connect = true;
    $auth->save();
    
    return response()->json([
        'message' => 'Connexion réussie',
        'user' => $user,
        'pharmacie' => $pharmacie,
        'token' => $token,
        'role' => 'pharmacie',
        'is_connect'=> true,
    ]);
}


    // Déconnexion
    public function logout(Request $request)
    {
        $user = $request->user();
        
        if ($user) {
            // Mise à jour du statut de connexion
            $auth = Authentification::find($user->id_auth);
            if ($auth) {
                $auth->is_connect = false;
                $auth->save();
            }
            
            // Révocation de tous les tokens
            $user->tokens()->delete();
        }

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }

    // Récupération des informations de l'utilisateur connecté
    public function user(Request $request)
    {
        $user = $request->user();
        $roles = $user->utilisateur->roles()->pluck('role_name')->toArray();
        
        return response()->json([
            'id' => $user->id_auth,
            'email' => $user->email,
            'utilisateur' => $user->utilisateur,
            'roles' => $roles
        ]);
    }

    // Redirection vers le provider OAuth
    /*public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    // Callback du provider OAuth
    public function handleProviderCallback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
            
            // Recherche de l'utilisateur par email
            $auth = Authentification::where('email', $socialUser->getEmail())->first();
            
            // Si l'utilisateur n'existe pas, on le crée
            if (!$auth) {
                // Création de l'utilisateur
                $utilisateur = Utilisateur::create([
                    'nom' => $socialUser->getName(),
                    'telephone' => '',
                ]);
                
                // Création de l'authentification
                $auth = Authentification::create([
                    'email' => $socialUser->getEmail(),
                    'password' => Hash::make(uniqid()), // Mot de passe aléatoire
                    'user_id' => $utilisateur->user_id,
                ]);
                
                // Attribution du rôle "client" par défaut
                $roleClient = Role::where('name', 'client')->first();
                if ($roleClient) {
                    $utilisateur->roles()->attach($roleClient->idRole, ['name' => 'client']);
                }
            }
            
            // Mise à jour du statut de connexion
            $auth->is_connect = true;
            $auth->save();
            
            // Génération du token
            $token = $auth->createToken('auth_token')->plainTextToken;
            
            // Redirection vers le frontend avec le token
            return redirect()->away(env('FRONTEND_URL') . '?token=' . $token);
            
        } catch (\Exception $e) {
            return redirect()->away(env('FRONTEND_URL') . '/login?error=unable_to_login');
        }
    }*/
}