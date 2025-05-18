<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subpages extends Model
{
    protected $fillable = ['title', 'year', 'content', 'last_editor'];
    protected $casts = [
        'title' => 'string',
        'year' => 'integer',
        'content' => 'string',
        'last_editor' => 'integer'
    ];

}
