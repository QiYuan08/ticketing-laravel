<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\EmailTemplate;
use App\Models\Type;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketTypeController extends Controller
{
    public function create() {

        $typeQuery = Type::orderBy('created_at')->paginate(15);

        return Inertia::render('Setting/Index', [
            'type' => $typeQuery,
            'mailTemplate' => EmailTemplate::orderBy('template_name')->get(),
        ]);
    }

    public function update(Request $request, Type $type) {

        $request->validate([
            'name' => ['required', 'unique:App\Models\Type,name'],
            'type_id' => ['required']
        ]);

        $type->name = $request->input('name');
        $type->save();


        return redirect()->back()->with('success', 'Type Updated');
    }

    public function store(Request $request) {
        $name = $request->input('name');

        $request->validate([
            'name' => ['required', 'unique:App\Models\Type,name'],
        ]);

        Type::create([
            'name' => $request->input('name')
        ]);

        return redirect()->back()->with('success', "$name Added");
    }

    public function delete(Type $type) {
        
        $type->delete();

        return redirect()->route('settings.list')->with('success', "$type->name deleted");
    }
}
