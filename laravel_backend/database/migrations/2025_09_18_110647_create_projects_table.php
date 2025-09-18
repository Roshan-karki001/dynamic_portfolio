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
            $table->string('project_logo')->nullable();
            $table->string('title')->nullable();
            $table->string('slug')->unique();
            $table->longText('description')->nullable();
            $table->string('date')->nullable();
            $table->enum('done_by', ['Solo Project', 'Team Project'])->nullable();
            $table->json('tech_used')->nullable();
            $table->json('key_highlight')->nullable();
            $table->string('code_link')->nullable();
            $table->string('demo_link')->nullable();
            $table->enum('status', ['completed', 'in progress', 'planning'])->nullable();
            $table->boolean('is_active')->default(true);
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
