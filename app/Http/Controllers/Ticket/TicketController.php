<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\Priority;
use App\Models\Role;
use App\Models\Status;
use App\Models\Ticket;
use App\Models\Type;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function create(Request $request) {

        // dd($request->ticketID, Ticket::where('ticket_id', '=', $request->ticketID)->with(['priority','status','type', 'assignee', 'requestor'])->first());
        return Inertia::render('Ticket/TicketDetails', 
        [
            'data' => Ticket::where('ticket_id', '=', $request->ticketID)
                    ->with(['priority','status','type', 'assignee', 'requestor', 'requestor.role', 'assignee.role', 'messages', 'messages.to', 'messages.from'])->first(),
            'agents' => User::whereIn('role_id', [Role::where('name', '=', Role::AGENT)->first()->role_id, Role::where('name', '=', Role::ADMIN)->first()->role_id])
                            ->with('role')
                            ->get(),
            'type' => Type::all(),
            'status' => Status::all(),
            'priority' => Priority::all(),
            
        ]);
    }

    public function delete(Request $request) {
        dd($request->ticketID);
    }
}
