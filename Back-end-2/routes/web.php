<?php

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return view('welcome');
});



// Redirection vers Google
Route::get('/auth/google', function () {
    return Socialite::driver('google')->redirect();
})->name('auth.google');

// Callback depuis Google
Route::get('/auth/google/callback', function () {
    $googleUser = Socialite::driver('google')->user();

    $user = User::updateOrCreate(
        ['email' => $googleUser->getEmail()],
        [
            'name' => $googleUser->getName(),
            'google_id' => $googleUser->getId(),
        ]
    );

    Auth::login($user);

    return redirect('/dashboard');
});
