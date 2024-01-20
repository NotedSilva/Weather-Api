// variáveis e seleções de elementos

const apiKey =  "911d3f695b768c5dc25a61192923a883";
const apiFlagURL = "https://flagsapi.com/";
const apiUnsplash = "https://source.unsplash.com/1920x1080/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const flagElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");


// Funções
const getWeatherData = async (city) => {
    const apiWeatherURL =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`; 

     const res = await fetch(apiWeatherURL);
     const data = await res.json();

     return data
};

// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
  };
  
  const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.add("hide");
  
    suggestionContainer.classList.add("hide");
  };
  
  const showWeatherData = async (city) => {
    hideInformation();
  
    const data = await getWeatherData(city);
  
    if (data.cod === "404") {
      showErrorMessage();
      return;
    }

     cityElement.innerText = data.name;
     tempElement.innerText =  parseInt(data.main.temp);
     descElement.innerText = data.weather[0].description;
     weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`) 
     flagElement.setAttribute("src", apiFlagURL + data.sys.country);
     humidityElement.innerText = `${data.main.humidity}%`;
     windElement.innerText = `${data.wind.speed}km/h`;

     // Trocar a imaegm
     document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

     weatherContainer.classList.remove("hide");
     
};

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener("keyup", e =>{
    if(e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city);
    }
});

// Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
  });