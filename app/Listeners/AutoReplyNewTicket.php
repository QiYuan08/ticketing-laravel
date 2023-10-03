<?php

namespace App\Listeners;

use App\Constant\Role;
use App\Events\NewTicket;
use App\Mail\AutoReplyNewTicketMail;
use App\Models\Customer;
use App\Models\EmailTemplate;
use App\Models\Messages;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AutoReplyNewTicket implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\NewTicket  $event
     * @return void
     */
    public function handle(NewTicket $event)
    {
        $ticketID = $event->ticket->ticket_id;
        $messageId = Messages::generateMessageId();
        $ticketSubject = $event->ticket->subject;
        $content = EmailTemplate::find(Role::DEFAULT_TEMPLATE)->content;

        // replace variable with value
        $content = Str::replace('{{customer}}', $event->ticket->requestor->pic_name, $content);
        $content = Str::replace('{{ticketNumber}}', $event->ticket->ticket_id, $content);
        $content = Str::replace('{{subject}}', $event->ticket->subject, $content);

        Log::debug('auto reply email content', ['data' => $content, 'requestor' => $event->ticket->requestor]);

        // save new message
        $message = new Messages();

        $message->ticket_id =  $ticketID;
        $message->payload = $content;
        $message->sender_id = User::where('email', '=', 'admin@gmail.com')->withTrashed()->first()->id;
        $message->sender_type = User::class;
        $message->recipient_id = $event->ticket->requestor->customer_id;
        $message->recipient_type = Customer::class;
        $message->internal_node = false;
        $message->in_reply_to = $event->ticket->latest_reference;
        $message->messageId = "<$messageId>";
        $message->save();
        
        
        Log::debug('auto reply email content', ['requestor' => $event->ticket->requestor->email]);
        Log::debug('auto reply ticket', ['ticket' => $event->ticket]);
        Log::debug('auto reply references', ['ticket' => Messages::getReferences($ticketID)]);

        // send the email
        Mail::to($event->ticket->requestor->email)
        ->send(new AutoReplyNewTicketMail((object) [
            'subject' => $ticketSubject,
            'content' => $content,
            'ticketID' => $ticketID,
            'references' => Messages::getReferences($ticketID),
            'messageId' => $messageId
        ])
        );
    }
}
