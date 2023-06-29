<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Notifications\NewMailNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MailNotificationController extends Controller
{
    public function toggle(Request $request, Ticket $ticket) {

        $request->user()->notify(new NewMailNotification($ticket->ticket_id, now()->toDateString(), $ticket->subject));

        return redirect()->back();
    }

    public function readNotification(Request $request) {

        // if this is clicked from the notification bar, marked it as read
        DB::table('notifications')
            ->where('id', '=', $request->notificationId)
            ->update(['read_at'=> now()]);


        return redirect(route('ticket.get', ['ticketID' => $request->ticketId, 'notificationId' => $request->notificationId]));
    }
}
