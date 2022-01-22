(() => {
    $("#alert-mutual-exclusion").hide()

    const handleWeightSelect = (event) => {

        event.preventDefault()

        if (workInput.checked) {
            $("#alert-mutual-exclusion").show()

            const col_elem = document.querySelector('#col-work')

            const input_elem = col_elem.querySelector('select')

            col_elem.classList.remove('d-block')
            col_elem.classList.add('d-none')

            input_elem.value = null
            return workInput.checked = false
        }

    }
    const handleWorkSelect = (event) => {
        event.preventDefault()

        if (weightInput.checked) {
            $("#alert-mutual-exclusion").show()

            const col_elem = document.querySelector('#col-weight')

            const input_elem = col_elem.querySelector('select')

            col_elem.classList.remove('d-block')
            col_elem.classList.add('d-none')

            input_elem.value = null

            return weightInput.checked = false
        }
    }

    const handleMinimizeErrorsSelect = (event) => {

        event.preventDefault()

        if (typeMetric.checked) {
            $("#alert-mutual-exclusion").show()

            const col_elem = document.querySelector('#col-organization')

            const input_elem = col_elem.querySelector('select')

            col_elem.classList.remove('d-block')
            col_elem.classList.add('d-none')

            input_elem.value = null

            return typeMetric.checked = false
        }


    }
    const handleTypeSelect = (event) => {
        event.preventDefault()

        if (minimizeErrors.checked) {
            $("#alert-mutual-exclusion").show()

            const col_elem = document.querySelector('#col-minimize-errors')

            const input_elem = col_elem.querySelector('select')

            col_elem.classList.remove('d-block')
            col_elem.classList.add('d-none')

            input_elem.value = null

            return minimizeErrors.checked = false
        }

    }

    const weightInput = document.querySelector('#weight')
    const workInput = document.querySelector('#work')

    const minimizeErrors = document.querySelector('#minimize-errors')
    const typeMetric = document.querySelector('#organization')

    weightInput.addEventListener('change', handleWeightSelect)
    workInput.addEventListener('change', handleWorkSelect)
    minimizeErrors.addEventListener('change', handleMinimizeErrorsSelect)
    typeMetric.addEventListener('change', handleTypeSelect)

})()




