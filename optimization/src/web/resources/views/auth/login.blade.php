@extends('layouts.auth')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="generateLayoutTab">
                    <div id="container-login" class="form-row justify-content-center">
                        <div class="col text-center">
                            <h1>PSA</h1>
                        </div>
                        <span id="register-in-login">
                            <a class="btn" href="{{route('register')}}" role="button">
                                <span>Register<i class="fas fa-user-plus pl-1"></i></span>
                            </a>
                        </span>
                    </div>
                    <div class="form-row justify-content-around">
                        <div class="col">
                            <form method="POST" action="{{ route('login') }}">
                                @csrf
                                <div class="form-group row justify-content-center">
                                    <label for="email"
                                           class="col-md-3 col-form-label text-md-center">{{ __('E-Mail Address') }}</label>
                                    <div class="col-md-8">
                                        <input id="email" type="email"
                                               class="form-control @error('email') is-invalid @enderror" name="email"
                                               value="{{ old('email') }}" required autocomplete="email" autofocus>
                                        @error('email')
                                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                        @enderror
                                    </div>
                                </div>
                                <div class="form-group row justify-content-center">
                                    <label for="password"
                                           class="col-md-3 col-form-label text-md-center">{{ __('Password') }}</label>
                                    <div class="col-md-8">
                                        <input id="password" type="password"
                                               class="form-control @error('password') is-invalid @enderror"
                                               name="password"
                                               required autocomplete="current-password">
                                        @error('password')
                                        <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                        @enderror
                                    </div>
                                </div>
                                <div class="form-group row justify-content-center">
                                    <div class="boxDiv">
                                        <button type="submit" class="button-9">Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
@endsection
