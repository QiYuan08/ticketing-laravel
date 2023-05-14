<?php

use App\Http\Controllers\User\AgentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Ticket\TicketController;
use App\Http\Controllers\User\NewAgentController;
use App\Models\Ticket;
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
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'data' => Ticket::orderBy('updated_at')->limit(5)->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

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
    Route::get('/agent/{searchTerm?}', [AgentController::class, 'index'])->name('agent');
});

// TICKET 
Route::middleware('auth')->group(function () {
    Route::get('/ticket/{ticketID}', [TicketController::class, 'create'])->name('ticket');
    Route::delete('/ticket/{ticketID}', [TicketController::class, 'delete'])->name('ticket');
});

require __DIR__.'/auth.php';
