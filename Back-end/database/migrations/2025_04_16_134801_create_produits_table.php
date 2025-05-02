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
        Schema::create('produits', function (Blueprint $table) {
            $table->integer('id_Utilisateur')->index('fk_produits_utilisateur');
            $table->integer('idRole')->index('fk_produits_role');
            $table->integer('id_produit', true);
            $table->integer('stock')->default(0);
            $table->string('image')->nullable();
            $table->string('nom', 100);
            $table->text('description')->nullable();
            $table->string('categorie', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
