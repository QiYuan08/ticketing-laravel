<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\Messages;
use App\Models\Ticket;
use Barryvdh\Debugbar\Facades\Debugbar;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TicketReplyController extends Controller
{
    public function reply(Request $request, Ticket $ticket)
    {
        // Validate the uploaded file
        // $request->validate([
        //     'files' => 'required|file',
        // ]);

        // update the ticket
        dd($request->input());
        $ticket->update([
            'status_id' => $request->input('status')->status_id,
            'priority_id' => $request->input('priority')->priority_id,
            'assignee_id' => $request->input('assignee')->id,
            'type_id' => $request->input('type')->type_id,
        ]);

        // create new message
        Messages::create([
            'ticket_id' => $ticket->ticket_id,

        ]);


        $attachments = $request->attachment;

        dd($request, $request->attachment);
        
        // foreach($attachments as $file) {

        //     // Generate a unique filename
        //     $filename = $file->getClientOriginalName();
        //     // dump($filename);

        //     // $file->store($filename, 'do_spaces');

        //     // Upload the file to DigitalOcean Spaces
        //     Storage::disk('do_spaces')->put($filename, file_get_contents($file));

        //     // Optionally, you can get the public URL of the uploaded file
        //     $fileUrl = Storage::disk('do_spaces')->get($filename);
            
        //     Debugbar::info($filename, $fileUrl);
        // }
        
        // Perform any additional actions as needed

        // Return a response or redirect
        redirect(route('ticket.get', ['ticketID' => $ticket->ticket_id]));
    }
}
