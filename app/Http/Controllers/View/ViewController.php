<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ViewController extends Controller
{
    

    public function create(Request $request) {
        
        return Inertia::render('View/ViewList', 
        [
            'data' => Ticket::filter($request)->withTrashed()->orderByDesc('updated_at') ->paginate(15),
        ]);
    }
}
