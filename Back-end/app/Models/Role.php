<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $primaryKey = 'idRole';
    protected $fillable = ['name', 'Description'];
    
    public $timestamps = false;

    public function utilisateurs()
    {
        return $this->belongsToMany(Utilisateur::class, 'utilisateur_role', 'idRole', 'id_Utilisateur')
                    ->withPivot('name');
    }
}