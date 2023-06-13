<?php

use App\Http\Controllers\Customer\AddCustomerController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Customer\CustomerInfoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\User\AgentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Settings\EmailTemplateController;
use App\Http\Controllers\Settings\TicketTypeController;
use App\Http\Controllers\Ticket\GenerateTicketHistoryController;
use App\Http\Controllers\Ticket\MergeTicketController;
use App\Http\Controllers\Ticket\TicketController;
use App\Http\Controllers\Ticket\TicketReplyController;
use App\Http\Controllers\User\NewAgentController;
use App\Http\Controllers\View\ViewController;
use App\Models\Ticket;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified']);

// DASHBOARD
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

// USER PROFILE
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// AGENT
Route::middleware('auth')->group(function () {
    Route::get('/new-agent', [NewAgentController::class, 'create'])->name('new-agent');
    Route::post('/new-agent', [NewAgentController::class, 'store'])->name('new-agent');

    Route::get('/agent/{searchTerm?}', [AgentController::class, 'index'])->name('agent.get');
    
    Route::delete('/agent/{agentID}', [AgentController::class, 'delete'])->name('agent.delete');
});

// CUSTOMER
Route::middleware('auth')->name('customer.')->prefix('/customers')->group(function() {
    Route::get('/list', [CustomerController::class, 'create'])->name('list');
    Route::get('/{customer}', [CustomerController::class, 'view'])->name('details');
    Route::patch('/{customer}', [CustomerController::class, 'update'])->name('update');
    Route::delete('/{customer}', [CustomerController::class, 'delete'])->name('delete');
    
    Route::post('/create-new-customer', [AddCustomerController::class, 'store'])->name('create');
    Route::get('/new-customer-page', [AddCustomerController::class, 'create'])->name('create-new');

});

// CUSTOMER ADDITIONAL INFO
Route::middleware('auth')->name('customer.info.')->prefix('/customers-info')->group(function() {
        Route::get('/list', [CustomerInfoController::class, 'create'])->name('list');
        Route::get('/{customer}', [CustomerInfoController::class, 'view'])->name('details');

        Route::patch('/{customer}', [CustomerInfoController::class, 'store'])->name('update');
});

// TICKET 
Route::middleware('auth')
    ->prefix('ticket/')
    ->name('ticket.')
    ->group(function () {
    Route::get('{ticketID}', [TicketController::class, 'create'])->name('get');
    Route::delete('{ticket}', [TicketController::class, 'delete'])->name('delete');

    Route::post('ticket-list', [MergeTicketController::class, 'getIdList'])->name('get-id-list');
    Route::post('merge-ticket/{combinedTicket}/{mergerTicket}', [MergeTicketController::class, 'mergeTicket'])->name('merge-ticket');

    Route::post('attachment/${ticket}', [TicketReplyController::class, 'reply'])->name('attachment.upload');

});

//SETTINGS
Route::middleware('auth')->name('settings.')->prefix('setting')->group(function() {
    
    // Ticket types
    Route::get('/list', [TicketTypeController::class, 'create'])->name('list');
    Route::patch('/types/{type}', [TicketTypeController::class, 'update'])->name('type.update');
    Route::post('/types', [TicketTypeController::class, 'store'])->name('type.create');
    Route::delete('/types/{type}', [TicketTypeController::class, 'delete'])->name('type.delete');

    // Email reply template
    Route::patch('/mail-template/{template}', [EmailTemplateController::class, 'update'])->name('mail-template.update');
    Route::post('/mail-template', [EmailTemplateController::class, 'store'])->name('mail-template.store');
    Route::delete('/mail-template.{template}', [EmailTemplateController::class, 'delete'])->name('mail-template.delete');

});

// VIEW
Route::middleware('auth')->name('views.')->prefix('view')->group(function() {
    Route::get('/list', [ViewController::class, 'create'])->name('list');
    
});

// OTHERS
Route::middleware('auth')->name('utility.')->prefix('utility')->group(function() {
    Route::get('/generate-ticket-pdf', [GenerateTicketHistoryController::class, 'generate'])->name('generate-ticket-pdf');
    
});

require __DIR__.'/auth.php';
