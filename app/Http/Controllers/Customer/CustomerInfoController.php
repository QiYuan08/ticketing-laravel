<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class CustomerInfoController extends Controller
{
    public function create (Request $request) {
        $searchTerm = $request->get('searchTerm');

        $query = Customer::when($searchTerm,         
        fn($query) => $query->where(function (Builder $query) use ($searchTerm) {
            $query->where('pic_name', 'ILIKE', "%$searchTerm%")
            ->orWhere('customer_id', 'ILIKE', "%$searchTerm%")
            ->orWhere('company', 'ILIKE', "%$searchTerm%");
          
        }))
        ->orderBy('updated_at', 'desc')
        ->paginate(15);

        return Inertia::render('Customer/CustomerInfo', ['data' => $query]);
    }

    public function view(Request $request, Customer $customer) {
        
        return Inertia::render('Customer/CustomerInfoDetails', ['data' => $customer]);
    }
}
