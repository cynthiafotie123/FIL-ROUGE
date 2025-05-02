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
        Schema::table('stock', function (Blueprint $table) {
            $table->foreign(['id_Pharmacie'], 'fk_stock_Pharmacie1')->references(['id_Pharmacie'])->on('pharmacie')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_produit'], 'fk_stock_produits1')->references(['id_produit'])->on('produits')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stock', function (Blueprint $table) {
            $table->dropForeign('fk_stock_Pharmacie1');
            $table->dropForeign('fk_stock_produits1');
        });
    }
};
