const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
const msg3 = document.querySelector('#message-3')
const mapElem = document.querySelector('#map')
const autoLocateButton = document.querySelector('#auto-locate-button')

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    msg3.textContent = ''
    const location = document.querySelector('input').value
    fetch('/weather?address='+location).then((res) => {
        res.json().then((data) => {
            if(data.error)
                msg3.textContent = data.error
            else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
                mapElem.innerHTML = '<iframe title="map" class="absolute inset-0" style="filter: grayscale(1) contrast(1.2) opacity(0.16);" marginheight="0" marginwidth="0" scrolling="no" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q='+ encodeURIComponent(data.location) +'&ie=UTF8&t=&z=14&iwloc=B&output=embed" width="100%" height="100%" frameborder="0"></iframe>'
            }
        })
    })
})

function showPosition(position) {
    fetch('/weather?latitude='+position.coords.latitude+'&longitude='+position.coords.longitude).then((res) => {
        res.json().then((data) => {
            if(data.error)
                msg3.textContent = data.error
            else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
                mapElem.innerHTML = '<iframe title="map" class="absolute inset-0" style="filter: grayscale(1) contrast(1.2) opacity(0.16);" marginheight="0" marginwidth="0" scrolling="no" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q='+ encodeURIComponent(data.location) +'&ie=UTF8&t=&z=14&iwloc=B&output=embed" width="100%" height="100%" frameborder="0"></iframe>'
            }
        })
    })
  }

autoLocateButton.addEventListener('click', (e) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        msg3.innerHTML = "Geolocation is not supported by this browser.";
    }
})