<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product_Rack;
use App\Models\Product;

class ProductRackController extends Controller
{
    public function show()
    {
        return view('layout', [
            'product_racks' => Product_Rack::all(),
            'products' => Product::all()
        ]);
    }
}
