async function getYearFact(year="random"){
    year = year ? year : 'random'
    let response = await fetch(`http://numbersapi.com/${year}/year`)
    let data = await response.text()
    let app = document.querySelector("#app")
    app.textContent = data
    app.classList = 'alert alert-success'
}

let form = document.querySelector('form')
form.addEventListener('submit', e =>{
    e.preventDefault()
    getYearFact(e.target.number.value)
})

let appid = 'YOUR_API_KEY_HERE' //the id may change during the time!
let cardContent = document.querySelector('.weathercontent')


async function getGeocoding (lat,lon,city){
    let response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`)
    let data = await response.json()
    let currentTemp = data.current.temp //current temp
    let currentHumidity = data.current.humidity //current humidity
    let weatherDescription = data.current.weather[0].description //current weather description
    let imageIcon = data.current.weather[0].icon // image
    let alert = data.alerts ? data.alerts[0].event : 'No alert exists' // alert
    cardContent.innerHTML = `<div class="card">
            <div class="weatherWrapper" style="text-align: center;">
                <img src="https://openweathermap.org/img/wn/${imageIcon}@2x.png" class="card-img-top" style="width: 50%;" alt="weather">
            </div>
            <div class="card-body text-center">
                <h2 style="text-transform: capitalize;">${city}</h2>
                <p>${weatherDescription}</p>
                <div>
                    <button class="btn btn-info">Now: ${currentTemp}&deg;C</button>
                    <button class="btn btn-secondary">Humidity: ${currentHumidity}%</button>
                </div>
                <p class="my-1">${alert}</p>
            </div>
        </div>`   
}

async function getWeather(city){
    let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},+31&limit=1&appid=${appid}`)
    let data = await response.json()
    let lat = data[0].lat
    let lon = data[0].lon
    getGeocoding(lat,lon,city) 
}

let weatherform = document.querySelector('.weatherform')

weatherform.addEventListener('submit', e =>{
    e.preventDefault()
    let city = e.target.city.value
    getWeather(city)
})


