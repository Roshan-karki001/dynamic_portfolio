<?php

namespace App\Models\Home;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class TrustedClients extends Model
{
    use HasFactory;

    protected $table = 'trusted_clients';

    protected $fillable = [
        'logo',
        'short_description',
        'is_active',
    ];

    protected $casts = [
        'trusted_clients' => 'array',
    ];
    protected $appends = ['logo_path']; // Include the accessor in JSON responses

    /**
     * Accessor to get full URL of logo
     */
    public function getLogoPathAttribute()
    {
        return $this->logo ? asset('storage/' . $this->logo) : null;

    }
}
