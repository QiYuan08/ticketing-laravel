<?php

namespace App\Http\Controllers\Ticket\API;

use App\Constant\MediaCollection;
use App\Constant\Priority as ConstantPriority;
use App\Constant\Status as ConstantStatus;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Messages;
use App\Models\Priority;
use App\Models\Status;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CreateTicketController extends Controller
{
    
    public function store(Request $request) {
        Log::debug('received api content', $request->all());
        Log::debug('file received', $request->file());

        // find if the assignee exist
        $user = Customer::where('email', '=', $request->input('from'))->first();

        Log::debug($user);
        Log::debug($user === null);
        Log::debug($request->input('from'));

        if ($user === null) {
            $user = Customer::create([
                'email' => $request->input('from'),
                'pic_name' => $request->input('fromName') ?? $request->input('from'),
            ]);
        }

        // create the ticket
        $ticket = new Ticket();

        $ticket->requestor_id = $user->customer_id;
        $ticket->subject = $request->input('subject');
        $ticket->priority_id = ConstantPriority::LOW_ID;
        $ticket->status_id = ConstantStatus::TICKET_STATUS_OPEN_ID;

        $ticket->save();

        // create the message
        $message = new Messages();

        $message->ticket_id =  $ticket->ticket_id;
        $message->payload = $request->input('message');
        $message->sender_id = $user->customer_id;
        $message->sender_type = get_class($user);
        $message->recipient_id = '9950c600-ee08-42d2-9e4c-5a1785ff16a4';
        $message->recipient_type = User::class;
        $message->internal_node = false;

        $message->save();

        // save the attachment
        foreach($request->file() as $file) {
            $message->addMedia($file)->toMediaCollection(MediaCollection::MESSAGE_ATTACHMENT);
        }

        Log::debug('ticket created successfully', ['ticketID' => $ticket->ticket_id]);

        return response()->json([
            'success' => true,
        ]);
    }
}
