<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product_Type extends Model
{
    protected $table = 'Product_Type';

    public $timestamps = false;

    public function product(): HasMany
    {
        return $this->hasMany(Product::class);
    }
    
}
