<?php

namespace App\Providers;
use Laravel\Passport\Passport;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [

    ];

    public function boot()
    {
        $this->registerPolicies();

        // Define scopes
        Passport::tokensCan([
            'admin' => 'Admin privileges',
            'user' => 'User privileges',
        ]);

        // Set default scope
        Passport::setDefaultScope([
            'user',
        ]);
    }
}
