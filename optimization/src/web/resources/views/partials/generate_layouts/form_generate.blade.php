<form method="POST" action="{{ route('communication.communicate') }}">
    @csrf
    <div class="form generateLayoutTab">
        <div class="form-row justify-content-around mx-3">
            <div class="col">
                <h1 class="pl-3">Human</h1>
                <div class="form-check pl-5">
                    <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                           value="frequency"
                           id="frequency">
                    <label class="form-check-label" for="frequency">
                        Optimize Travel Distance - Frequents Together
                    </label>
                </div>
                <div class="form-check pl-5">
                    <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                           value="weight"
                           id="weight">
                    <label class="form-check-label" for="weight">
                        Optimize Weight Lifting
                    </label>
                </div>
                <div class="form-check pl-5">
                    <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                           value="work"
                           id="work">
                    <label class="form-check-label" for="work">
                        Optimize Chest Level
                    </label>
                </div>
                <div class="form-check pl-5">
                    <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                           value="minimize-errors" id="minimize-errors">
                    <label class="form-check-label" for="minimize-errors">
                        Minimize Worker Error
                    </label>
                </div>
            </div>
            <div class="col">
                <h1 class="pl-3">Hardware</h1>
                <div class="form-check pl-5">
                    <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                           value="windows" id="windows">
                    <label class="form-check-label" for="defaultCheck1">
                        Optimize Hardware Solar Battery
                    </label>
                </div>
            </div>
            <div class="col">
                <h1 class="pl-3">Warehouse</h1>
                <div class="form-check pl-5">
                    <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                           value="sector"
                           id="sector">
                    <label class="form-check-label" for="sector">
                        Optimize By Type of Sector
                    </label>
                </div>
            </div>
        </div>
        <div class="boxDiv">
            <button type="submit" class="button-9">Generate</button>
        </div>
    </div>
</form>
