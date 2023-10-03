<?php

namespace App\Http\Controllers\Ticket;

use App\Constant\MediaCollection;
use App\Constant\Status;
use App\Http\Controllers\Controller;
use App\Mail\GeneralMail;
use App\Models\Customer;
use App\Models\Messages;
use App\Models\Ticket;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class TicketReplyController extends Controller
{
    public function reply(Request $request, Ticket $ticket)
    {
        $previousStatus = $ticket->status_id;
        // Validate the uploaded file
        // $request->validate([
        //     'files' => 'required|file',
        // ]);

        // update the ticket
        $request->input('status') && $ticket->status_id = $request->input('status')['status_id'];
        $request->input('priority') && $ticket->priority_id = $request->input('priority')['priority_id'];
        $request->input('assignee') && $ticket->assignee_id = $request->input('assignee')['id'];
        $request->input('customer') && $ticket->customer_id = $request->input('customer')['customer_id'];
        $request->input('requestor') && $ticket->requestor_id = $request->input('requestor')['customer_id'];
        $request->input('type') && $ticket->type_id = $request->input('type')['type_id'];

        // if ticket solve and got assigned customer
        if ( $request->input('status')['status_id'] === Status::TICKET_STATUS_SOLVED_ID && $ticket->customer_id && $previousStatus !== $ticket->status_id) {
            $job_type = Type::find($ticket->type_id)->deduction_rate;
            $customer = Customer::find($ticket->customer_id);

            $customer->job_order -= $job_type;

            $customer->save();
        }

        $ticket->save();
        $ticket->refresh();


        // create new message if provided
        if ($request->input('message') !== null && $request->input('message') !== "") {
            // update latest assignee to the one replying the message
            $ticket->assignee_id = $request->user()->id;
            $ticket->save();

            // save new message
            $message = new Messages();
            
            $messageId = (string) Str::uuid();
            $messageIdStr = "s$messageId@magit.sg";

            $message->ticket_id =  $ticket->ticket_id;
            $message->payload = $request->input('message');
            $message->sender_id = $request->user()->id;
            $message->sender_type = get_class($request->user());
            $message->recipient_id = Customer::where('customer_id', '=',$request->input('recepient')['customer_id'])
                                        ->withTrashed()
                                        ->first()
                                        ->customer_id;
            $message->recipient_type = Customer::class;
            $message->internal_node = $request->input('internalNode') ?? false;
            $message->in_reply_to = $ticket->latest_reference;
            $message->messageId = "<$messageIdStr>";

            // dd($message);
            $attachments = $request->attachment;
            
            
            // add the respective media/attachment
            if ($attachments) {
                foreach($attachments as $file) {
                    $message->addMedia($file)->toMediaCollection(MediaCollection::MESSAGE_ATTACHMENT);
                }
            }

            $message->save();
            
            // if it's not a internal node send the message
            if(!$request->input('internalNode')){
                // send the email
                Mail::to($ticket->requestor->email)
                ->queue(new GeneralMail((object) [
                    'ticketID' => $ticket->ticket_id,
                    'subject' => $ticket->subject,
                    'content' => $request->input('message'),
                    'references' => Messages::getReferences($ticket->ticket_id),
                    'messageId' => $messageIdStr
                ], $message));
            }
                
        }

        // Return a response or redirect
        redirect(route('ticket.get', ['ticketID' => $ticket->ticket_id]));
    }
}
