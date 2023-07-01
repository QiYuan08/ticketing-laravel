<?php

namespace App\Http\Controllers\Agent;

use App\Constant\MediaCollection;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UpdateAgentController extends Controller
{
    public function create(User $agent) {

        return Inertia::render('Agent/EditAgent', ['agent' => $agent->with('role')->first(), 'agentList' => Role::all()]);
    }

    public function store(Request $request, User $agent) {
        
        $agent->update([
            'name' => $request->input('name'),
            'role_id' => $request->input('role')
        ]);

        session()->put('success', 'Agent updated');

        return redirect(route('agent.update-view',['agent' =>  $agent->id]));
    }

    public function updatePhoto(Request $request, User $agent) {

        // if got profile picture already, delete old one
        if ($agent->getFirstMedia(MediaCollection::AGENT_PROFILE) !== null){
            $agent->getFirstMedia(MediaCollection::AGENT_PROFILE)->delete();
        }

        $agent->addMedia($request->file()['data']['file'])->toMediaCollection(MediaCollection::AGENT_PROFILE);

        return redirect()->back();
    }
}
