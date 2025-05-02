<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        /*User::factory()->create([
            'nom' => 'Test User',
            'email' => 'test@example.com',
        ]);*/
        Role::insert([
            ['role_name' => 'admin', 'description' => 'Administrateur du système'],
            ['role_name' => 'client', 'description' => 'Utilisateur standard'],
            ['role_name' => 'pharmacie', 'description' => 'Compte pharmacie'],
        ]);




            $this->call([
                ProduitSeeder::class,
            ]);

    }
    }
  
