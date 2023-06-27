<?php

namespace App\Http\Controllers\Ticket;

use App\Constant\MediaCollection;
use App\Http\Controllers\Controller;
use App\Mail\GeneralMail;
use App\Mail\SiteVisitMail;
use App\Models\Customer;
use App\Models\Messages;
use App\Models\Ticket;
use AWS\CRT\HTTP\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use PDF;

class GenerateSiteVisitPdfController extends Controller
{
    public function create(Ticket $ticket) {
        
        return Inertia::render('Ticket/GenerateSiteVisitPdf', ['ticket' => $ticket]);
    }

    public function store(Request $request, Ticket $ticket) {
        
        $file = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '',$request->input('imageURL'))); 
    
        $name = Str::random(15).'_signature.png'; 

        Storage::disk('public')->put($name, $file);

        $pdf = PDF::loadView('pdf/site-visit', [
            'ticketId' => $ticket->ticket_id,
            'company' =>  $request->input('company') ?? "N/A",
            'picName' => $request->input('picName') ?? "N/A",
            'email' =>  $request->input('email') ?? "N/A",
            'contact' => $request->input('contact') ?? "N/A",
            'Date' => $request->input('Date') ?? "N/A",
            'time' => $request->input('time') ?? "N/A",
            'customerId' => $request->input('customerId') ?? "N/A",
            'engineer' => $request->input('engineer') ?? "N/A",
            'service' => (boolean) $request->input('service') ?? false,
            'workOrder' => (boolean) $request->input('workOrder') ?? false,
            'others' => (boolean) $request->input('others') ?? false,
            'othersText' => $request->input('othersText') ?? "",
            'problem' => $request->input('problem') ?? "",
            'detail' => $request->input('detail') ?? "",
            'requestorName' => $request->input('requestorName') ?? "",
            'maintenancePlan' =>  (boolean) $request->input('maintenancePlan') ?? false,
            'adHoc' => (boolean) $request->input('adHoc') ?? false,
            'adHocFee' => $request->input('adHocFee') ?? "",
            'imageURL' => $name,
        ]);
        $pdf->setOption('enable-javascript', true);

        $pdf->snappy()->setTemporaryFolder(storage_path('snappy'));
        
        // return $pdf->inline('history.pdf');

        // create the new message
        $message = new Messages();
            
        $messageId = (string) Str::uuid();
        $messageIdStr = "s$messageId@magit.sg";

        $message->ticket_id =  $ticket->ticket_id;
        $message->payload = 'A site visit was completed, with the attached details';
        $message->sender_id = $request->user()->id;
        $message->sender_type = get_class($request->user());
        $message->recipient_id = $ticket->requestor->customer_id;
        $message->recipient_type = Customer::class;
        $message->internal_node = true;
        $message->in_reply_to = $ticket->latest_reference;
        $message->messageId = "<$messageIdStr>";

        $message
        ->addMediaFromString($pdf->output())
        ->usingFileName("SITE_VISIT_$ticket->ticket_id" ."_" . Str::uuid() . '.pdf')
        ->toMediaCollection(MediaCollection::MESSAGE_ATTACHMENT);

        $message->save();

        // delete the tmp signature
        Storage::disk('public')->delete($name);

        // send the email
        Mail::to($request->input('email') ?? $ticket->requestor->email)
        ->queue(new SiteVisitMail((object) [
            'ticketID' => $ticket->ticket_id,
            'name' =>  $request->input('requestorName') ?? $ticket->requestor->pic_name,
            'date' => now()->toDateString(),
            'subject' => 'MAGIT Site Visit Summary',
            'content' => $message->payload,
            'messageId' => $messageIdStr
        ], $message));



        return redirect()->route('ticket.get', ['ticketID' => $ticket->ticket_id]);

        // dd($request->input('imageURL'));
    }
}
