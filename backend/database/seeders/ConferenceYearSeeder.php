<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ConferenceYear;

class ConferenceYearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $years = [2023, 2024, 2025];

        foreach ($years as $year) {
            ConferenceYear::create(['year' => $year]);
        }
    }
}
