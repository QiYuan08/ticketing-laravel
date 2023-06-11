<?php

namespace App\Http\Controllers\Ticket\API;

use App\Constant\MediaCollection;
use App\Constant\Priority as ConstantPriority;
use App\Constant\Status as ConstantStatus;
use App\Events\NewTicket;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Messages;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CreateTicketController extends Controller
{
    
    public function store(Request $request) {
        Log::debug('received api from', $request->all());
        // Log::debug('received api subject', $request->input('subject'));
        // Log::debug('file received', $request->file());

        // find if the assignee exist
        $user = Customer::where('email', '=', $request->input('from'))->first();


        if ($user === null) {
            $user = Customer::create([
                'email' => $request->input('from'),
                'pic_name' => $request->input('fromName') ?? $request->input('from'),
            ]);
        }

        // check if the ticket exist
        $subject = $request->input('subject');

        // if ticket subject potentially has ticket number, create / update
        if (Str::contains($subject, '#')) {
            // get all the occurence
            $subjectArr = Str::of($subject)->explode('#');
            
            foreach($subjectArr as $subStr) {
                // check if the number is number
                $idx = 1;
                if ($subStr !== "" && is_numeric($subStr[0])) {
                    while(is_numeric($subStr[$idx])){
                        $idx += 1;
                    }

                    // minus one to offset the last while loop
                    $idx -= 1;

                    // find the ticket with id
                    $ticket = Ticket::find(Str::substr($subStr, 0, $idx));

                    // if ticket exist
                    if ($ticket !== null) {

                        // update ticket with message
                        return $this->updateTicket($request, $ticket, $user);
                    
                    } else {
                        // create the new ticket
                        return $this->createTicket($request, $user);
                    }
                }
             }
        } else if ($request->input('inReplyTo') !== "" && $request->input('inReplyTo') !== null) { // if email has references, check if the reference exist in db and update

            $messageId = $request->input('inReplyTo');

            Log::debug('create ticket reply to', [
                'messageId' => $request->input('inReplyTo'),
                'message' => Messages::where('messageId', '=', $messageId)->first(),
            ]);
            $message = Messages::where('messageId', '=', $messageId)->first();

            $ticket = Ticket::find($message->ticket_id);

            // update ticket with message
            return $this->updateTicket($request, $ticket, $user);

        } else {
            // create the new ticket
            return $this->createTicket($request, $user);
        }
    }

    private function updateTicket(Request $request, Ticket $ticket, Customer $user) {
        // create the message
        $message = new Messages();

        $message->ticket_id =  $ticket->ticket_id;
        $message->payload = $request->input('message');
        $message->sender_id = $user->customer_id;
        $message->sender_type = get_class($user);
        $message->recipient_id = '9950c600-ee08-42d2-9e4c-5a1785ff16a4';
        $message->recipient_type = User::class;
        $message->internal_node = false;
        $message->in_reply_to = $request->input('inReplyTo') ?? "";
        $message->messageId = $request->input('messageId');

        $message->save();

        // save the attachment
        foreach($request->file() as $file) {
            $message->addMedia($file)->toMediaCollection(MediaCollection::MESSAGE_ATTACHMENT);
        }

        // update the ticket latest references
        $ticket->latest_reference = $request->input('messageId');
        $ticket->save();

        return response()->json([
            'success' => true,
        ]);
    }

    private function createTicket(Request $request, Customer $user){
        // create the ticket
        $ticket = new Ticket();

        $ticket->requestor_id = $user->customer_id;
        $ticket->subject = $request->input('subject');
        $ticket->priority_id = ConstantPriority::LOW_ID;
        $ticket->status_id = ConstantStatus::TICKET_STATUS_OPEN_ID;
        $ticket->latest_reference = $request->input('messageId');

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
        $message->messageId = $request->input('messageId');

        $message->save();

        // save the attachment
        foreach($request->file() as $file) {
            $message->addMedia($file)->toMediaCollection(MediaCollection::MESSAGE_ATTACHMENT);
        }

        Log::debug('ticket created successfully', ['ticketID' => $ticket->ticket_id]);

        // dispatch event to trigger auto reply
        NewTicket::dispatch($ticket->refresh());

        return response()->json([
            'success' => true,
        ]);
    }
}
