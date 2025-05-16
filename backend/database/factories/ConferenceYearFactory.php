<?php

namespace Database\Factories;

use App\Models\ConferenceYear;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConferenceYearFactory extends Factory
{
    protected $model = ConferenceYear::class;

    public function definition(): array
    {
        return [
            'year' => $this->faker->year(),
        ];
    }
}

