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
        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->foreignId('abouts_id')->constrained()->onDelete('cascade');
            $table->string('degree');
            $table->string('university');
            $table->string('start_year');
            $table->string('end_year')->nullable();
            $table->float('gpa', 3, 2)->nullable();
            $table->text('short_description')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('education');
    }
};
