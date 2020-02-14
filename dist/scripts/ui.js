class UI {
  constructor() {
    this.weatherIcon = document.getElementById('weather-icon');
    this.info = document.getElementById('info');
    this.temp = document.getElementById('temperature');
    this.humidity = document.getElementById('humidity');
    this.feelsLike = document.getElementById('feels-like');
    this.clockTime = document.getElementById('clock-time');
    this.date = document.getElementById('date');
    this.news = document.getElementById('news');
    this.cnQuotes = document.getElementById('quotes-section');
    this.qotd = document.getElementById('qotd');
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
    let amPM = hour >= 12 ? 'PM' : 'AM';
    //   Subtract time to get 12 hour clock, not 24 hour
    hour = hour > 12 ? hour - 12 : hour;
    // if minute< 10, add 0 to front of minute
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // if seconds < 10, add 0 in front of minute
    seconds = seconds < 10 ? '0' + seconds : seconds;
    month = ui.textifyMonth(month);
    this.clockTime.innerText = `${hour}:${minutes}:${seconds} ${amPM}`;
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

  // Populate news
  populateNews(news) {
    let items = news.articles;
    let author;
    let output = '';
    items.forEach(item => {
      let content = '';
      // Sometimes, content can be returned as null, ergo only make content something when it is
      if (item.content !== null) {
        content = item.content;
      } else {
        content = 'No story here.';
      }
      // Developer plan for API returns truncated content ending with [+x chars] at end, remove this nuisance
      //Escape (\) and match everything (.*?) between [ and ]
      content = content.replace(/\[(.*?)\]/, ' ');
      // api may return null or empty string if author is not known, handle this by making author either "unknown" or known author name
      if (item.author === null || item.author === '') {
        author = 'Unknown';
      } else {
        author = item.author;
      }
      output += `
      <li style="list-style-type:none;">
        <div class='card'><b>${item.title}</b> <br><br> <em>Author: ${author}</em> <br> ${content}
          <a href=${item.url} target="_blank" class="link">Read More<a>
        </div>
      </li>`;
    });
    // console.log(output);
    this.news.innerHTML = `
      <div>
        Daily News -  Powered by<a href="https://newsapi.org" target="_blank" style="text-decoration:none; color:rgb(25,187,224);" id=newsAttribution">NewsAPI.org</a>
      </div>
      <ul>
        ${output}
      </ul>
    `;
  }

  populateDailyQuote(quote) {
    console.log(quote);
    quote = quote.contents.quotes[0];
    let output = `<p><strong>${quote.title}</strong> <br> Author:<em>${quote.author}</em> <br>"${quote.quote}"</p>`;
    this.qotd.innerHTML = output;
  }

  populateChuckNorrisQuotes(quotes) {
    quotes = quotes.value;
    let output = '';
    quotes.forEach(quote => {
      output += `<li>${quote.joke}</li>`;
    });
    this.cnQuotes.innerHTML = `
      <ol id='cnQuotes-list'>
        ${output}
      </ol>
    `;
  }
}
