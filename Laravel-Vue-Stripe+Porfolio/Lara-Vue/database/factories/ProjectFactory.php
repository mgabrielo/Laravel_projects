<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => 'Mordern Website Portfolio',
            'description' => 'Website Adaptable for All Types of Development',
            'link' => 'https://github.com/mgabrielo',
            'photo' => 'avatar.png'
        ];
    }
}
