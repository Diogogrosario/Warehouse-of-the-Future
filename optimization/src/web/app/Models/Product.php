<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected string $table = 'Product';

    public function productRack(): HasOne
    {
        return $this->hasOne(Product_Rack::class);
    }
}
