<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $fillable = [
        'about_id',
        'degree',
        'school',
        'year',
        'gpa',
        'description',
        'isactive',
    ];
}
