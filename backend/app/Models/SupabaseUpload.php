<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupabaseUpload extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'path',
        'url',
        'size',
        'user_id',
    ];
}
