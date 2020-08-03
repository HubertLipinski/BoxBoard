<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'img_path',
        'img_url'
    ];

    /**
     * Get the owner of the product
     */
    public function user() {
        return $this->belongsTo('App\Models\User');
    }

    /**
     * Get all prices for product
     */
    public function prices() {
        return $this->hasMany('App\Models\Price', 'product_id', 'id');
    }
}
