@extends('app')
@section('content')
<div class="container">
    <h1 class="d-flex justify-content-center mt-5">Visualize Warehouse</h1>
    <div id="carouselContent" class="carousel slide mt-4" data-ride="carousel">
        <div class="carousel-inner" role="listbox">
            
            <?php

use App\Http\Controllers\ProductRackController;
use App\Models\Product;

echo '<div class="carousel-item active text-center p-4">
                <div class="row d-flex justify-content-center">';
                    $i=1;
                    foreach($shelf_ids as $shelf_id){ 
                        if($i==$shelf_id && $i<=6){
                            echo '<div class="m-3">
                                <table class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th><h2>',$shelf_id,'</h2></th>
                                        </tr>
                                    </thead>
                                    <tbody>';

                                    foreach(ProductRackController::orderRacks($shelf_id,$shelf_list) as $rack){
                                        echo '<tr>';
                                        foreach(ProductRackController::orderProducts($rack->id,$products_rack) as $product_rack) {
                                            echo '<td>', Product::where('id',$product_rack->product_id)->first()->id,'</td>';
                                        }
                                        echo '</tr>';
                                    }
                                    echo '</tbody>
                                </table>
                            </div>';
                        }
                        $i++;
                    }
                echo'</div>
            </div>';

            $k=7;
            for($j=2; $j <= count($shelf_ids)/6; $j++){
            echo '<div class="carousel-item text-center p-4">
                <div class="row d-flex justify-content-center">';
                   
                    foreach($shelf_ids as $shelf_id){ 
                        if($k==$shelf_id && $k<=6*$j){
                            echo '<div class="m-3">
                                <table class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th><h2> ',$shelf_id,'</h2></th>
                                        </tr>
                                    </thead>
                                    <tbody>';
                                        foreach(ProductRackController::orderRacks($shelf_id,$shelf_list) as $rack){
                                            echo '<tr>';
                                            foreach(ProductRackController::orderProducts($rack->id,$products_rack) as $product_rack) {
                                                echo '<td>', Product::where('id',$product_rack->product_id)->first()->id,'</td>';
                                            }
                                            echo '</tr>';
                                        }
                                    echo '</tbody>
                                </table>
                            </div>';
                            $k++;
                        }

                    };
                    $k=6*$j+1;
                echo' </div>
            </div>';
            };
        ?>            

        </div>

        <!--Controls-->

        <a class="carousel-control-prev bg-info" href="#carouselContent" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon text-primary" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next bg-info" href="#carouselContent" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>
@endsection
