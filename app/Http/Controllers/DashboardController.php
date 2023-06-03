<?php

namespace App\Http\Controllers;

use App\Models\Priority;
use App\Models\Status;
use App\Models\Ticket;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class DashboardController extends Controller
{
    private function getVal(Request $request, $key) {
        return $request->get($key) === 'true' ? true : false;
    }

    public function index(Request $request) {

        $filters = request()->all();
        $searchTerm = request()->get('searchTerm');
        Debugbar::info($filters, $filters['solved'] ?? false);


        // TODO: add the requestor and assignee search Term
        $query = Ticket::
        when($searchTerm, 
        fn($query) => $query->where(function (Builder $query) use ($searchTerm) {
            $query->where('subject', 'ILIKE', "%$searchTerm%")
            ->orWhere('ticket_id', 'ILIKE', "%$searchTerm%");
            // ->whereHas('assignee', function (Builder $query) use ($searchTerm) {
            //     $query->orWhere('name', 'ILIKE', "%$searchTerm%");
            // })
            // ->orWhereHas('requestor', function (Builder $query) use ($searchTerm) {
            //     $query->orWhere('name', 'ILIKE', "%$searchTerm%");
            // });
        }))
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
        ->where(function (Builder $query) use ($filters, $request) {
            $query->when( 
                $this->getVal($request, 'high'), 
                fn ($query, $value) => $query->orWhere('priority_id', '=', Priority::HIGH_ID)
            )
            ->when( 
                $this->getVal($request, 'medium'), 
                fn ($query, $value) => $query->orWhere('priority_id', '=', Priority::MEDIUM_ID)

            )
            ->when( 
                $this->getVal($request, 'low'), 
                fn ($query, $value) => $query->orWhere('priority_id', '=', Priority::LOW_ID)

            );
        })
        ->where(function (Builder $query) use ($filters, $request) {
            $query->when( 
                $this->getVal($request, 'open'), 
                fn ($query, $value) => $query->orWhere('status_id', '=', Status::TICKET_STATUS_OPEN_ID)

            )
            ->when( 
                $this->getVal($request, 'deleted'), 
                fn ($query, $value) => $query->orWhere('status_id', '=', Status::TICKET_STATUS_DELETED_ID)

            )
            ->when( 
                $this->getVal($request, 'pending'), 
                fn ($query, $value) => $query->orWhere('status_id', '=', Status::TICKET_STATUS_PENDING_ID)

            )
            ->when( 
                $this->getVal($request, 'solved'), 
                fn ($query, $value) => $query->orWhere('status_id', '=', Status::TICKET_STATUS_SOLVED_ID)

            );
        })
        ->with(['requestor', 'assignee'])
        ->paginate(2);

        return Inertia::render('Dashboard', [
            'data' => $query
        ]);
    }


}
