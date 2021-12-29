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
            background-color: #405cf5;
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
            background-color: #FFFFFF;
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
            color: #0194f6;
        }

        .form-check {
            margin-top: 10px;
        }

        .boxDiv{
            margin-top: 20px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
         .button-9 {
             backface-visibility: hidden;
             background-color: #405cf5;
             border-radius: 6px;
             border-width: 0;
             box-sizing: border-box;
             color: #fff;
             cursor: pointer;
             font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
             font-size: 100%;
             height: 55px;
             line-height: 1.15;
             margin: 12px 0 0;
             outline: none;
             overflow: hidden;
             padding: 0 25px;
             position: relative;
             text-align: center;
             width: 30%;
         }
        .button-9:disabled {
            cursor: default;
        }
        .button-9:focus {
            box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
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

                    <div class="boxDiv">
                        <button type="submit" class="button-9">Generate</button>
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
