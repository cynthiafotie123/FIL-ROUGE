<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{  
    protected $table = 'roles';
    protected $primaryKey = 'idRole';
    protected $fillable = [
        'idRole',
        'role_name',
        'description',
    ];
    
    public function users()  // Renommez cette méthode de 'roles' à 'users'
    {
        return $this->belongsToMany(User::class, 'utilisateur_role', 'idRole', 'user_id')
                    ->withPivot('role_name');
    }
}