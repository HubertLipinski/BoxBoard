<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    private $user;

    /**
     * UserController constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->middleware(['auth:api']);
        $this->user = $user;
    }


    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function index()
    {
        $this->authorize('viewAny', $this->user);
        return response()->json($this->user->with('roles')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserStoreRequest $request
     * @return void
     * @throws AuthorizationException
     */
    public function store(UserStoreRequest $request)
    {
        $this->authorize('create', $this->user);
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = $this->user->firstOrCreate($data);
        $user->roles()->attach(Role::where('role', 'user')->first());
        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function show($id)
    {
        $user = $this->user->findOrFail($id);
        $this->authorize('view', $user);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserUpdateRequest $request
     * @param int $id
     * @return void
     * @throws AuthorizationException
     */
    public function update(UserUpdateRequest $request, $id)
    {
        $user = $this->user->findOrFail($id);
        $this->authorize('update', $user);
        $data = $request->validated();
        if (isset($data['password']))
            $data['password'] = Hash::make($data['password']);
        $updated = tap($user)->update($data);
        $response = $this->user->with('roles')->where('id', $user->id)->first();
        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function destroy($id)
    {
        $user = $this->user->findOrFail($id);
        $this->authorize('delete', $user);
        $user->delete();
        return response()->json(['response' => __('Użytkownik usunięty pomyślnie')]);
    }
}
