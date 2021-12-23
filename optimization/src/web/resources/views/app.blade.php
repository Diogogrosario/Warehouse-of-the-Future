<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <style>
        .sidebarAll {
            background-color: #3641ac;
        }
        .sidebarTitle {
            background-color: #3641ac;
            color: #FFFFFF;
            font-size: 20px;
        }
        .sidebarItem {
            background-color: #3641ac;
            color: #FFFFFF;
        }

        body {
            overflow-x: hidden;
        }
        #sidebar-wrapper {
            min-height: 100vh;
            margin-left: -15rem;
            -webkit-transition: margin .25s ease-out;
            -moz-transition: margin .25s ease-out;
            -o-transition: margin .25s ease-out;
            transition: margin .25s ease-out;
            background-color: #3641ac;
        }
        #sidebar-wrapper .sidebar-heading {
            padding: 0.875rem 1.25rem;
            font-size: 1.2rem;
        }
        #sidebar-wrapper .list-group {
            width: 15rem;
            background-color: #3641ac;
        }
        #page-content-wrapper {
            min-width: 100vw;
            background-color: #f7f7f9;
        }
        #wrapper.toggled #sidebar-wrapper {
            margin-left: 0;
        }
        .content {
            margin-top: 50px;
        }
        @media (min-width: 768px) {
            #sidebar-wrapper {
                margin-left: 0;
            }
            #page-content-wrapper {
                min-width: 0;
                width: 100%;
            }
            #wrapper.toggled #sidebar-wrapper {
                margin-left: -15rem;
            }
        }
    </style>
</head>
<body>
<div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class="border-right sidebarAll" id="sidebar-wrapper">
        <div class="sidebar-heading sidebarTitle">PSA</div>
        <div class="list-group list-group-flush">
            <a href="/" class="list-group-item list-group-item-action sidebarItem">Home</a>
            <a href="{{route('filters')}}" class="list-group-item list-group-item-action sidebarItem">Generate layout</a>
            <a href="{{route('layouts')}}" class="list-group-item list-group-item-action sidebarItem">Visualize layouts</a>
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
