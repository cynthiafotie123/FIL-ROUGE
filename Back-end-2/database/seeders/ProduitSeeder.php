<?php



namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProduitSeeder extends Seeder
{
    public function run()
    {
        $produits = [
            [
                'user_id' => 1, // Assurez-vous que cet ID existe dans votre table users
                'quantite' => 100,
                'image' => 'PARA.png',
                'nom' => 'Paracétamol',
                'prix' => 5.99,
                'description' => 'Médicament antalgique (contre la douleur) et antipyrétique (contre la fièvre)',
                'categorie' => 'Antidouleur',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'quantite' => 50,
                'image' => 'AMOXY.png',
                'nom' => 'Amoxicilline',
                'prix' => 8.50,
                'description' => 'Antibiotique de la famille des bêta-lactamines',
                'categorie' => 'Antibiotique',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'quantite' => 75,
                'image' => 'VENTOLINE.png',
                'nom' => 'Ventoline',
                'prix' => 12.99,
                'description' => 'Bronchodilatateur pour le traitement de l\'asthme',
                'categorie' => 'Respiratoire',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'quantite' => 60,
                'image' => 'XANAX.png',
                'nom' => 'Xanax',
                'prix' => 15.99,
                'description' => 'Médicament anxiolytique de la famille des benzodiazépines',
                'categorie' => 'Anxiolytique',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'quantite' => 80,
                'image' => 'SMECTA.png',
                'nom' => 'Smecta',
                'prix' => 6.99,
                'description' => 'Traitement des diarrhées aiguës et chroniques',
                'categorie' => 'Gastro-entérologie',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'quantite' => 45,
                'image' => 'MELFORMINE.png',
                'nom' => 'Metformine',
                'prix' => 9.99,
                'description' => 'Médicament antidiabétique oral de la famille des biguanides',
                'categorie' => 'Diabète',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'quantite' => 70,
                'image' => 'CYTRINE.png',
                'nom' => 'Cetirizine',
                'prix' => 7.50,
                'description' => 'Antihistaminique utilisé dans le traitement des allergies',
                'categorie' => 'Allergie',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'quantite' => 90,
                'image' => 'AMLOR.png',
                'nom' => 'Amlor',
                'prix' => 13.99,
                'description' => 'Médicament antihypertenseur de la classe des inhibiteurs calciques',
                'categorie' => 'Cardiovasculaire',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('produits')->insert($produits);
    }
}