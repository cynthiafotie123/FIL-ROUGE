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
    Schema::create('produits', function (Blueprint $table) {
        $table->id('id_produit');
        $table->unsignedBigInteger('user_id');
        //$table->unsignedBigInteger('idRole');
        $table->integer('quantite');
        $table->string('image')->nullable();
        $table->string('nom');
        $table->text('description')->nullable();
        $table->string('categorie');
        $table->timestamps();
        
        $table->foreign('user_id')->references('id')->on('users');
        //$table->foreign('idRole')->references('idRole')->on('roles');
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
