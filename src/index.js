function refreshWeather(response){
    let tempElement = document.querySelector("#temp");
    let temp = response.data.temperature.current;
     let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
    tempElement.innerHTML = Math.round(temp);
    
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Paris")