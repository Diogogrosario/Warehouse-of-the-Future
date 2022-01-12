(() => {
    $("#alert-mutual-exclusion").hide()

    const handleWeightSelect = (event) => {

        event.preventDefault()

        if (workInput.checked) {
            $("#alert-mutual-exclusion").show()
            return workInput.checked = false
        }

    }
    const handleWorkSelect = (event) => {
        event.preventDefault()

        if (weightInput.checked) {
            $("#alert-mutual-exclusion").show()
            return weightInput.checked = false
        }
    }

    const weightInput = document.querySelector('#weight')
    const workInput = document.querySelector('#work')

    weightInput.addEventListener('change', handleWeightSelect)
    workInput.addEventListener('change', handleWorkSelect)
    
})()




