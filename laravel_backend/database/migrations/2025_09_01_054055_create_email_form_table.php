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
        Schema::create('email_form', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->nullable();
            $table->string('work_email');
            $table->string('service');
            $table->string('budget');
            $table->string('project_description');
            $table->string('heard_from');
            $table->text('remarks')->nullable();
            $table->enum('status', ['attended', 'not attended'])->default('not attended');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_form');
    }
};
