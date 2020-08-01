<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Price;
use Illuminate\Auth\Access\HandlesAuthorization;

class PricePolicy
{
    use HandlesAuthorization;
    
    /**
     * Determine whether the user can view any prices.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can view the price.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Price  $price
     * @return mixed
     */
    public function view(User $user, Price $price)
    {
        return true;
    }

    /**
     * Determine whether the user can create prices.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the price.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Price  $price
     * @return mixed
     */
    public function update(User $user, Price $price)
    {
        return $price->product->user->id === $user->id;
    }

    /**
     * Determine whether the user can delete the price.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Price  $price
     * @return mixed
     */
    public function delete(User $user, Price $price)
    {
        return $price->product->user->id === $user->id;
    }

    /**
     * Determine whether the user can restore the price.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Price  $price
     * @return mixed
     */
    public function restore(User $user, Price $price)
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the price.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Price  $price
     * @return mixed
     */
    public function forceDelete(User $user, Price $price)
    {
        return false;
    }
}
