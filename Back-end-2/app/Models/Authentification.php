<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Authentification extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;
    
    protected $table = 'authentifications';
    protected $primaryKey = 'id_auth';
    
    protected $fillable = [
        'email',
        'password',
        'is_connect',
        'user_id',
        'token',
    ];
    
    protected $hidden = [
        'password',
        'token',
    ];
    
    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
    
    // Méthode pour récupérer les rôles via l'utilisateur associé
    public function getRole()
    {
        return $this->utilisateur->roles;
    }
    
    // Méthode pour vérifier si l'utilisateur a un rôle spécifique
    public function hasRole($roleName)
    {
        return $this->User->roles()->where('role_name', $roleName)->exists();
    }
}