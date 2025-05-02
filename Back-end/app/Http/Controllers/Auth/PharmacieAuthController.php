<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;
use App\Models\Role;

class PharmacieAuthController extends BaseAuthController
{
    public function showLoginForm()
    {
        return view('auth.pharmacie.login');
    }

    public function showRegisterForm()
    {
        return view('auth.pharmacie.register');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('pharmacie')->attempt($request->only('email', 'password'), $request->filled('remember'))) {
            $auth = Auth::guard('pharmacie')->user();
            
            if (!$auth->hasRole('pharmacie')) {
                Auth::guard('pharmacie')->logout();
                return redirect()->back()->withErrors(['email' => 'Accès non autorisé']);
            }
            
            $auth->is_connect = true;
            $auth->save();
            
            $request->session()->regenerate();
            return redirect()->intended(route('pharmacie.dashboard'));
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
            'telephone' => 'required|string|max:15',
            'id_pharmacie' => 'required|exists:pharmacies,id',
        ]);

        $auth = $this->createUser($request->all(), 'pharmacie');
        
        Auth::guard('pharmacie')->login($auth);
        
        return redirect(route('pharmacie.dashboard'));
    }

    public function logout(Request $request)
    {
        $auth = Auth::guard('pharmacie')->user();
        if ($auth) {
            $auth->is_connect = false;
            $auth->save();
        }
        
        Auth::guard('pharmacie')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect('/');
    }
}