<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    protected $model = Customer::class;
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        // Customer ID, Phone number, Mobile number, Company Name, Address.

        return [
            'customer_id' => fake()->uuid(),
            'alias_customer_id' => fake()->text(5),
            'pic_name' => fake()->name(),
            'email' => fake()->email(),
            'phone_number' => fake()->phoneNumber(),
            'mobile_number' => fake()->phoneNumber(),
            'company' => fake()->company(),
            'company_address' => fake()->address()
        ];
    }
}
