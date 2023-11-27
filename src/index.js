function refreshWeather(response){
    let tempElement = document.querySelector("#temp");
    let temp = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    
    
    cityElement.innerHTML = response.data.city;
    tempElement.innerHTML = Math.round(temp);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
    windElement.innerHTML = `${response.data.wind.speed} km/h`;
    timeElement.innerHTML = formateDate(date);
    iconElement.innerHTML = `<img 
                src="${response.data.condition.icon_url}"
                class="weather_emoji"
                />`;
    getForecast(response.data.city);
}
function formateDate(date){
    let minutes = date.getMinutes();
    let hour = date.getHours();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday", ];
    let day = days[date.getDay()];
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    return `${day} ${hour}:${minutes}`;
}

function searchCity(city){
    let apiKey = "050fe34328718327775fb9d4d93odat0";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(refreshWeather);
}
function handleSearch(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value);
}
function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city){
    let apiKey = "050fe34328718327775fb9d4d93odat0";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response){
        console.log(response.data);

        let forecastHtml = "";

        response.data.daily.forEach(function (day, index){
            if(index < 5) {
            forecastHtml = 
            forecastHtml + 
            `  
            <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <img
                src="${day.condition.icon_url}"
                alt=""
                width="60"
              />
              <div class="weather-forecast-temp">
                <span class="temp-max">${Math.round(day.temperature.maximum)
                }°</span>
                <span class="temp-min">${Math.round(day.temperature.minimum)
                }°</span>
              </div>
            </div>
            `;
            }
        });
        let forecastElemnt = document.querySelector("#forecast");
        forecastElemnt.innerHTML = forecastHtml;

    }
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Paris");

