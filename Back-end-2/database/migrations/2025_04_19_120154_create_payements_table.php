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
        Schema::create('payements', function (Blueprint $table) {
            $table->id('idpayement');
            $table->decimal('montant', 10, 2);
            $table->string('methode');
            $table->dateTime('date');
            $table->unsignedBigInteger('idCommande');
            $table->timestamps();
            
            $table->foreign('idCommande')->references('idCommande')->on('commandes');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payements');
    }
};
