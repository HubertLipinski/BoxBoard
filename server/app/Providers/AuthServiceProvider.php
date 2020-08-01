<?php

namespace App\Providers;

use App\Models\User;
use App\Models\Product;
use App\Services\Auth\ApiAuth;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use App\Services\Auth\ApiAuthService;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Product::class => 'App\Policies\ProductPolicy',
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

        Gate::before(function ($user, $ability) {
            if ($user->isAdmin()) {
                return true;
            }
        });

        $this->app->singleton(ApiAuthService::class, function ($app) {
            return new ApiAuth(
                $app->get(User::class)
            );
        });
    }
}
