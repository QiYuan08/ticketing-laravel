<?php

namespace App\Http\Controllers\User;

use App\Constant\Role;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Termwind\render;

class AgentController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('Agent/Agent', 
        ['data' => User::whereRelation('role', 'name', Role::ADMIN)
            ->orWhereRelation('role', 'name', Role::AGENT)
            ->orderBy('updated_at')
            ->limit(5)
            ->with('role')
            ->get()
        ]);

    }

}
