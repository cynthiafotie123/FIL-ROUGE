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
        Schema::create('pharmacie', function (Blueprint $table) {
            $table->integer('id_Pharmacie', true);
            $table->string('nom', 45)->nullable();
            $table->integer('telephone')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable()->useCurrent();
            $table->float('latitude')->nullable();
            $table->float('longitude')->nullable();
            $table->string('adresse', 45)->nullable();
            $table->date('horaire_ d\'ouverture')->nullable();
            $table->date('horaire_fermeture')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmacie');
    }
};
