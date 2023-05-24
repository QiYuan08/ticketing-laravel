<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function create(Request $request) {

        $searchTerm = $request->get('searchTerm');

        $query = Customer::when($searchTerm,         
        fn($query) => $query->where(function (Builder $query) use ($searchTerm) {
            $query->where('pic_name', 'ILIKE', "%$searchTerm%")
            ->orWhere('customer_id', 'ILIKE', "%$searchTerm%")
            ->orWhere('company', 'ILIKE', "%$searchTerm%");
          
        }))
        ->paginate(15);


        return Inertia::render('Customer/CustomerList', ['data' => $query]);
    }


    public function update(User $customer) {

    }

    public function delete(User $customer) {

    }
}
