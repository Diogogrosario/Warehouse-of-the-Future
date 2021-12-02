@extends('app')
@section('content')
<div class="container">
    <div id="carouselContent" class="carousel slide mt-4" data-ride="carousel">
        <div class="carousel-inner" role="listbox">

            <!--First Slide-->
            <div class="carousel-item active text-center p-4">
                <div class="row d-flex justify-content-center">
                    @for ($i = 0; $i < 3; $i++)
                    <div class="m-3">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th><h2> {{$i}}</h2></th>
                                </tr>
                            </thead>
                            <tbody>
                                @for ($j = 0; $j < 5; $j++)
                                <tr>
                                    <td>Parafusos 20</td>
                                </tr>
                                @endfor
                            </tbody>
                        </table>
                    </div>
                    @endfor
                </div>
            </div>


            <!--Second Slide-->
            <div class="carousel-item text-center p-4">
                <div class="row d-flex justify-content-center">
                    @for ($i = 3; $i < 6; $i++)
                    <div class="m-3">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th><h2> {{$i}}</h2></th>
                                </tr>
                            </thead>
                            <tbody>
                                @for ($j = 0; $j < 5; $j++)
                                <tr>
                                    <td>Parafusos 20</td>
                                </tr>
                                @endfor
                            </tbody>
                        </table>
                    </div>
                    @endfor
                </div>
            </div>


        </div>

       

        <a class="carousel-control-prev bg-info" href="#carouselContent" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only text-primary">Previous</span>
        </a>
        <a class="carousel-control-next bg-info" href="#carouselContent" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>
@endsection
