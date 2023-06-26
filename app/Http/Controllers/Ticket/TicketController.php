<?php

namespace App\Http\Controllers\Ticket;

use App\Constant\Status as ConstantStatus;
use App\Http\Controllers\Controller;
use App\Models\EmailTemplate;
use App\Models\Messages;
use App\Models\Priority;
use App\Models\Role;
use App\Models\Status;
use App\Models\Ticket;
use App\Models\Type;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TicketController extends Controller
{
    public function create(Request $request) {
        // query ticket and revelant relationships
        $tickets = Ticket::where('ticket_id', '=', $request->ticketID)
                            ->with(['type', 'assignee.role'])
                            ->first();
                            
        $messages = Messages::where('ticket_id', '=', $request->ticketID)
                            ->orderBy('created_at', 'asc')
                            ->with(['recipient', 'sender'])
                            ->get();

        // query the attachment
        $messages->map(function($message){
            $message->attachment = $message->getMessageMedia();
        });

        

        // dd($request->ticketID, Ticket::where('ticket_id', '=', $request->ticketID)->with(['priority','status','type', 'assignee', 'requestor'])->first());
        return Inertia::render('Ticket/TicketDetails', 
        [
            'data' => $tickets,
            'messages' => $messages,
            'agents' => User::whereIn('role_id', [Role::where('name', '=', Role::AGENT)->first()->role_id, Role::where('name', '=', Role::ADMIN)->first()->role_id])
                            ->with('role')
                            ->get(),
            'type' => Type::all(),
            'templates' => EmailTemplate::all(),
            'status' => Status::all(),
            'priority' => Priority::all(),
            
        ]);
    }

    public function delete(Ticket $ticket) {

        $ticket->update([
            'status_id' => ConstantStatus::TICKET_STATUS_DELETED_ID
        ]);

        return redirect(route('views.list'))->with('success', 'Ticket Deleted');
    }


}
