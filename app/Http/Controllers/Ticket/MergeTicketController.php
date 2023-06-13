<?php

namespace App\Http\Controllers\Ticket;

use App\Constant\Status;
use App\Http\Controllers\Controller;
use App\Models\Messages;
use App\Models\Ticket;
use Illuminate\Http\Request;

class MergeTicketController extends Controller
{
    public function mergeTicket(Request $request, Ticket $combinedTicket, Ticket $mergerTicket) {

        // combined ticket is the ticket that is merged (get additional message)
        // merger ticket is the ticket being merged (closed)

        // create internal message to show that ticket was merged or combined
        Messages::create([
            'ticket_id' => $combinedTicket->ticket_id,
            'internal_node' => true,
            'payload' => $request->input('combinedMsg'),
            'recipient_id'=> $request->user()->id,
            'recipient_type' => get_class($request->user()),
            'sender_id' => $request->user()->id,
            'sender_type'=> get_class($request->user()),
            'in_reply_to',
            'messageId',
        ]);

        // set the status to closed for merger ticket
        $mergerTicket->status_id = Status::TICKET_STATUS_CLOSED_ID;
        $mergerTicket->save();

        // copy over the message to combined ticket
        $newMessage = Messages::where('ticket_id', '=', $mergerTicket->ticket_id)->orderBy('created_at', 'asc')->get();

        $newMessage->map(function ($message) use($mergerTicket, $combinedTicket){
            Messages::create([
                'ticket_id' => $combinedTicket->ticket_id,
                'internal_node' => $message->internal_node,
                'sender_type' => $message->sender_type,
                'sender_id' => $message->sender_id,
                'recipient_type' => $message->recipient_type,
                'recipient_id' => $message->recipient_id,
                'payload' => $message->payload,
                'in_reply_to' => $message->in_reply_to,
                'messageId' => $message->messageId,
                'source_ticket' => $mergerTicket->ticket_id
            ]);
        });
        
        // create internal message to show that ticket is closed (so that it wont show in the combined ticket)
        Messages::create([
            'ticket_id' => $mergerTicket->ticket_id,
            'internal_node' => true,
            'payload' => $request->input('mergerMsg'),
            'recipient_id'=> $request->user()->id,
            'recipient_type' => get_class($request->user()),
            'sender_id' => $request->user()->id,
            'sender_type'=> get_class($request->user()),
            'in_reply_to',
            'messageId',
        ]);


        redirect(route('ticket.get', $mergerTicket->ticket_id))->with('success', 'Ticket merged');
    }

    public function getIdList(Request $request) {
        
        $searchTerm = $request->input('searchTerm');

        return redirect()->back()
            ->with(
                ['sessionData' => Ticket::where('ticket_id', 'ILIKE', "%$searchTerm%")
                            ->where('status_id', '!=', Status::TICKET_STATUS_CLOSED_ID)
                            ->limit(10) 
                            ->get()
                            ->map(function ($item){
                                return (object) [
                                    'ticket_id' => $item->ticket_id,
                                    'subject' => $item->subject,
                                    'pic_name' => $item->requestor->pic_name,
                                    'created_at' => $item->created_at
                                ];
                            })
            ]);
    }

}
