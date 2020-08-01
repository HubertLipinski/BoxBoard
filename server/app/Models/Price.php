<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    protected $guarded = [];

    /**
     * Get product associated with current price
     */
    public function product() {
        return $this->hasOne('App\Models\Product', 'id', 'product_id');
    }
}
