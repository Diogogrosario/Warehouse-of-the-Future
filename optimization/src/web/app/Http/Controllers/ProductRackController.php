<?php

namespace App\Http\Controllers;

use App\Models\Product_Rack;
use App\Models\Shelf;

class ProductRackController extends Controller
{
    public function show()
    {
        $products_rack = Product_Rack::orderby('rack_id')->get();
        /*
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
        */

        $results = collect();
        $sizes = collect();

        foreach (Shelf::with('racks')->get()->sortBy('id')->values() as $shelf) {
            $maxCounter = 0;

            foreach ($shelf->racks as $rack) {
                #Initialize collection
                if (!$results->has($rack->id))
                    $results->put($rack->id, collect());

                $rack_with_products = Product_Rack::with(['product', 'rack'])->where('rack_id', $rack->id)->get();

                if ($rack_with_products) {
                    $results[$rack->id]->push($rack_with_products);
                    $maxCounter += 1;
                    $results[$rack->id]->sortBy(['x_origin', 'asc'])->values()->all();
                }
            }
            $sizes[$shelf->id] = $maxCounter;
        }

        return view('show_results', [
            'shelves' => Shelf::with('racks')->get()->sortBy('id')->values(),
            'results' => $results,
            'sizes' => $sizes,
        ]);
    }

    public function orderRacks($shelf_id, $shelf_list)
    {
        $rackToOrder = array();
        foreach ($shelf_list as $shelf) {
            foreach ($shelf as $rack) {
                if ($rack->shelf_id == $shelf_id)
                    $rackToOrder[] = $rack;
            }
        }
        return collect($rackToOrder)->sortBy('y')->reverse();
    }

    public function orderProducts($rack_id, $products_rack)
    {

        $productsToOrder = array();
        foreach ($products_rack as $product) {
            if ($product->rack_id == $rack_id) {
                $productsToOrder[] = $product;
            }
        }
        //echo collect($productsToOrder)->sortBy('x_orig'), ' next: ';
        return collect($productsToOrder)->sortBy('x_orig');
    }
}
