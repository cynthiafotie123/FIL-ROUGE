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
        Schema::create('utilisateur_roles', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('idRole');
            $table->string('name'); // pharmacie, utilisateur, admin
            
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('idRole')->references('idRole')->on('roles');
            
            $table->primary(['user_id', 'idRole']);
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
