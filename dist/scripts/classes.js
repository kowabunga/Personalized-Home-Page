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
  changeLocation(newCity, newState, newCountry) {
    this.city = newCity;
    this.state = newState;
    this.country = newCountry;
  }
}

class dailyQuotes {
  async getDailyQuote() {
    const response = await fetch(`https://quotes.rest/qod.json`);
    const resData = await response.json();
    return resData;
  }
}

class chuckNorrisQuotes {
  async getChuckNorrisQuotes(number) {
    const response = await fetch(`https://api.icndb.com/jokes/random/${number}`);
    const resData = await response.json();
    return resData;
  }
}

class News {
  constructor() {
    this.api_key = '15740a87ca9749828da0c5071af09d20';
  }
  async getNews() {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.api_key}`);
    const resData = await response.json();
    return resData;
  }
}

class Dictionary {
  // add keys to class
  constructor() {
    this.dict_api_key = '5c923f37-5b6d-4dc4-8a19-7e96ffed91e2';
  }
  async getData(word) {
    //   fetch data
    const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${this.dict_api_key}`);

    // parses response into json object
    const resData = await response.json();
    return resData;
  }
}
