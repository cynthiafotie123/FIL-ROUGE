<?php
   
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $table = 'produits';
    protected $primaryKey = 'id_produit';

    protected $fillable = [
        'user_id',
        'image',
        'nom',
        'description',
        'categorie',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function stock()
    {
        return $this->hasOne(Stock::class, 'id_produit', 'id_produit');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'id_produit', 'id_produit');
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

