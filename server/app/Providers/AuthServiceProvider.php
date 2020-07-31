<?php

namespace App\Providers;

use App\Services\Auth\ApiAuth;
use App\Services\Auth\ApiAuthService;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
//         'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        Passport::personalAccessClientId('1');

        $this->app->singleton(ApiAuthService::class, function ($app) {
            return new ApiAuth(
                $app->get(User::class)
            );
        });
    }
}
