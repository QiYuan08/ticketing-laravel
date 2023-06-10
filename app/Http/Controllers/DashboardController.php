<?php

namespace App\Http\Controllers;

use App\Constant\Priority;
use App\Constant\Status;
use App\Models\Staus;
use App\Models\Ticket;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class DashboardController extends Controller
{


    public function index(Request $request) {

        $filters = request()->all();
        $searchTerm = request()->get('searchTerm');
        Debugbar::info($filters, $filters['solved'] ?? false);


        // TODO: add the requestor and assignee search Term
        $query = Ticket::filter($request)
        ->paginate(20);

        return Inertia::render('Dashboard', [
            'data' => $query
        ]);
    }


}
