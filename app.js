window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimezone = document.querySelector(".location-timezone")


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const key = "82005d27a116c2880c8f0fcb866998a0"

            let api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

            fetch(api)
                .then(response =>  {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const temperature = data.main.temp;
                    const summary = data.weather[0].description;
                    const location = `${data.name}, ${data.sys.country}`
                    // set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = location;
                })
            })

        
    } 

    
})