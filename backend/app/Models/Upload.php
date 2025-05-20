<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Upload extends Model
{
    protected $fillable = [
        'path',
        'user_id',
        'name',
    ];

    protected $casts = [
        'path' => 'string',
        'user_id' => 'integer',
        'name' => 'string',
    ];
    //
}
