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
        Schema::create('payement', function (Blueprint $table) {
            $table->integer('idpayement', true);
            $table->float('montant')->nullable();
            $table->enum('methode', ['mobile', 'espece'])->nullable();
            $table->timestamp('date')->nullable();
            $table->integer('idReservation')->index('fk_payement_reservation1_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payement');
    }
};
