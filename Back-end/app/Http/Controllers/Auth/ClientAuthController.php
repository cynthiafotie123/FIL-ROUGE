<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use Laravel\Socialite\Facades\Socialite;
use App\Models\Authentification;
use App\Models\Utilisateur;
use App\Models\Role;

class ClientAuthController extends BaseAuthController
{
    public function showLoginForm()
    {
        return view('auth.client.login');
    }

    public function showRegisterForm()
    {
        return view('auth.client.register');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('client')->attempt($request->only('email', 'password'), $request->filled('remember'))) {
            $auth = Auth::guard('client')->user();
            
            if (!$auth->hasRole('client')) {
                Auth::guard('client')->logout();
                return redirect()->back()->withErrors(['email' => 'Accès non autorisé']);
            }
            
            $auth->is_connect = true;
            $auth->save();
            
            $request->session()->regenerate();
            return redirect()->intended(route('client.dashboard'));
        }

        return back()->withErrors([
            'email' => 'Les informations fournies ne correspondent pas à nos enregistrements.',
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:45',
            'email' => 'required|string|email|max:100|unique:authentification',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'telephone' => 'nullable|string|max:15',
        ]);

        $auth = $this->createUser($request->all(), 'client');
        
        Auth::guard('client')->login($auth);
        
        return redirect(route('client.dashboard'));
    }

    public function logout(Request $request)
    {
        $auth = Auth::guard('client')->user();
        if ($auth) {
            $auth->is_connect = false;
            $auth->save();
        }
        
        Auth::guard('client')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect('/');
    }

    // Méthodes pour Socialite
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
            
            $auth = Authentification::where('email', $socialUser->getEmail())->first();
            
            if (!$auth) {
                // Créer un nouvel utilisateur
                $utilisateur = Utilisateur::create([
                    'nom' => $socialUser->getName(),
                ]);
                
                // Création de l'authentification
                $auth = Authentification::create([
                    'email' => $socialUser->getEmail(),
                    'id_Utilisateur' => $utilisateur->id_Utilisateur,
                ]);
                
                // Attribution du rôle client
                $role = Role::where('name', 'client')->first();
                if ($role) {
                    $utilisateur->roles()->attach($role->idRole, ['name' => 'client']);
                }
            }
            
            if (!$auth->hasRole('client')) {
                return redirect()->route('client.login')
                    ->withErrors(['email' => 'Ce compte existe déjà avec un autre rôle']);
            }
            
            Auth::guard('client')->login($auth);
            $auth->is_connect = true;
            $auth->save();
            
            return redirect()->route('client.dashboard');
            
        } catch (\Exception $e) {
            return redirect()->route('client.login')
                ->withErrors(['email' => 'Erreur d\'authentification sociale: ' . $e->getMessage()]);
        }
    }
}