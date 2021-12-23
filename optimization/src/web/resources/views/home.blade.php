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
        }
        #wrapper.toggled #sidebar-wrapper {
            margin-left: 0;
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


        /*
        Notification Cards.
        */

        @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

        .course {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
            display: flex;
            max-width: 100%;
            overflow: hidden;
            width: 600px;
            margin-top: 50px;
        }

        .course h6 {
            opacity: 0.6;
            margin: 0;
            letter-spacing: 1px;
            text-transform: uppercase;
        }

        .course h2 {
            letter-spacing: 1px;
            margin: 10px 0;
        }

        .course-preview {
            background-color: #3641ac;
            color: #fff;
            padding: 30px;
            max-width: 250px;
        }

        .course-preview a {
            color: #fff;
            display: inline-block;
            font-size: 12px;
            opacity: 0.6;
            margin-top: 30px;
            text-decoration: none;
        }

        .course-info {
            padding: 30px;
            position: relative;
            width: 100%;
        }

        .btnSeeAll {
            background-color: #FFFFFF;
            border: 0;
            border-radius: 50px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
            color: #000000;
            font-size: 16px;
            padding: 12px 25px;
            position: absolute;
            bottom: 30px;
            right: 30px;
            letter-spacing: 1px;
        }



        /*
        Generate Layout Card.
        */

        .generateLayoutTab {
            background-color: #F8F8F8;
            border-radius: 10px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
            max-width: 100%;
            overflow: hidden;
            width: 100%;
            margin-top: 100px;
            padding: 20px;
        }

        .generateLayoutTab h6 {
            opacity: 0.8;
            margin: 0;
            letter-spacing: 1px;
        }

        .generateLayoutTab h1 {
            margin-bottom: 30px;
        }

        .form-check {
            margin-top: 10px;
        }


    </style>
</head>




@extends('app')
@section('content')
<div class="d-flex" id="wrapper">
    <div id="page-content-wrapper">
        <div class="container-fluid">
            <h1 class="mt-4">Hello, {{$name}}.</h1>



            <div class="courses-container">
                <div class="course">
                    <div class="course-preview">
                    </div>
                    <div class="course-info">
                        <h6>while you were gone...</h6>
                        <h5>New layouts were generated</h5>
                        <button class="btnSeeAll">See all</button>
                    </div>
                </div>
            </div>





            <form>
                <div class="generateLayoutTab">
                    <div class="form">
                        <div class="col">
                            <h1>Generate Layout</h1>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    <h6>Weight optimization</h6>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    <h6>Time and space optimization</h6>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    <h6>Hardware optimization</h6>
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    <h6>Minimize errors</h6>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-start mt-5">
                        <button type="submit" class="btn btn-outline-info btn-lg">Generate Layout</button>
                    </div>
                </div>
            </form>





        </div>
    </div>
    <!-- /#page-content-wrapper -->
</div>
@endsection
<!-- /#wrapper -->
</body>
</html>
