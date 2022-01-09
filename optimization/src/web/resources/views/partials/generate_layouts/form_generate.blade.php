<form method="POST" action="{{ route('communication.communicate') }}">
    @csrf
    <div class="form generateLayoutTab">
        <div class="form-row justify-content-around">
            <div class="col-auto">
                <h1>Human</h1>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                           value="frequency"
                           id="frequency">
                    <label class="form-check-label" for="frequency">
                        Optimize Travel Distance - Frequents Together
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                           value="weight"
                           id="weight">
                    <label class="form-check-label" for="weight">
                        Optimize Weight Lifting
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                           value="work"
                           id="work">
                    <label class="form-check-label" for="work">
                        Optimize Chest Level
                    </label>
                </div>
                @if(false)
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                               value="worker-error" id="worker-error">
                        <label class="form-check-label" for="worker-error">
                            Optimize worker error
                        </label>
                    </div>
                @endif
            </div>
            @if(false)
                <div class="col-auto">
                    <h1>Hardware</h1>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                               value="hardware" id="hardware">
                        <label class="form-check-label" for="defaultCheck1">
                            Optimize hardware solar battery
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                               value="space-occupation"
                               id="space-occupation">
                        <label class="form-check-label" for="space-occupation">
                            Optimize space occupation
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                               value="user-error" id="user-error">
                        <label class="form-check-label" for="user-error">
                            Optimize user error
                        </label>
                    </div>
                </div>
            @endif
            <div class="col-auto">
                <h1>Warehouse</h1>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="optimization-parameters[]"
                           value="sector"
                           id="sector">
                    <label class="form-check-label" for="sector">
                        Optimize By Sector
                    </label>
                </div>
            </div>
        </div>
        <div class="boxDiv">
            <button type="submit" class="button-9">Generate</button>
        </div>
    </div>
</form>
