<?php


namespace App\Services\Auth;


use App\Http\Requests\Api\AuthRegisterRequest;
use App\Services\Auth\Models\Login;
use App\User;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Scalar\String_;
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

    public function register(AuthRegisterRequest $request): void
    {
        dd($request->validated());
    }

    public function login(String $email, String $password): Login
    {
        if (!Auth::attempt(['email' => $email, 'password' => $password]))
            throw new HttpException(401);

        $user = Auth::user();
        $token = $user->createToken('authToken')->accessToken;

        return new Login(
            $token,
            $user
        );
    }

    public function logout(): void
    {
        // TODO: Implement logout() method.
    }
}
