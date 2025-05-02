<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Model;
use Illuminate\Notifications\Notifiable;

class User extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $primaryKey = 'user_id';
    protected $fillable = [
        'nom',
        'email',
        'telephone',
        'id_pharmacie',
    ];


    public function authentification()
    {
        return $this->hasOne(Authentification::class, 'user_id', 'user_id');
    }

    public function pharmacie()
    {
        return $this->belongsTo(Pharmacie::class, 'id_pharmacie', 'id_Pharmacie');
    }

    
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'utilisateur_role', 'user_id', 'idRole')
                    ->withPivot('role_name');
    }

    public function produit()
    {
        return $this->hasMany(Produit::class, 'user_id', 'user_id');
    }



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    /*protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    /*protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }*/
}
