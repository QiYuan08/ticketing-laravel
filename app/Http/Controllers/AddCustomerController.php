<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;


class AddCustomerController extends Controller
{
    public function create() {

        return Inertia::render('Customer/AddCustomer');

    }

    public function store(Request $request) {

        Debugbar::info($request->all());
        // dd( $request->input('picName'));

        $request->validate([
            'customerId' => ['unique:App\Models\Customer,customer_id'],
            'picName' => ['required'],
            'companyName' => ['required'],
            'address' => ['required'],            
        ]);
        
        $customerId = ($request->customerId === null || $request->customerId === '') ?  Str::uuid()->toString() : $request->input('customerId');

        Customer::create([
            'customer_id' => $customerId,
            'pic_name' => $request->input('picName'),
            'phone_number' => $request->input('phoneNumber'),
            'mobile_number' => $request->input('mobileNumber'),
            'company' => $request->input('companyName'),
            'company_address' => $request->input('address')        
        ]);

        return redirect(route('customer.list'));
    }
}
