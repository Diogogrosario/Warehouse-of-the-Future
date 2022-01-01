@extends('app')
@section('content')
    <div class="container">
        <h1 class="d-flex justify-content-center mt-5">Visualize Warehouse</h1>
        @if($hasResults)
            <div class="row my-3">
                @include('partials.show_results.dropdown',['geneticResults'=>$geneticResults])
            </div>
            @include('partials.show_results.carousel',['shelves'=>$shelves])
        @else
            <div class="center alert alert-danger" role="alert">
                No layout generated. To generate click <a class="text-danger" href="{{route('filters')}}">here</a>.
            </div>
        @endif
    </div>
@endsection
