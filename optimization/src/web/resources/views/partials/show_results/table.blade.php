<table class="table table-striped table-bordered table-hover">
    <thead>
    <tr class="text-center">
        <td colspan="{{$sizes[$shelf->id]}}">{{$shelf->id}}</td>
    </tr>
    </thead>
    @foreach($shelf->racks->sortByDesc('y')->values() as $rack)
        <tr class="text-center">
            <td class="align-middle">{{$rack->id}}</td>
            @foreach($results[$rack->id] as $product_racks)
                @if(count($product_racks)===0)
                    <td colspan="{{$sizes[$shelf->id]}}">Sem Resultados</td>
                @endif
                @foreach($product_racks as $product_rack)
                    <td class="align-middle">
                        <p>{{$product_rack->product->id}}{{$product_rack->product->name}}</p>
                        <p>{{$product_rack->product->name}}</p>
                    </td>
                @endforeach
            @endforeach
        </tr>
    @endforeach
</table>
