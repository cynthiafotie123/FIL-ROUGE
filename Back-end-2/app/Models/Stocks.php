<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $table = 'stock';
    protected $primaryKey = 'idstock';

    protected $fillable = [
        'quantite', 'id_Pharmacie', 'id_produit'
    ];

    public function product()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }

    public function pharmacy()
    {
        return $this->belongsTo(Pharmacie::class, 'id_Pharmacie');
    }
}
