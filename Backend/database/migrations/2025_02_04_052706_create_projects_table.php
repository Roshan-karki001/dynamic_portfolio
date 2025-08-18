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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->text('long_description')->nullable();
            $table->string('image')->nullable(); // emoji or URL
            $table->json('tech')->nullable(); // array of technologies
            $table->string('category')->nullable(); // web, mobile, ai, etc.
            $table->enum('status', ['completed', 'in-progress'])->nullable(); // enum
            $table->string('github')->nullable();
            $table->string('demo')->nullable();
            $table->string('date')->nullable(); // stored as string like "2023", "2024"
            $table->string('team')->nullable();
            $table->json('highlights')->nullable(); // array of strings
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
