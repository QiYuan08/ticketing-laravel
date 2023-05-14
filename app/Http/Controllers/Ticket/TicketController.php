<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function create(Request $request) {
        dd($request->ticketID);
    }

    public function delete(Request $request) {
        dd($request->ticketID);
    }
}
