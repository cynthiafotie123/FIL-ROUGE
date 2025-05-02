<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;






class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::insert([
            [
                'role_name' => 'admin',
                'description' => 'Administrateur du système',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_name' => 'client',
                'description' => 'Utilisateur classique',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role_name' => 'pharmacie',
                'description' => 'Représentant d\'une pharmacie',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
