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

    public function view(Customer $customer) {

        return Inertia::render('Customer/CustomerDetails', ['customer' => $customer]);
    }


    public function update(Request $request, Customer $customer) {

        $request->validate([
            'customerId' => ['unique:App\Models\Customer,alias_customer_id'],
            'picName' => ['required'],
        ]);

        $customer->alias_customer_id = $request->input('customerId');
        $customer->pic_name = $request->input('picName');
        $customer->phone_number = $request->input('phoneNumber');
        $customer->mobile_number = $request->input('mobileNumber');
        $customer->company = $request->input('companyName');
        $customer->company_address = $request->input('address');
        $customer->additional_info = $request->input('additionalInfo'); 
    
        $customer->save();

        return Inertia::render('Customer/CustomerDetails', ['customer' => $customer->refresh()]);

    }

    public function delete(User $customer) {

    }
}
