<?php

namespace App\Services\Auth;

use App\Http\Requests\Api\AuthRegisterRequest;
use App\Services\Auth\Models\Login;

interface ApiAuthService
{
    public function register(AuthRegisterRequest $request): void;

    public function login(String $email, String $password): Login;

    public function logout(): void;
}
