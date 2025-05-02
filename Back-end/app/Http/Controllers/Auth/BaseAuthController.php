<?php



namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Authentification;
use App\Models\Utilisateur;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;

class BaseAuthController extends Controller
{
    protected function createUser($data, $roleName)
    {
        // Création de l'utilisateur
        $utilisateur = Utilisateur::create([
            'nom' => $data['nom'],
            'telephone' => $data['telephone'] ?? null,
            'id_pharmacie' => $data['id_pharmacie'] ?? null,
        ]);

        // Création de l'authentification
        $auth = Authentification::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'id_Utilisateur' => $utilisateur->id_Utilisateur,
        ]);

        // Attribution du rôle
        $role = Role::where('name', $roleName)->first();
        if ($role) {
            $utilisateur->roles()->attach($role->idRole, ['name' => $roleName]);
        }

        return $auth;
    }
}