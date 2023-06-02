<?php

namespace App\Http\Controllers\Ticket;

use App\Constant\MediaCollection;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Messages;
use App\Models\Ticket;
use Barryvdh\Debugbar\Facades\Debugbar;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;

class TicketReplyController extends Controller
{
    public function reply(Request $request, Ticket $ticket)
    {
        // Validate the uploaded file
        // $request->validate([
        //     'files' => 'required|file',
        // ]);

        // update the ticket
        $ticket->update([
            'status_id' => $request->input('status')['status_id'],
            'priority_id' => $request->input('priority')['priority_id'],
            'assignee_id' => $request->input('assignee')['id'],
            'type_id' => $request->input('type')['type_id'],
        ]);

        // create new message if provided
        if ($request->input('message') !== null && $request->input('message') !== "") {
            $message = new Messages();      
            
            $message->ticket_id =  $ticket->ticket_id;
            $message->payload = $request->input('message');
            $message->sender_id = $request->user()->id;
            $message->sender_type = get_class($request->user());
            $message->recipient_id = Customer::find($request->input('recepient')['customer_id'])->customer_id;
            $message->recipient_type = Customer::class;
            $message->internal_node = $request->input('internal_node') ?? false;

            // dd($message);
            $message->save();

            $attachments = $request->attachment;


            // add the respective media/attachment
            foreach($attachments as $file) {
                $message->addMedia($file)->toMediaCollection(MediaCollection::MESSAGE_ATTACHMENT);
            }

        }

        // Return a response or redirect
        redirect(route('ticket.get', ['ticketID' => $ticket->ticket_id]));
    }
}
