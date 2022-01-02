<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return Renderable
     */
    public function index(): Renderable
    {
        return view('home', [
            "user" => Auth::user(),
            "numberNotReads" => count(Result::where('is_read', false)->get()),
        ]);
    }
}
