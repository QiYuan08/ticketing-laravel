<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use PDF;

class GenerateTicketHistoryController extends Controller
{
    // public function graphs()
    // {
    //     return view('pdf/customer-ticket-hist');
    // }

    public function generate(Request $request) {
        $pdf = PDF::loadView('pdf/customer-ticket-hist', [
            'title' => 'Ticket History'
        ]);

        $pdf->setOption([
            'enable-javascript' => true, 
        ]);

        $pdfFilePath = public_path('pdf/example.pfd');

        $pdf->save($pdfFilePath);

        // Mail::to('qiyuanteh@gmail.com')
        // ->queue()

        // $pdf->snappy()->setTemporaryFolder(storage_path('snappy'));

        return $pdf->stream('history.pdf');
    }
}
