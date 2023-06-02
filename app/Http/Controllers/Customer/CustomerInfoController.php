<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class CustomerInfoController extends Controller
{
    public function create (Request $request) {
        $query = Customer::filter($request)
        ->orderBy('updated_at', 'desc')
        ->paginate(15);

        return Inertia::render('Customer/CustomerInfo/CustomerInfoList', ['data' => $query]);
    }

    public function view(Customer $customer) {

        $tickets =  Ticket::where('requestor_id', '=', $customer->customer_id)->paginate(15);
        
        return Inertia::render('Customer/CustomerInfo/Index', 
        [
            'data' => $customer,
            'tickets' => $tickets
        ]);
    }

    public function store(Request $request, Customer $customer) {

        // update the model
        $customer->additional_info = $request->input('additionalInfo');
        $customer->save();

        session()->put('success', "$customer->name updated");

        return redirect()->route('customer.info.details', $customer->customer_id);
    }
}
