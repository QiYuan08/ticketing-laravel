<?php

namespace App\Listeners;

use App\Constant\Role;
use App\Events\NewTicket;
use App\Mail\AutoReplyNewTicketMail;
use App\Models\EmailTemplate;
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
        $content = EmailTemplate::find(Role::DEFAULT_TEMPLATE)->content;

        // replace variable with value
        $content = Str::replace('{{customer}}', $event->ticket->requestor->pic_name, $content);
        $content = Str::replace('{{ticketNumber}}', $event->ticket->ticket_id, $content);
        $content = Str::replace('{{subject}}', $event->ticket->subject, $content);

        Log::debug('auto reply email content', ['data' => $content, 'requestor' => $event->ticket->requestor->email]);
        
        $ticketID = $event->ticket->ticket_id;
        $ticketSubject = $event->ticket->subject;
        
        
        Log::debug('auto reply email content', ['requestor' => $event->ticket->requestor->email]);
        // send the email
        Mail::to($event->ticket->requestor->email)
        ->send(new AutoReplyNewTicketMail((object) [
            'subject' => "#$ticketID - $ticketSubject",
            'content' => $content,
        ])
        );
    }
}
