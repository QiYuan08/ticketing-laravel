<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Rules\Customer\UniqueEmailForNewCustomer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class CustomerController extends Controller
{
    public function create(Request $request) {

        $searchTerm = $request->get('searchTerm');

        $query = Customer::filter($request)
        ->orderBy('updated_at', 'desc')
        ->paginate(15);


        return Inertia::render('Customer/CustomerList', ['data' => $query]);
    }

    public function view(Customer $customer) {

        return Inertia::render('Customer/CustomerDetails', ['customer' => $customer]);
    }


    public function update(Request $request, Customer $customer) {

        $validator = Validator::make($request->all(), 
        [            
            'picName' => ['required'],
            'email' => ['required', new UniqueEmailForNewCustomer], // if, is known, check if the email is unique
        ]);

        // check if the new customer id is unique or not if the newCustomerId is different than old customerId
        $validator->sometimes('newCustomerId', 'unique:App\Models\Customer,customer_id', function ($request) {
            return $request->customerId !== $request->newCustomerId;
        });
        
        
        $customer->alias_customer_id = $request->input('newCustomerId');
        $customer->pic_name = $request->input('picName');
        $customer->email = $request->input('email');
        $customer->phone_number = $request->input('phoneNumber');
        $customer->mobile_number = $request->input('mobileNumber');
        $customer->company = $request->input('companyName');
        $customer->company_address = $request->input('address');
        // $customer->additional_info = $request->input('additionalInfo'); 
    
        $customer->save();

        session()->put('success', 'Customer updated');

        return redirect()->back();
        // return Inertia::render('Customer/CustomerDetails', ['customer' => $customer->refresh()]);

    }

    public function delete(Customer $customer) {
        $customer->delete();

        return redirect()->route('customer.list')->with('success', 'Customer Deleted');
    }
}
