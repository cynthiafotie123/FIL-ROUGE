<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payement extends Model
{
    protected $table = 'payement';
    protected $primaryKey = 'idpayement';

    protected $fillable = [
        'montant',
        'methode',
        'date',
        'payementtotal',
        'idCommande',
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'idCommande', 'idCommande');
    }
}
