class Weather {
  constructor(city, state, country) {
    this.city = city;
    this.state = state;
    this.country = country;
    this.api_key = '0201fcbae5964792406388efd3a6e7f8';
  }
  async getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state},${this.country}&appid=${this.api_key}&units=imperial`);

    const responseData = await response.json();

    return responseData;
  }
}
