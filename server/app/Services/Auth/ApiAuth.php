<?php

namespace App\Services\Auth;

use App\Http\Requests\Api\AuthRegisterRequest;
use App\Models\Role;
use App\Models\User;
use App\Services\Auth\Models\Login;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ApiAuth implements ApiAuthService
{
    private $user;

    /**
     * ApiAuth constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @param AuthRegisterRequest $request
     * @return Authenticatable
     */
    public function register(AuthRegisterRequest $request): Authenticatable
    {
        $data = $request->validated();

        $user = new $this->user;
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = Hash::make($data['password']);
        $user->save();
        $user->roles()->attach(Role::where('role', 'user')->first());

        return $user;
    }

    /**
     * @param String $email
     * @param String $password
     * @return Login
     */
    public function login(String $email, String $password): Login
    {
        if (!Auth::attempt(['email' => $email, 'password' => $password], true))
            throw new HttpException(401);

        $user = Auth::user();
        $token = $user->createToken('authToken')->accessToken;

        return new Login(
            $token,
            $user
        );
    }

    /**
     * Logout currently authenticated user
     */
    public function logout(): void
    {
        Auth::user()->token()->revoke();
    }
}
