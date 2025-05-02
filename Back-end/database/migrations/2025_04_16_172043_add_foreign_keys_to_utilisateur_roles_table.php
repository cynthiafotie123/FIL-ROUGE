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
        Schema::table('utilisateur_roles', function (Blueprint $table) {
            $table->foreign(['idRole'], 'fk_Utilisateur_has_Roles_Roles1')->references(['idRole'])->on('roles')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_Utilisateur'], 'fk_Utilisateur_has_Roles_Utilisateur1')->references(['id_Utilisateur'])->on('utilisateur')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('utilisateur_roles', function (Blueprint $table) {
            $table->dropForeign('fk_Utilisateur_has_Roles_Roles1');
            $table->dropForeign('fk_Utilisateur_has_Roles_Utilisateur1');
        });
    }
};
