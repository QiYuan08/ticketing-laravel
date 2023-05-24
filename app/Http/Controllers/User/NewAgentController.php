<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Ticket;
use App\Models\User;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class NewAgentController extends Controller
{
    public function create() {
        return Inertia::render('Agent/AddAgent');
    }

    public function store(Request $request) {
        
        // validate input
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:App\Models\User,email'],
            'password' => ['required', 'confirmed'],
        ]);
               
        User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->password),
            'role_id' => Role::where('name', $request->role)->first()->role_id
        ]); 

        return Inertia::render('Agent/Agent', 
        ['data' => User::whereRelation('role', 'name', Role::ADMIN)
            ->orWhereRelation('role', 'name', Role::AGENT)
            ->orderBy('updated_at')
            ->with(['role'])
            ->get()
        ]);    }
} 
