class UI {
  constructor() {
    this.weatherIcon = document.getElementById('weather-icon');
    this.info = document.getElementById('info');
    this.temp = document.getElementById('temperature');
    this.humidity = document.getElementById('humidity');
    this.feelsLike = document.getElementById('feels-like');
    this.clockTime = document.getElementById('clock-time');
    this.date = document.getElementById('date');
  }
  //   Populate Weather section
  populateWeather(weather) {
    this.weatherIcon.setAttribute('src', `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
    this.info.innerText = `${weather.name}, ${weather.sys.country}`;
    this.temp.innerText = `Actual temp: ${weather.main.temp}°F`;
    this.feelsLike.innerText = `Feels like: ${weather.main.feels_like}°F`;
    this.humidity.innerText = `Humidity: ${weather.main.humidity}%`;
  }
  //   Populate Clock section
  populateClockDate(hour, minutes, seconds, month, day, year) {
    //   Subtract time to get 12 hour clock, not 24 hour
    hour = hour > 12 ? hour - 12 : hour;
    // if minute< 10, add 0 to front of minute
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // if seconds < 10, add 0 in front of minute
    seconds = seconds < 10 ? '0' + seconds : seconds;
    month = ui.textifyMonth(month);
    this.clockTime.innerText = `${hour}:${minutes}:${seconds}`;
    this.date.innerText = `${month}, ${day}, ${year}`;
  }
  //   Replace month number with month name
  textifyMonth(month) {
    switch (month) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'June';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
    }
    return month;
  }
}
