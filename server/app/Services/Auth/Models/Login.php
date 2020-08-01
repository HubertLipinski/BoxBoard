<?php

namespace App\Services\Auth\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;

class Login implements Arrayable, Jsonable
{
    private $token;
    private $user;

    /**
     * Login constructor.
     * @param String $token
     * @param Authenticatable $user
     */
    public function __construct(String $token, Authenticatable $user)
    {
        $this->token = $token;
        $this->user = $user;
    }

    /**
     * @inheritDoc
     */
    public function toArray()
    {
        return [
          'user' => $this->user,
          'accessToken' => $this->token
        ];
    }

    /**
     * @inheritDoc
     */
    public function toJson($options = 0)
    {
        $model =  [
            'user' => $this->user,
            'accessToken' => $this->token
        ];

        return json_encode($model, $options);
    }
}
