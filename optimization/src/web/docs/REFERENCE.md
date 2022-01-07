# Code Reference 

## Table of Contents
1. [Views](##views)
    1. [Inherit common UI elements](##inheritance)
2. [Models](##models)


_________________

## Views <a name="views"></a>

View files are located in *resources/views*. 

### Inherit common UI elements <a name="inheritance"></a>
Common components across most of the applications' views are defined in *app.blade.php*. For example, the side navigation menu is defined there. 

In order for another view to inherit the elements defined in *app.blade.php*, it needs to wrap it's content with 

````php
    @extends('app')
    @section('content')
    ...
    @endsection
````

For example,

````php
<!DOCTYPE html>
    <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        ...
    </head>
        @extends('app')
        @section('content')
        ...
        <div class="child-element">
            <h1>I am being wrapped...</h1>
        </div>
        ...
        @endsection
    </body>
</html>
````

_________________

## Models <a name="models"></a>

Model files are located in *app/models*.  

![models](/images/models.png)