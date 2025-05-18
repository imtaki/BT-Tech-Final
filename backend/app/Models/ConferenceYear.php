<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceYear extends Model
{
    protected $fillable = ['year'];
    protected $casts = [
        'year' => 'integer',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_conference_year');
    }
}
