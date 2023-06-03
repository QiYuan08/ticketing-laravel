<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\EmailTemplate;
use Illuminate\Http\Request;

class EmailTemplateController extends Controller
{

    public function store(Request $request) {

        $request->validate([
            'templateName' => ['required', 'unique:App\Models\EmailTemplate,template_name'],
        ]);
        
        EmailTemplate::create([
            'template_name' => $request->input('templateName'),
            'content' => '',
        ]);

        redirect()->back();

    }

    public function update(Request $request, EmailTemplate $template) {

        $template->update([
            'content' => $request->input('template')
        ]);

        redirect()->back();
    }

    public function delete(EmailTemplate $template) {

        $template->delete();

        redirect()->back();
    }


}
