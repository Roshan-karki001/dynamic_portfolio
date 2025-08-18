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
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();

            // Equivalent to Mongoose's `userId` referencing the `users` table
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->text('mystory');

            // JSON fields to hold arrays/objects like education, hobby, achievements
            $table->json('education')->nullable(); // array of objects
            $table->json('hobby')->nullable(); // array of strings
            $table->json('achievements')->nullable(); // array of strings
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abouts');
    }
};
