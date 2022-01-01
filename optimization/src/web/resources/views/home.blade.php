@extends('layouts.app')
@section('content')
    <div class="d-flex" id="wrapper">
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <h1 class="mt-4">Hello, {{$name}}.</h1>
                <div class="courses-container">
                    <div class="course">
                        <div class="course-preview">
                        </div>
                        <div class="course-info">
                            <h6>while you were gone...</h6>
                            <h5>New layouts were generated</h5>
                            <button class="btnSeeAll">See all</button>
                        </div>
                    </div>
                </div>
                @include('partials.generate_layouts.form_generate')
            </div>
        </div>
    </div>
@endsection
