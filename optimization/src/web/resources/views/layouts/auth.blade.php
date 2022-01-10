<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('partials.head')
</head>
<body>
<div class="d-flex" id="wrapper">
    <div id="page-content-wrapper">
        <div class="container-fluid">
            <div class="content">
                @yield('content')
            </div>
        </div>
    </div>
</div>
</body>
</html>
