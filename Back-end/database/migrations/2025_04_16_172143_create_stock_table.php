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
        Schema::create('stock', function (Blueprint $table) {
            $table->integer('idstock', true);
            $table->integer('quantite')->nullable();
            $table->timestamp('update_at')->nullable();
            $table->timestamp('create_at')->nullable();
            $table->integer('id_Pharmacie')->index('fk_stock_pharmacie1_idx');
            $table->integer('id_produit')->index('fk_stock_produits1_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock');
    }
};
