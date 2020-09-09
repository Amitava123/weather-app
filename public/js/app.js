const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    const location = document.querySelector('input').value
    fetch('http://localhost:3000/weather?address='+location).then((res) => {
    res.json().then((data) => {
        if(data.error)
            msg1.textContent = data.error
        else {
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
    })
})
})