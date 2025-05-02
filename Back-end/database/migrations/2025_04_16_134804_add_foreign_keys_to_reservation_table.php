<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('reservation', function (Blueprint $table) {
            $table->foreign(['id_produit'], 'fk_Reservation_produits1')->references(['id_produit'])->on('produits')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_Utilisateur'], 'fk_Reservation_Utilisateur1')->references(['id_Utilisateur'])->on('utilisateur')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservation', function (Blueprint $table) {
            $table->dropForeign('fk_Reservation_produits1');
            $table->dropForeign('fk_Reservation_Utilisateur1');
        });
    }
};
