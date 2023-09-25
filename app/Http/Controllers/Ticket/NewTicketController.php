<?php

namespace App\Http\Controllers\Ticket;

use App\Constant\MediaCollection;
use App\Constant\Priority as ConstantPriority;
use App\Constant\Status as ConstantStatus;
use App\Http\Controllers\Controller;
use App\Mail\GeneralMail;
use App\Models\Customer;
use App\Models\Messages;
use App\Models\Priority;
use App\Models\Role;
use App\Models\Status;
use App\Models\Ticket;
use App\Models\Type;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;

class NewTicketController extends Controller
{
    public function create(){
        return Inertia::render('Ticket/CreateNewTicket', [
            "customers" => Customer::where('unknown', '=', false)->get(),
            'type' => Type::all(),
            'agents' => User::whereIn('role_id', [Role::where('name', '=', Role::AGENT)->first()->role_id, Role::where('name', '=', Role::ADMIN)->first()->role_id])
            ->with('role')
            ->get()
            ->map(function ($agent){
                $agent->profilePicture = $agent->getProfilePic();

                return $agent;
            }),
            'status' => Status::all(),
            'priority' => Priority::all(),        
        ]);
    }

    public function save(Request $request) {

        Validator::make($request->all(), 
        [            
            'requestor' => ['required'],
            'assignee' => ['required'],
            "title" => ['required'],
            "message" => ['required']
        ])->validate();

        // create new message id for this ticket
        $messageId = (string) Str::uuid();
        $messageIdStr = "$messageId@magit.sg";

        // create new ticket
        $ticket = new Ticket();
        $ticket->requestor_id = $request->input('requestor')['customer_id'];
        $ticket->assignee_id = $request->input('assignee')['id'];
        $ticket->subject = $request->input('title');
        $request->input('type') && $ticket->type_id = $request->input('type')["type_id"];
        $ticket->status_id = ConstantStatus::TICKET_STATUS_OPEN_ID;
        $ticket->latest_reference = $messageIdStr;
        $ticket->priority_id = $request->input('priority') ? 
            $request->input('priority')["priority_id"] :
            ConstantPriority::LOW_ID;

        $ticket->save();

        // save new message
        if ($request->input('message')) {
            $message = new Messages();
            
            $message->ticket_id =  $ticket->ticket_id;
            $message->payload = $request->input('message');
            $message->sender_id = $request->input('assignee')->id ?? $request->user()->id;
            $message->sender_type = get_class($request->user());
            $message->recipient_id = Customer::where('customer_id', '=',$request->input('requestor')['customer_id'])
            ->withTrashed()
            ->first()
            ->customer_id;
            $message->recipient_type = Customer::class;
            $message->internal_node = $request->input('internalNode') ?? false;
            $message->in_reply_to = $ticket->latest_reference;
            $message->messageId = "<$messageIdStr>";
            
            // add attachment to messages
            if ($request->attachment) {
                foreach($request->attachment as $file) {
                    $message->addMedia($file)->toMediaCollection(MediaCollection::MESSAGE_ATTACHMENT);
                }
            }

            $message->save();

            // send email to user if notify is checked
            if (boolval($request->input('notify'))) {

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

        // return with success
        $request->session()->put('success', 'Ticket created');
    }
}
