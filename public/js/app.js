
const form = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');


form.addEventListener('submit', (e) => {

    e.preventDefault();
    msgOne.textContent = "loading..."
    msgTwo.textContent = ''
    const location = search.value;
    fetch('http://localhost:3000/weather?address=' + location)
        .then(response => response.json().then(data => {
            if (data.error) {
                msgOne.textContent = data.error;
                msgTwo.textContent = '';

            } else {
                msgOne.textContent = data.location;
                msgTwo.textContent = data.forecastMessage;
            }

        }))

})

