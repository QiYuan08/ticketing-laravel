<?php

namespace App\Http\Controllers;


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
        ->where(function (Builder $query) use ($searchTerm) {
            $query->whereHas('requestor', function (Builder $query) use ($searchTerm) {
                $query->where('requestor_id', '=', request()->user()->id)
                ->when(
                    $searchTerm,
                    fn ($query) => $query->orWhere('pic_name', 'ILIKE', "%$searchTerm%")
                );
            });
            $query->orWhereHas('assignee', function (Builder $query) use ($searchTerm) {
                $query->where('assignee_id', '=', request()->user()->id)
                ->when(
                    $searchTerm,
                    fn ($query) => $query->orWhere('name', 'ILIKE', "%$searchTerm%")
                );
            });
        })
        ->paginate(20);

        return Inertia::render('Dashboard', [
            'data' => $query
        ]);
    }


}
