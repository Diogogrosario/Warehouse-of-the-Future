<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected $table = 'Product';

    public $timestamps = false;

    public function productRack(): HasOne
    {
        return $this->hasOne(Product_Rack::class);
    }
}
