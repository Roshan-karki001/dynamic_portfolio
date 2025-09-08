<?php

namespace Database\Factories;

use App\Models\CaseStudy;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CaseStudyFactory extends Factory
{
    protected $model = CaseStudy::class;

    public function definition(): array
    {
        $title = $this->faker->sentence(3);

        return [
            'title' => $title,
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'description' => $this->faker->paragraph,
            'link' => $this->faker->url,
            'company' => $this->faker->company,
            'year' => $this->faker->year,
            'industry' => $this->faker->word,
        ];
    }
}
