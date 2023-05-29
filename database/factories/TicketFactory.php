<?php

namespace Database\Factories;

use App\Models\Priority;
use App\Models\Status;
use App\Models\Ticket;
use App\Models\Type;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'assignee_id' => fake()->numberBetween(1, 13),
            'requestor_id' => fake()->numberBetween(1, 13),
            'subject' => $this->faker->realText(50),
            'priority_id' => $this->faker->numberBetween(1,3),
            'status_id' => $this->faker->numberBetween(1,4),
            'type_id' => $this->faker->numberBetween(1,3),
        ];
    }
}
