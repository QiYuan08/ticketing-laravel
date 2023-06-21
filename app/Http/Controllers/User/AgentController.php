<?php

namespace App\Http\Controllers\User;

use App\Constant\Role;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Termwind\render;

class AgentController extends Controller
{
    public function index(Request $request) {

        $searchTerm = $request->input('searchTerm');

        return Inertia::render('Agent/Agent', 
        [
            'data' => User::when($request->input('searchTerm'), 
                    fn($query) => $query->where(function (Builder $query) use ($searchTerm) {
                        $query->where('name', 'ILIKE', "%$searchTerm%");
                        $query->orWhere('email', 'ILIKE', "%$searchTerm%");
                    }))
                    ->orderBy('updated_at')
                    ->with('role')
                    ->get()
        ]);
    }

    public function delete (Request $request) {
        dd($request->query());
    }

}
