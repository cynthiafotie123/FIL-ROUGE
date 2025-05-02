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
        Schema::table('payement', function (Blueprint $table) {
            $table->foreign(['idReservation'], 'fk_payement_Reservation1')->references(['idReservation'])->on('reservation')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payement', function (Blueprint $table) {
            $table->dropForeign('fk_payement_Reservation1');
        });
    }
};
