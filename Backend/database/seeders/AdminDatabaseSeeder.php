<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AdminDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create([
            'name' => 'Roshan Karki',
            'email' => 'Karkiroshan061@gmail.com',
        ]);
    }
}
