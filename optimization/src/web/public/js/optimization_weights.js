(() => {

    function handleSelect(event) {

        const elem = document.querySelector('#col-' + this.id)

        if (event.target.checked) {
            elem.classList.remove('d-none')
            elem.classList.add('d-block')
            elem.querySelector('select').required = true
        } else if (elem.classList.contains('d-block')) {
            elem.classList.remove('d-block')
            elem.classList.add('d-none')
            elem.querySelector('select').required = false
        }

    }

    document.querySelectorAll('[name = "optimization-parameters[]"]').forEach((elem) => {
        elem.addEventListener('change', handleSelect.bind(elem))
    })


})()


