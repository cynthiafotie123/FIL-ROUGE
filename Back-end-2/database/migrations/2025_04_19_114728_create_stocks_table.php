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
        Schema::create('stocks', function (Blueprint $table) {
            $table->id('idstock');
            $table->integer('quantite');
            $table->unsignedBigInteger('id_Pharmacie');
            $table->unsignedBigInteger('id_produit');
            $table->timestamps();
            
            $table->foreign('id_Pharmacie')->references('id_Pharmacie')->on('pharmacies');
            $table->foreign('id_produit')->references('id_produit')->on('produits');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};
