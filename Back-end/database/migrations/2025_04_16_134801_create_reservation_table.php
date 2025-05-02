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
        Schema::create('reservation', function (Blueprint $table) {
            $table->integer('idReservation', true);
            $table->integer('quantite')->nullable();
            $table->enum('statut', ['en_attente', 'confirmee', 'annulee'])->nullable();
            $table->dateTime('date_retrait')->nullable();
            $table->string('annuler', 45)->nullable();
            $table->integer('id_Utilisateur')->index('fk_reservation_utilisateur1');
            $table->integer('idRole');
            $table->integer('id_produit')->index('fk_reservation_produits1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation');
    }
};
