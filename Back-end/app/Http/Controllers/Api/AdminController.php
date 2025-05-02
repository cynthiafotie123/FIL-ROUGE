<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Utilisateur;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:admin');
    }

    public function assignRole(Request $request, $userId)
    {
        $request->validate([
            'role' => [
                'required',
                'string',
                Rule::exists('roles', 'name')
            ]
        ]);

        $user = Utilisateur::findOrFail($userId);
        $role = Role::where('name', $request->role)->firstOrFail();

        // Supprime tous les rôles existants
        $user->roles()->detach();

        // Ajoute le nouveau rôle
        $user->roles()->attach($role->idRole);

        return response()->json([
            'message' => 'Rôle attribué avec succès',
            'user' => $user->load('roles')
        ]);
    }

    public function getRoles()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    public function getUsersWithRoles()
    {
        $users = Utilisateur::with('roles')->get();
        return response()->json($users);
    }
}