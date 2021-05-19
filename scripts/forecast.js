const key = config.weatherApi;

//! Get Weather function
const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;
  const getWeatherUrl = base + query;

  const response = await fetch(getWeatherUrl);
  const data = await response.json();

  return data[0];
};

//! Get City function
const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";

  const query = `?apikey=${key}&q=${city}`;
  const getCityUrl = base + query;

  const response = await fetch(getCityUrl);
  const data = await response.json();

  return data[0];
};
