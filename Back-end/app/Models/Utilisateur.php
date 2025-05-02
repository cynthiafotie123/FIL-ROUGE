<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    use HasFactory;

    protected $table = 'utilisateur';

    protected $primaryKey = 'id_Utilisateur';
    
    protected $fillable = [
        'nom',
        'telephone',
        'id_pharmacie',
    ];

    public function authentification()
    {
        return $this->hasOne(Authentification::class, 'id_Utilisateur');
    }
    
    public function pharmacie()
    {
        return $this->belongsTo(Pharmacie::class, 'id_pharmacie');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'utilisateur_role', 'id_Utilisateur', 'idRole')
                    ->withPivot('name');
    }

    public function hasRole($role)
    {
        return $this->roles()->where('name', $role)->exists();
    }
}