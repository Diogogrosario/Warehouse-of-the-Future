<table class="table table-striped table-bordered table-hover">
    <thead>
    <tr class="text-center">
        <td colspan="2">{{$shelf->id}}</td>
    </tr>
    </thead>
    @foreach($shelf->racks as $rack)
        <tr class="text-center">
            <td>{{$rack->id}}</td>
            @if($results[$rack->id]->isEmpty())
                <td colspan="2">Sem Resultados</td>
            @else
                <td>{{$results[$rack->id]}}</td>
            @endif
        </tr>
    @endforeach
</table>
