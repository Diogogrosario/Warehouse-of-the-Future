<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Shelf;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ResultController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        abort(404);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        abort(404);
    }

    /**
     * Display the specified resource.
     *
     * @param Result $result
     * @return View
     */
    public function show(Result $result): View

    {
        $result->is_read = true;
        $result->update();

        $layoutResult = app(ProductRackController::class)->getLayoutForResult($result);
        $max_size = 0;
        $max_sizes = collect();
        
        $shelves = Shelf::with('racks')->get()->sortBy('id')->values();
        $results=$layoutResult['results'];
        
        foreach($shelves as $shelf){
            foreach($shelf->racks->sortByDesc('y')->values() as $rack){
                foreach($results[$rack->id] as $product_racks){
                    if($max_size<count($product_racks)){
                        $max_size=count($product_racks);
                    }
                }
                $max_sizes[$shelf->id] = $max_size;
            }
            $max_size=0;
        }

        return view('show_results', [
            'hasResults' => True,
            'geneticResults' => Result::all()->sortBy('id')->values(),
            'shelves' => $shelves,
            'results' => $results,
            'sizes' => $max_sizes,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Result $result
     * @return Response
     */
    public function edit(Result $result)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Result $result
     * @return Response
     */
    public function update(Request $request, Result $result)
    {
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Result $result
     * @return Response
     */
    public function destroy(Result $result)
    {
        abort(404);
    }
}
