<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
        @foreach($shelves as $shelf)
            @if($loop->first)
                <div class="carousel-item active text-center p-4">@else
                        <div class="carousel-item text-center p-4">@endif
                            <div class="row d-flex justify-content-center">
                                <div class="m-3">
                                    @include('partials.show_results.table',['shelf'=>$shelf,'results'=>$results,'sizes'=>$sizes])
                                </div>
                            </div>
                        </div>
                        @endforeach
                </div>

                <a class="carousel-control-prev bg-info" type="button" data-target="#carouselExampleControls"
                   data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next bg-info" type="button" data-target="#carouselExampleControls"
                   data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
    </div>
</div>
