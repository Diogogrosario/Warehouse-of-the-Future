@extends('app')
@section('content')
    <div class="container">
        <h1 class="d-flex justify-content-center mt-5">Visualize Warehouse</h1>
        <div class="row my-2">
            @include('partials.show_results.dropdown',['geneticResults'=>$geneticResults])
        </div>
        @include('partials.show_results.carousel',['shelves'=>$shelves])
    </div>
@endsection
