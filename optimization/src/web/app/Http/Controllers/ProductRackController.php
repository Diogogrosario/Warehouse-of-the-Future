<?php

namespace App\Http\Controllers;

use App\Models\Product_Rack as ModelsProduct_Rack;
use Illuminate\Http\Request;

use App\Product_Rack;

class ProductRackController extends Controller
{
    public function index(){
        $product_racks = ModelsProduct_Rack::all();
        echo $product_racks;
        return view('layouts',[
            'product_racks' => $product_racks,
        ]);
    }
}
