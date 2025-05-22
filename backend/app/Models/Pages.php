<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pages extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'last_editor', 'is_index', 'is_link'];
    protected $casts = [
        'title' => 'string',
        'year' => 'integer',
        'content' => 'string',
        'last_editor' => 'integer',
        'is_index' => 'integer',
        'is_link' => 'integer'
    ];
}
