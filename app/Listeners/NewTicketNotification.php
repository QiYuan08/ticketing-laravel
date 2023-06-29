<?php

namespace App\Listeners;

use App\Events\NewTicket;
use App\Events\NewtTicket;
use App\Models\User;
use App\Notifications\NewMailNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class NewTicketNotification
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
     * Handle the event: send notification to every user when there is new ticket
     * 
     * @param  \App\Events\NewtTicket  $event
     * @return void
     */
    public function handle(NewTicket $event)
    {
        $ticket = $event->ticket;   
        $ticket->new = true;

        Notification::send(User::all(), new NewMailNotification($ticket));
    }
}
