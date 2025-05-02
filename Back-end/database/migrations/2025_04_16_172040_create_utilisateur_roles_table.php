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
        Schema::create('utilisateur_roles', function (Blueprint $table) {
            $table->integer('id_Utilisateur')->index('fk_utilisateur_has_roles_utilisateur1_idx');
            $table->integer('idRole')->index('fk_utilisateur_has_roles_roles1_idx');
            $table->string('name', 45)->nullable();

            $table->primary(['id_Utilisateur', 'idRole']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utilisateur_roles');
    }
};
