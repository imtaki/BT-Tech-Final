<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserConferenceYear extends Model
{
    protected $table = 'user_conference_year';

    public $timestamps = false;

    protected $fillable = ['user_id', 'conference_year_id'];
    //
}
