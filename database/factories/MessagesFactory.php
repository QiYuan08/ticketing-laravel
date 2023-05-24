<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Messages>
 */
class MessagesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'ticket_id' => fake()->numberBetween(1, 50),
            'payload' => fake()->randomHtml(4, 5),
            'internal_node' => false,
            'from' => fake()->numberBetween(1, 15),
            'to' => fake()->numberBetween(1, 15),
        ];
    }
}
