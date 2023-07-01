<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Constant\MediaCollection;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes;
    use HasUuids;
    use InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function role()
    {
        return $this->hasOne(Role::class, 'role_id', 'role_id');
    }

    public function tickets() {
        return $this->hasMany(Ticket::class, 'requestor_id');
    }

    // all the ticket this users is handling
    public function handle() {
        return $this->hasMany(Ticket::class, 'assignee_id');
    }

    // messages send
    public function send()
    {
        return $this->morphMany(Messages::class, 'sender');
    }

    // messaged received
    public function received()
    {
        return $this->morphMany(Messages::class, 'recipient');
    }

    //profile picture
    public function getProfilePic() {
        return $this->getFirstMedia(MediaCollection::AGENT_PROFILE)?->getTemporaryUrl(Carbon::now()->addHours(5));
    }
}
