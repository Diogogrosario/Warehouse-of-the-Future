@extends('layouts.app')
@section('scripts')
    <script type="text/javascript" src="{{asset('js/optimization_weights.js')}}" defer></script>
    <script type="text/javascript" src="{{asset('js/optimization_mutual_exclusion.js')}}" defer></script>
@endsection
@section('content')
    <div id="alert-mutual-exclusion" class="myAlert-top alert alert-dismissible alert-danger">
        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
        <strong>Error!</strong> You cannot choose Work and Weight metrics simultaneously
    </div>
    <div class="d-flex" id="wrapper">
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <h1 class="mt-4">Hello, {{$user->name}}.</h1>
                <div class="courses-container">
                    <div class="course">
                        <div class="course-preview">
                        </div>
                        <div class="course-info">
                            @if($numberNotReads===0)
                                <h5>No New Layouts Ready</h5>
                            @else
                                <h6>While You Were Gone...</h6>
                                <h5>{{$numberNotReads}} New Layouts were Generated</h5>
                            @endif
                            <a href="{{route('layouts')}}" class="btnSeeAll">See all</a>
                        </div>
                    </div>
                </div>
                @include('partials.generate_layouts.form_generate')
            </div>
        </div>
    </div>
@endsection
