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
        Schema::create('authentifications', function (Blueprint $table) {
            $table->integer('id_Authentification', true);
            $table->string('email', 100)->unique('email_unique');
            $table->string('password', 100)->nullable();
            $table->boolean('is_connect')->nullable()->default(false);
            $table->integer('id_Utilisateur')->index('fk_authentifications_utilisateur1');
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->nullable()->useCurrent();
            $table->string('remember_token', 100)->nullable();
            $table->timestamp('email_verified_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authentifications');
    }
};
