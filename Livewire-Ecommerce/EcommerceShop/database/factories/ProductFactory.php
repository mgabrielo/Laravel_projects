<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Spatie\LaravelIgnition\Support\Composer\FakeComposer;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\odel=Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $product_name = $this->faker->unique()->words($nb = 2, $asText = true);
        $slug = Str::slug($product_name, '-');
        return [
            'name' => $product_name,
            'slug' => $slug,
            'short_desc' => $this->faker->text(200),
            'description' => $this->faker->text(200),
            "regular_price" => $this->faker->numberBetween(10, 500),
            "SKU" => 'PRD' . $this->faker->unique->numberBetween(10, 500),
            'stock_status' => 'instock',
            'quantity' => $this->faker->numberBetween(10, 50),
            'image' => 'product-' . $this->faker->numberBetween(1, 16),
            'category_id' => $this->faker->numberBetween(1, 5),
        ];
    }
}
