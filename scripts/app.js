const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

//! Update UI function to update the DOM with the data
const updateUI = ({ cityDetails, weather }) => {
  //updating the details html template
  details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="my-4 display-5">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;</span>
        </div>
      `;

  // updating the time image
  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  // updating the weather icon
  let weatherIconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", weatherIconSrc);

  //checking for d-none class in card
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = e.target.city.value;
  cityForm.reset();

  forecast
    .updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => console.log(error.message));

  //!Setting localStorage
  localStorage.setItem("city", city);
});

//! checking localStorage for city
if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => {
      updateUI(data);
    })
    .catch((error) => console.log(error.message));
}
