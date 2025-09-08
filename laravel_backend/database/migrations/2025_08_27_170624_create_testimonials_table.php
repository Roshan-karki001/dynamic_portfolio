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
        Schema::create('testimonials', function (Blueprint $table) {
           
            $table->id(); 
            $table->string('full_name'); // NOT NULL
            $table->string('title')->nullable();
            $table->string('company_name')->nullable();
            $table->text('review_text'); // NOT NULL
            $table->decimal('rating', 2, 1)->default(0.0); 
            $table->string('linkedin_url')->nullable();
            $table->string('avatar_url')->nullable();
            $table->boolean('status')->default(true); 
            $table->timestamps(); // created_at and updated_at
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
