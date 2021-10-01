class Forecast {
  constructor() {
    this.key = process.env.weatherApi || config.weatherApi;
    this.weatherURI =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }

  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return { cityDetails, weather };
  }
  //! Get City function
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const getCityUrl = this.cityURI + query;
    const response = await fetch(getCityUrl);
    const data = await response.json();
    return data[0];
  }
  //! Get Weather function
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const getWeatherUrl = this.weatherURI + query;
    const response = await fetch(getWeatherUrl);
    const data = await response.json();
    return data[0];
  }
}
