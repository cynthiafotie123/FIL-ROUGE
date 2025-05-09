<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('stock', function (Blueprint $table) {
            $table->id('idstock');
            $table->integer('quantite');
            $table->timestamps();
            $table->foreignId('id_Pharmacie')->constrained('pharmacies');
            $table->foreignId('id_produit')->constrained('produits');
        });
    }

    public function down()
    {
        Schema::dropIfExists('stock');
    }
};
