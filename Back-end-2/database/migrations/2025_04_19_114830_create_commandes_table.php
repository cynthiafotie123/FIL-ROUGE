<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->id('idCommande');
            $table->integer('quantite');
            $table->string('statut');
            $table->dateTime('date_retrait');
            $table->boolean('annuler')->default(false);
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('idRole');
            $table->unsignedBigInteger('id_produit');
            $table->timestamps();
            
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->foreign('idRole')->references('idRole')->on('role');
            $table->foreign('id_produit')->references('id_produit')->on('produit');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
