<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\EmailTemplate;
use App\Models\Type;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

use function PHPSTORM_META\type;

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
        $validator = Validator::make($request->all(), 
        [            
            'type_id' => ['required'],
            'deduction_rate' => ['required'],
            'name' => ['required']
        ]);

        // check if the new ticket name  is unique or not 
        $validator->sometimes('name', 'unique:App\Models\Type,name', function ($request) use ($type) {
            return $request->input('name') !== $type->name;
        });


        $type->name = $request->input('name');
        $type->deduction_rate = $request->input('deduction_rate');
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
