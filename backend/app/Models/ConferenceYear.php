<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConferenceYear extends Model
{
    protected $fillable = ['year'];
    protected $casts = [
        'year' => 'integer',
    ];
}
