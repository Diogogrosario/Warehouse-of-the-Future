<div class="dropdown">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownResults" data-toggle="dropdown"
       aria-expanded="false">
        Select Result
    </a>
    <div class="dropdown-menu" aria-labelledby="dropdownResults">
        @foreach($geneticResults as $result)
            <a class="dropdown-item" href={{route('results.show',$result->id)}}>View
                Result {{$result->id}}</a>
        @endforeach
    </div>
</div>
