@extends('layouts.app')
@section('content')
    <div class="container-fluid m-0 ">
        <h1 class="d-flex justify-content-center mt-5">Visualize Warehouse</h1>
        @if($hasResults)
            <div class="row mx-1 my-3">
                <div class="col"> </div>
                <div class="col-10">
                    @include('partials.show_results.dropdown',['geneticResults'=>$geneticResults])
                </div>
                <div class="col"></div>
            </div>
            @include('partials.show_results.carousel',['shelves'=>$shelves])
        @else
            <div class="center alert alert-danger" role="alert">
                No layout generated. To generate click <a class="text-danger" href="{{route('home')}}">here</a>.
            </div>
        @endif
    </div>
@endsection
