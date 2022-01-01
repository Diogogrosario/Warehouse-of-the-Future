@extends('layouts.app')
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
