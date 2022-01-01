<?php

namespace App\Http\Controllers;

use App\Models\Product_Rack;
use App\Models\Result;
use App\Models\Shelf;

class ProductRackController extends Controller
{
    public function show()
    {
        $result = Result::all()->last();
        
        if (is_null($result))
            return view('show_results', ['hasResults' => False]);

        $result->is_read = true;
        $result->update();

        $layoutResult = $this->getLayoutForResult($result);

        return view('show_results', [
            'hasResults' => True,
            'geneticResults' => Result::all()->sortBy('id')->values(),
            'shelves' => Shelf::with('racks')->get()->sortBy('id')->values(),
            'results' => $layoutResult['results'],
            'sizes' => $layoutResult['sizes'],
        ]);
    }

    public function getLayoutForResult(Result $result): array
    {
        $results = collect();
        $sizes = collect();

        foreach (Shelf::with('racks')->get()->sortBy('id')->values() as $shelf) {
            $maxCounter = 0;

            foreach ($shelf->racks as $rack) {
                #Initialize collection
                if (!$results->has($rack->id))
                    $results->put($rack->id, collect());

                $rack_with_products = Product_Rack::with(['product', 'rack'])
                    ->where('rack_id', $rack->id)
                    ->where('result_id', $result->id)
                    ->get();

                if ($rack_with_products) {
                    $results[$rack->id]->push($rack_with_products);
                    $maxCounter += 1;
                    $results[$rack->id]->sortBy('x_origin')->values();
                }
            }
            $sizes[$shelf->id] = $maxCounter;
        }

        return ['sizes' => $sizes, 'results' => $results];

    }
}
