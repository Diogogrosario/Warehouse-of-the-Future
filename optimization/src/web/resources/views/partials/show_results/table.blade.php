<?php use App\Models\Product_Type;?>

<table class="table table-striped table-bordered table-hover">
    <thead>
    <tr class="text-center font-weight-bold">
        <td colspan="{{$sizes[$shelf->id] +2 }}"><h4 class="font-weight-bold">{{$shelf->id}}</h4></td>
    </tr>
    <tr class="text-center">
        <td class="align-middle font-weight-bold">Racks</td>
        <td colspan="{{$sizes[$shelf->id]}}" class="align-middle font-weight-bold">Products</td>
        <td class="align-middle font-weight-bold">Racks</td>
    </tr>
    </thead>
    <tbody>
    @foreach($shelf->racks->sortByDesc('y')->values() as $rack)
        <tr class="text-center">
            <td class="align-middle">
                <h5 class="font-weight-bold">{{$rack->id}}</h5>
                <p>Y: {{ (($int = (int)$rack->y) == $rack->y) ? $int : $rack->y;}}</p>
                <p>Capacity: {{(($int = (int)$rack->capacity) == $rack->capacity) ? $int : $rack->capacity;}}</p>
            </td>
            @foreach($results[$rack->id] as $product_racks)
                @if(count($product_racks)===0)
                    <td class="align-middle" colspan="{{$sizes[$shelf->id]}}">Sem Resultados</td>
                @endif
                @foreach($product_racks as $product_rack)
                    <td class="align-middle">
                        <h5>{{$product_rack->product->id}}</h5>
                        @if($product_rack->product->name)
                            <p>Name:{{$product_rack->product->name}}</p>
                        @endif
                        <p>Weight: {{(($int = (int)$product_rack->product->weight) == $product_rack->product->weight) ? $int : $product_rack->product->weight;}}</p>
                        <p>Type:
                            {{Product_Type::find($product_rack->product->type_id)->name}}                        
                        </p>


                        @if($product_rack->product->frequency != 0)
                            <p>Frequency: {{(($int = (int)$product_rack->product->frequency) == $product_rack->product->frequency) ? $int : $product_rack->product->frequency;}}</p>
                        @endif
                    </td>
                @endforeach
                @for($i = count($product_racks) ; $i < $sizes[$shelf->id]; $i++)
                    <td class="align-middle"></td>
                @endfor
            @endforeach
            <td class="align-middle">
                <h5 class="font-weight-bold">{{$rack->id}}</h5>
                <p>Y: {{ (($int = (int)$rack->y) == $rack->y) ? $int : $rack->y;}}</p>
                <p>Capacity: {{(($int = (int)$rack->capacity) == $rack->capacity) ? $int : $rack->capacity;}}</p>
            </td>
        </tr>
    @endforeach
    </tbody>
    <tfoot>
        <tr class="text-center font-weight-bold">
            <td colspan="{{$sizes[$shelf->id] +2 }}"><h4 class="font-weight-bold">{{$shelf->id}}</h4></td>
        </tr>
    </tfoot>
</table>
