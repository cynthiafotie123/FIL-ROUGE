<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $table = 'commande';
    protected $primaryKey = 'idCommande';

    protected $fillable = [
        'quantite',
        'statut',
        'date_retrait',
        'annuler',
        'user_id',
        'idRole',
        'id_produit',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'idRole', 'idRole');
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit', 'id_produit');
    }

    public function payement()
    {
        return $this->hasOne(Payement::class, 'idCommande', 'idCommande');
    }
}
