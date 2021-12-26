@extends('app')
@section('content')
    <div class="container">
        <h1 class="d-flex justify-content-center mt-5">Visualize Warehouse</h1>
        @include('partials.show_results.carousel',['shelves'=>$shelves])
    </div>
@endsection
