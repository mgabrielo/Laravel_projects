<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        // \App\Models\Skill::factory(1)->create();
        // \App\Models\Education::factory(1)->create();
        // \App\Models\Experience::factory(1)->create();
        // \App\Models\Project::factory(1)->create();
        Product::factory()->count(20)->create();
        Category::factory()->count(5)->create();

        $categories = Category::all();
        Product::all()->each(function ($product) use ($categories) {
            $product->categories()->attach(
                $categories->random(2)->pluck('id')->toArray()
            );
        });
    }
}
