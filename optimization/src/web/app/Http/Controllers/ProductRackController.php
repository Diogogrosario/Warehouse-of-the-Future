<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product_Rack;
use App\Models\Product;
use App\Models\Rack;
use App\Models\Shelf;

class ProductRackController extends Controller
{
    public function show()
    {
        $products_rack=Product_Rack::orderby('rack_id')->get();

        $shelf_list=array();
        $shelf_ids=array();
        foreach(Shelf::all() as $shelf){
            $racks_list=array();
            foreach(Rack::all() as $rack){
                if($shelf->id == $rack->shelf_id){
                    $racks_list[]=$rack;
                }
            }
            $shelf_list[]=$racks_list;
            $shelf_ids[]=$shelf->id;
        }
        

        return view('layout', [
           'products_rack'=> $products_rack,
           'shelf_list'=> $shelf_list,
           'shelf_ids'=> $shelf_ids,
        ]);
    }

    public function orderRacks($shelf_id,$shelf_list){
        $rackToOrder=array();
        foreach($shelf_list as $shelf){
            foreach($shelf as $rack){
                if($rack->shelf_id == $shelf_id)
                    $rackToOrder[]=$rack;
            }
        }
        return collect($rackToOrder)->sortBy('y')->reverse();
    }

    public function orderProducts($rack_id,$products_rack){

        $productsToOrder=array();
        foreach($products_rack as $product){
            if($product->rack_id == $rack_id){
                $productsToOrder[]=$product;
            }
        }
        //echo collect($productsToOrder)->sortBy('x_orig'), ' next: ';
        return collect($productsToOrder)->sortBy('x_orig') ;
    }
}
