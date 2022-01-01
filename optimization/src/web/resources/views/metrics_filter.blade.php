@extends('layouts.app')
@section('content')
    <div class="d-flex" id="wrapper">
        <div id="page-content-wrapper">
            <div class="container-fluid mx-auto mt-3">
                <form>
                    <div class="form-row ">
                        <div class="col">
                            <h1>Human</h1>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    Optimize travel distance
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    Optimize weight lifting
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    Optimize worker error
                                </label>
                            </div>
                        </div>

                        <div class="col">
                            <h1>Hardware</h1>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    Optimize hardware solar battery
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    Optimize space occupation
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    Optimize user error
                                </label>
                            </div>
                        </div>

                        <div class="col">
                            <h1>Warehouse</h1>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                                <label class="form-check-label" for="defaultCheck1">
                                    Optimize space occupation
                                </label>
                            </div>
                        </div>

                    </div>

                    <div class="d-flex justify-content-start mt-5">
                        <button type="submit" class="btn btn-outline-info btn-lg">Generate Layout</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- /#page-content-wrapper -->
    </div>
@endsection
