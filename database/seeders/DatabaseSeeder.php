<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Customer;
use App\Models\Messages;
use App\Models\Ticket;
use App\Models\Type;
use App\Models\User;
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
        User::factory(15)->create();

        Customer::factory(30)->create();

        // Type::create([
        //     'type_id' => 1,
        //     'name' => 'SAP Sales',
        // ]);
        
        Ticket::factory(50)->create();


        // Messages::factory()
        // ->count(3)
        // ->for(
        //     User::factory(), 'recipient'
        // )
        // ->for(
        //     User::factory(), 'sender'
        // )
        // ->for(
        //     Customer::factory(), 'recipient'
        // )
        // ->for(
        //     Customer::factory(), 'sender'
        // )
        // ->create();

        // Messages::factory(100)->create();

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
