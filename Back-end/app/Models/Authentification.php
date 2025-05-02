<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Authentification extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'authentification';

    protected $primaryKey = 'id_Authentification';
    
    protected $fillable = [
        'email',
        'password',
        'is_connect',
        'id_Utilisateur',
    ];

    protected $hidden = [
        'password',
        'rememberToken',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_connect' => 'boolean',
    ];

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_Utilisateur', 'id_Utilisateur');
    }

    public function hasRole($role)
    {
        return $this->utilisateur->hasRole($role);
    }
}