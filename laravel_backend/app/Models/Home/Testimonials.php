<?php

namespace App\Models\Home;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

class Testimonials extends Model
{
   use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'testimonials';

    // Mass assignable attributes
    protected $fillable = [
        'full_name',
        'title',
        'company_name',
        'review_text',
        'rating',
        'linkedin_url',
        'avatar_url',
        'status',
    ];

    // Attribute casting
    protected $casts = [
        'rating' => 'decimal:1',
        'status' => 'boolean',
    ];

     protected $appends = ['avatar_path']; // Include the accessor in JSON responses

    /**
     * Accessor to get full URL of logo
     */
    public function getAvatarPathAttribute()
    {
        return $this->avatar_url ? asset('storage/' . $this->avatar_url) : null;

    }
    
}
