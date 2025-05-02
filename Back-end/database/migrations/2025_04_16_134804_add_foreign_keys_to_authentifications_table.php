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
        Schema::table('authentifications', function (Blueprint $table) {
            $table->foreign(['id_Utilisateur'], 'fk_Authentifications_Utilisateur1')->references(['id_Utilisateur'])->on('utilisateur')->onUpdate('cascade')->onDelete('cascade');
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('authentifications', function (Blueprint $table) {
            $table->dropForeign('fk_Authentifications_Utilisateur1');
            
        });
    }
};
