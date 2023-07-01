<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Messages;
use App\Models\Ticket;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use PDF;

class GenerateTicketHistoryController extends Controller
{
    // public function graphs()
    // {
    //     return view('pdf/customer-ticket-hist');
    // }


//     $tickets = Ticket::where('requestor_id', '=', $request->input('customer_id'))
//     ->where(function($query) use ($request) {
//         $query->where('created_at', '>=', $request->input('startDate'))
//             ->Where('created_at', '<=', $request->input('endDate'));
//     })
//     ->get();

// $tickets->map(function($ticket) {
// return $ticket->messages = Messages::where('ticket_id', '=', $ticket->ticket_id)->get()->toArray();
// });

    public function generate(Request $request) {

        $requestInfo = $request->all('data')['data'];

        $tickets = Ticket::where('requestor_id', '=', '99609874-3ce4-4775-ad48-e5ca84c4554e')
                ->where(function($query) use ($requestInfo) {
                    $query->where('created_at', '>=', '2023-05-28')
                        ->Where('created_at', '<=', '2023-07-18');
                })
                ->get();

        $tickets->map(function($ticket) {
            return $ticket->messages = Messages::where('ticket_id', '=', $ticket->ticket_id)
                ->where('internal_node', '=', false)
                ->get()
                ->toArray();
        });

        // dd($ticket->messages->toArray());
        $pdf = PDF::loadView('pdf/customer-ticket-hist', [
            'requestor' => 'yuan 2',
            'title' => 'Ticket History',
            'tickets' => $tickets->toArray(),
            // 'messages' => $ticket->messages,
            'date' => Carbon::now()->setTimezone('Asia/Kuala_Lumpur')->format('l jS \\of F Y h:i:s A'),
        ]);

        $pdf->setOption('enable-javascript', true);

        // $uuid = (string) Str::uuid();

        // $pdfFilePath = public_path("pdf/$uuid example.pdf");

        $pdf->snappy()->setTemporaryFolder(storage_path('snappy'));

        // $pdf->save($pdfFilePath);

        // Mail::to('qiyuanteh@gmail.com')
        // ->queue(new GeneralMail((object) [
        //     'subject' => $ticket->subject,
        //     ''
        // ]))

        // $pdf->snappy()->setTemporaryFolder(storage_path('snappy'));

        return $pdf->download('history.pdf');
    }
}
