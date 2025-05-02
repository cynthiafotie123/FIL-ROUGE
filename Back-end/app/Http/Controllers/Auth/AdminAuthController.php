<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;

class AdminAuthController extends BaseAuthController
{
    public function showLoginForm()
    {
        return view('auth.admin.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('admin')->attempt($request->only('email', 'password'), $request->filled('remember'))) {
            $auth = Auth::guard('admin')->user();
            
            if (!$auth->hasRole('admin')) {
                Auth::guard('admin')->logout();
                return redirect()->back()->withErrors(['email' => 'Accès non autorisé']);
            }
            
            $auth->is_connect = true;
            $auth->save();
            
            $request->session()->regenerate();
            return redirect()->intended(route('admin.dashboard'));
        }

        return back()->withErrors([
            'email' => 'Les informations fournies ne correspondent pas à nos enregistrements.',
        ]);
    }

    public function logout(Request $request)
    {
        $auth = Auth::guard('admin')->user();
        if ($auth) {
            $auth->is_connect = false;
            $auth->save();
        }
        
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect('/');
    }

    // Les admins ne peuvent pas s'inscrire, ils sont créés par un super admin
}