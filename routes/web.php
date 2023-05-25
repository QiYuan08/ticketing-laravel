<?php

use App\Http\Controllers\AddCustomerController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\User\AgentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Ticket\TicketController;
use App\Http\Controllers\Ticket\TicketReplyController;
use App\Http\Controllers\User\NewAgentController;
use App\Models\Ticket;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Application;
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
Route::middleware('auth')->name('customer.')->group(function() {
    Route::get('/customers', [CustomerController::class, 'create'])->name('list');
    Route::get('/customers/{customer}', [CustomerController::class, 'view'])->name('details');
    Route::patch('/customers/{customer}', [CustomerController::class, 'update'])->name('update');
    Route::delete('/{customer}', [CustomerController::class, 'delete'])->name('delete');

    Route::post('/new-customer', [AddCustomerController::class, 'store'])->name('create');
    Route::get('/new-customer', [AddCustomerController::class, 'create'])->name('create');
});

// TICKET 
Route::middleware('auth')
    ->prefix('ticket/')
    ->name('ticket.')
    ->group(function () {
    Route::get('{ticketID}', [TicketController::class, 'create'])->name('get');
    Route::delete('{ticketID}', [TicketController::class, 'delete'])->name('delete');

    Route::post('attachment/${ticket}', [TicketReplyController::class, 'reply'])->name('attachment.upload');
});

require __DIR__.'/auth.php';
