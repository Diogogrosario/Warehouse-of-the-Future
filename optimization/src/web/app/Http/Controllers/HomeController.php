<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Contracts\Support\Renderable;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return Renderable
     */
    public function index(): Renderable
    {
        return view('home', [
            "name" => "David",
            "numberNotReads" => count(Result::where('is_read', false)->get()),
        ]);
    }
}
