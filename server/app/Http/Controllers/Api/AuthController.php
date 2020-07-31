<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\AuthLoginRequest;
use App\Http\Requests\Api\AuthRegisterRequest;
use App\Services\Auth\ApiAuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private $authService = null;

    /**
     * AuthController constructor.
     * @param ApiAuthService $authService
     */
    public function __construct(ApiAuthService $authService)
    {
        $this->middleware('auth:api')->only(['logout']);
        $this->authService = $authService;
    }

    /**
     * Login User
     *
     * @param AuthLoginRequest $request
     * @return JsonResponse
     */
    public function login(AuthLoginRequest $request)
    {
        $data = $request->validated();
        $response = $this->authService->login($data['email'], $data['password']);
        return response()->json($response);
    }

    /**
     * Register User
     *
     * @param AuthRegisterRequest $request
     * @return JsonResponse
     */
    public function register(AuthRegisterRequest $request)
    {
        $response = $this->authService->register($request);
        return response()->json($response);
    }

    /**
     * This method handle logout request
     * @return JsonResponse
     */
    public function logout()
    {
        $this->authService->logout();
        return response()->json([ 'message' => 'Successfully logged out' ]);
    }
}
