<form method="POST" action="{{ route('communication.communicate') }}">
    @csrf
    <div class="form generateLayoutTab">
        <div class="form-row justify-content-around mx-3">
            <div class="col-5">
                <h1 class="pl-3">Human</h1>
                <div class="form-row">
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                                   value="frequency"
                                   id="frequency">
                            <label class="form-check-label" for="frequency">
                                Optimize Travel Distance - Frequents Together
                            </label>
                        </div>
                    </div>
                    <div id="col-frequency" class="col-4 d-none">
                        <div class="form-group">
                            <select class="form-control" name="optimization-weights[]">
                                @include('partials.generate_layouts.select')
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                                   value="weight"
                                   id="weight">
                            <label class="form-check-label" for="weight">
                                Optimize Weight Lifting
                            </label>
                        </div>
                    </div>
                    <div id="col-weight" class="col-4 d-none">
                        <div class="form-group">
                            <select class="form-control" name="optimization-weights[]">
                                @include('partials.generate_layouts.select')
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                                   value="work"
                                   id="work">
                            <label class="form-check-label" for="work">
                                Optimize Chest Level
                            </label>
                        </div>
                    </div>
                    <div id="col-work" class="col-4 d-none">
                        <div class="form-group">
                            <select class="form-control" name="optimization-weights[]">
                                @include('partials.generate_layouts.select')
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                                   value="minimize-errors" id="minimize-errors">
                            <label class="form-check-label" for="minimize-errors">
                                Minimize Worker Error
                            </label>
                        </div>
                    </div>
                    <div id="col-minimize-errors" class="col-4 d-none">
                        <div class="form-group">
                            <select class="form-control" name="optimization-weights[]">
                                @include('partials.generate_layouts.select')
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <h1 class="pl-3">Warehouse</h1>
                <div class="form-row">
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                                   value="organization"
                                   id="organization">
                            <label class="form-check-label" for="organization">
                                Optimize By Type of Sector
                            </label>
                        </div>
                    </div>
                    <div id="col-organization" class="col-4 d-none">
                        <select class="form-control" name="optimization-weights[]">
                            @include('partials.generate_layouts.select')
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="boxDiv">
            <button type="submit" class="button-9">Generate</button>
        </div>
    </div>
</form>
