<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Rules\Customer\UniqueCustomerId;
use App\Rules\Customer\UniqueEmailForNewCustomer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AddCustomerController extends Controller
{
    public function create(Request $request) {
        return Inertia::render('Customer/AddCustomer');

    }

    public function store(Request $request) {

        $request->validate([
            'email' => ['required', new UniqueEmailForNewCustomer], // if, is known, check if the email is unique
            'customerId' => [new UniqueCustomerId],
            'picName' => ['required'],
        ]);
        
        $customerId = $request->input('customerId') === null || trim($request->input('customerId')) === '' ?  
                        Str::random(12) : 
                        $request->input('customerId');

        // if is previously unknown customer
        if (Customer::where('email', '=', $request->input('email'))->withTrashed()->exists()){
            $customer = Customer::where('email', '=', $request->input('email'))->withTrashed()->first();

            if($customer->trashed()) {
                $customer->restore();
            }

            $customer->alias_customer_id = $customerId;
            $customer->pic_name = $request->input('picName');
            $customer->email = $request->input('email');
            $customer->unknown = false;
            $request->input('phoneNumber') && $customer->phone_number = $request->input('phoneNumber');
            $request->input('mobileNumber') &&  $customer->mobile_number = $request->input('mobileNumber');
            $request->input('companyName') && $customer->company = $request->input('companyName');
            $request->input('address') && $customer->company_address = $request->input('address');
            $request->input('additionalInfo') && $customer->additional_info = $request->input('additionalInfo'); 

            $customer->save();
            
        } else {

            Customer::create([
                'alias_customer_id' => $customerId,
                'pic_name' => $request->input('picName'),
                'email' => $request->input('email'),
                'phone_number' => $request->input('phoneNumber'),
                'mobile_number' => $request->input('mobileNumber'),
                'company' => $request->input('companyName'),
                'company_address' => $request->input('address'),
                'additional_info' => $request->input('additionalInfo'),
                'unknown' => false 
            ]);
        }
        


        return redirect(route('customer.list'));
    }
}
