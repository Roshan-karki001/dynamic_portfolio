<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            // Foreign key to the abouts table
            $table->foreignId('about_id')->constrained('abouts')->onDelete('cascade');
            $table->string('degree')->nullable();
            $table->string('school')->nullable();
            $table->string('year')->nullable();
            $table->string('gpa')->nullable();
            $table->text('description')->nullable();
            $table->boolean('isactive')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};
