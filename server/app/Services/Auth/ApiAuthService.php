<?php

namespace App\Services\Auth;

use App\Http\Requests\Api\AuthRegisterRequest;
use App\Services\Auth\Models\Login;
use Illuminate\Contracts\Auth\Authenticatable;

interface ApiAuthService
{
    public function register(AuthRegisterRequest $request): Authenticatable;

    public function login(String $email, String $password): Login;

    public function logout(): void;
}
