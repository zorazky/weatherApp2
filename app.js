window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree")
    let locationTimezone = document.querySelector(".location-timezone")
    let temperatureSection = document.querySelector('.temperature-section')
    const temperatureSpan = document.querySelector('.temperature-section span')


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
                    const location = `${data.name}, ${data.sys.country}`;
                    const icon = "partly-cloudy-night";
                    // set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = location;

                    //formula for celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //set icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Change temperature to celsius
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                })
            })

        
    } 

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})