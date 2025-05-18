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
        Schema::create('subpages', function (Blueprint $table) {
            $table->id();
            $table->integer('year');
            $table->string('title');
            $table->text('content')->nullable();
            $table->unsignedBigInteger('last_editor')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subpages');
    }
};
