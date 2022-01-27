<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shelf extends Model
{
    protected $table = 'Shelf';

    public $timestamps = false;

    public function racks(): HasMany
    {
        return $this->hasMany(Rack::class);
    }

    public function productRacks(): HasMany
    {
        return $this->hasMany(Product_Rack::class);
    }
}
