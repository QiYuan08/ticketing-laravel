<?php

namespace App\Rules\Customer;

use App\Models\Customer;
use Illuminate\Contracts\Validation\Rule;

class UniqueEmailForNewCustomer implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {       
        // check if customer with the email and unknown column is not there
        return !Customer::where('email', '=', $value)
            ->where('unknown', false)
            ->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Email already exist';
    }
}
