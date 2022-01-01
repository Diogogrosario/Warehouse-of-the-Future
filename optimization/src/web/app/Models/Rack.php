<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Rack extends Model
{
    protected $table = 'Rack';

    public function shelf(): BelongsTo
    {
        return $this->belongsTo(Shelf::class);
    }

    public function productRacks(): HasMany
    {
        return $this->hasMany(Product_Rack::class);
    }
}
