<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        if ($user) {
            $user->profilePicture = $user->getProfilePic();
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
                'access_lvl' => $request->user()?->role->access_lvl,
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'alert'=> [
                'error' => session()->get('error'),
                'info' => session()->get('info'),
                'success' => session()->get('success'),
            ],
            'additionalInfo'=> [
                'sessionData' => session()->get('sessionData'),
                'unreadNotificationCount' => $request->user()?->unreadNotifications()->count(),
                'unreadNotification' => $request->user() ? DB::table('notifications')
                                            ->where('notifiable_id', '=', $request->user()->id)
                                            ->whereNull('read_at')
                                            ->get()
                                            ->map(function ($msg) {
                                                return (object) [
                                                    'data' => json_decode($msg->data),
                                                    'id' =>$msg->id
                                                ];
                                            }) : []
                                            // ->pluck('created_at', 'data')
            ]
        ]);
    }
}
