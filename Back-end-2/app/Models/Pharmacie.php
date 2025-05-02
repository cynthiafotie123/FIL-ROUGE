<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Pharmacie extends Model
{
    use HasFactory;
    
    protected $table = 'pharmacies';
    protected $primaryKey = 'id_Pharmacie';
    
    protected $fillable = [
        'nom',
        'telephone',
        'adresse',
        'latitude',
        'longitude',
        'horaire_d_ouverture',
        'horaire_fermeture',
    ];
    
    public function utilisateurs()
    {
        return $this->hasMany(Utilisateur::class, 'id_pharmacie', 'id_Pharmacie');
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class, 'id_Pharmacie');
    }
}