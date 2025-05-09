<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $table = 'stocks';
    protected $primaryKey = 'idstock';

    protected $fillable = [
        'quantite',
        'updated_at',
        'create_at',
        'id_Pharmacie',
        'id_produit',
    ];

    public function pharmacie()
    {
        return $this->belongsTo(Pharmacie::class, 'id_Pharmacie', 'id_Pharmacie');
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit', 'id_produit');
    }
}
