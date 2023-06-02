<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Priority;
use App\Models\Status;
use App\Models\Ticket;
use App\Models\Type;
use App\Models\User;
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
            'assignee_id' => fake()->randomElement(User::all()->pluck('id')->toArray()),
            'requestor_id' => fake()->randomElement(Customer::all()->pluck('customer_id')->toArray()),
            'subject' => $this->faker->realText(50),
            'priority_id' => $this->faker->numberBetween(1,3),
            'status_id' => $this->faker->numberBetween(1,4),
            'type_id' => fake()->randomElement([1, 2, 3]),
        ];
    }
}
