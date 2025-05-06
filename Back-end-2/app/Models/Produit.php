<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $table = 'produits';
    protected $primaryKey = 'id_produit';

    protected $fillable = [
        'user_id',
        'quantite',
        'image',
        'nom',
        'prix',
        'description',
        'categorie',
    ];

    public function stocks()
    {
        return $this->hasMany(Stock::class, 'id_produit', 'id_produit');
    }

    public function pharmacies()
    {
        return $this->hasManyThrough(
            Pharmacy::class,
            Stocks::class,
            'id_produit',        // Foreign key on stock table
            'id_Pharmacie',      // Foreign key on pharmacy table
            'id_produit',        // Local key on product table
            'id_Pharmacie'       // Local key on stock table
        );
    }
}
