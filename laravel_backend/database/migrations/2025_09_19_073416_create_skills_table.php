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
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('skill_name');
            $table->string('skill_icon')->nullable();

            $table->enum('level', [
                'beginner',
                'junior_developer',
                'intermediate',
                'advanced',
                'proficient',
                'expert'
            ]);
            $table->enum('title', [
                'frontend',
                'backend',
                'programming_language',
                'database',
                'tools',
                'cloud_devops'
            ]);

            $table->enum('title_icon', [
                'monitor',     // Frontend
                'server',      // Backend
                'code-2',      // Programming Language
                'database',    // Database
                'cloud',       // Cloud & DevOps
                'wrench'       // Tools
            ])->default('code-2');

            $table->json('tools')->nullable(); // Stores an array of tools

            $table->json('currently_learning')->nullable();
            // Expecting structure like: [{"title": "GoLang", "description": "Learning concurrency"}]

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
