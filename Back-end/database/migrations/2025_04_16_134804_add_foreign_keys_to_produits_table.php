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
        Schema::table('produits', function (Blueprint $table) {
            $table->foreign(['idRole'], 'fk_produits_role')->references(['idRole'])->on('roles')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_Utilisateur'], 'fk_produits_utilisateur')->references(['id_Utilisateur'])->on('utilisateur')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produits', function (Blueprint $table) {
            $table->dropForeign('fk_produits_role');
            $table->dropForeign('fk_produits_utilisateur');
        });
    }
};
