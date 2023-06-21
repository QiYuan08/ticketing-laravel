<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UpdateAgentController extends Controller
{
    public function create(User $agent) {
        return Inertia::render('Agent/EditAgent', ['agent' => $agent]);
    }

    public function store(Request $request, User $agent) {
        dd($agent);
    }
}
