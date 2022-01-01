<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class="border-right sidebarAll" id="sidebar-wrapper">
        <div class="sidebar-heading sidebarTitle">PSA</div>
        <div class="list-group list-group-flush">
            <a href="/" class="list-group-item list-group-item-action sidebarItem">Home</a>
            <a href="{{route('layouts')}}" class="list-group-item list-group-item-action sidebarItem">Visualize
                layouts</a>
            <a href="#" class="list-group-item list-group-item-action sidebarItem">Reports</a>
        </div>
    </div>
    <!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper">
        <div class="container-fluid">
            <div class="content">
                @yield('content')
            </div>
        </div>
    </div>
    <!-- /#page-content-wrapper -->
</div>
</body>
</html>
