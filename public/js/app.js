const weatherForm = document.querySelector('#weather-form') // form
const addressInput = document.querySelector('#weather-form input') // form input field

const successPara = document.querySelector('#success')
const errorPara = document.querySelector('#error')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const address = addressInput.value
    const url = "/weather?address="+ address

    errorPara.innerHTML = ''
    successPara.innerHTML = 'Loading...'
    
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                errorPara.innerHTML = data.error
                successPara.innerHTML = ''
            }
            else{
                errorPara.innerHTML = ''
                successPara.innerHTML = '<b>Temperature: </b>' + data.forecastData.temp + '<br>' +
                                        '<b>Feels Like: </b>' + data.forecastData.feels_like + '<br>' +
                                        '<b>Location: </b>' + data.location
            }
        })
    }) 
})