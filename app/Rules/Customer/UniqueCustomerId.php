<?php

namespace App\Rules\Customer;

use App\Models\Customer;
use Illuminate\Contracts\Validation\Rule;

class UniqueCustomerId implements Rule
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
        return !Customer::where('alias_customer_id', '=', $value)
        ->where('unknown', false)
        ->withTrashed()
        ->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The customer id has already been taken';
    }
}
