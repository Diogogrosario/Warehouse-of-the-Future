<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Shelf;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ResultController extends Controller
{
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

        $layoutResult = app(ProductRackController::class)->getLayoutForResult($result);

        return view('show_results', [
            'geneticResults' => Result::all()->sortBy('id')->values(),
            'shelves' => Shelf::with('racks')->get()->sortBy('id')->values(),
            'results' => $layoutResult['results'],
            'sizes' => $layoutResult['sizes'],
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
