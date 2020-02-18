// classes
const news = new News(),
  dayQuotes = new DailyQuotes(),
  cNorrisQuotes = new ChuckNorrisQuotes(),
  dictionary = new Dictionary(),
  ui = new UI(),
  weather = new Weather('New York', 'NY', 'US'); //default weather location is NYC, NY, US

// caching dom
const navLi = document.getElementById('navUL'),
  toggleBtn = document.getElementById('toggler-icon'),
  nav = document.querySelector('.navbar'),
  cnInputNumber = document.getElementById('cnInput'),
  cnInputBtn = document.getElementById('chuck-norris-quotes-btn'),
  wCity = document.getElementById('weather-city'),
  wState = document.getElementById('weather-state'),
  wCountry = document.getElementById('weather-country'),
  changeWeatherBtn = document.querySelector('.change-weather-btn'),
  submitChangeWeather = document.querySelector('#weather-submit'),
  changeWeatherBox = document.querySelector('.change-weather-box'),
  weatherBoxOverlay = document.querySelector('.overlay'),
  wordInputBox = document.getElementById('wordInput'),
  wordSubmitBtn = document.getElementById('wordSubmit'),
  taskAddBtn = document.getElementById('add-task'),
  taskRemoveBtn = document.querySelector('.list-items');

/*------------------------------------------------------------------------*/

// For link toggle on small screens, toggle dropdown on icon click
// change toggle icon from bars to x on open state, revert on close
toggleBtn.addEventListener('click', e => {
  e.preventDefault();
  nav.classList.toggle('responsive');
  if (nav.classList.contains('responsive')) {
    toggleBtn.style.color = 'black';
    toggleBtn.className = 'fa fa-remove fa-2x';
  } else {
    toggleBtn.style.color = 'white';
    toggleBtn.className = 'fa fa-bars fa-2x';
  }
});

/*------------------------------------------------------------------------*/

// Get News
function fetchNews() {
  news
    .getNews()
    .then(results => ui.populateNews(results))
    .catch(err => console.log(err));
}
fetchNews();

/*------------------------------------------------------------------------*/

// Get Daily Quote
function fetchDailyQuote() {
  dayQuotes
    .getDailyQuote()
    .then(results => ui.populateDailyQuote(results))
    .catch(err => console.log(err));
}
fetchDailyQuote();

/*------------------------------------------------------------------------*/

// Get chuck norris quotes
function fetchChuckNorrisQuotes(number) {
  cNorrisQuotes
    .getChuckNorrisQuotes(number)
    .then(results => ui.populateChuckNorrisQuotes(results))
    .catch(err => console.log(err));
}

// automatically load this function ONCE, on load. If more quotes requested, user can use get quotes button
document.addEventListener('DOMContentLoaded', () => {
  // load 5 quotes by default
  fetchChuckNorrisQuotes(5);
});

// Call function when new chuck norris quotes are requested by user
cnInputBtn.addEventListener('click', e => {
  e.preventDefault();
  if (cnInputNumber.value !== '') {
    fetchChuckNorrisQuotes(cnInputNumber.value);
  } else fetchChuckNorrisQuotes(5);
  cnInputNumber.value = '';
});

/*------------------------------------------------------------------------*/

// Clock
function getTimeDate() {
  const time = new Date();
  let hour = time.getHours(),
    minutes = time.getMinutes(),
    seconds = time.getSeconds(),
    month = time.getMonth(),
    day = time.getDate(),
    year = time.getFullYear();
  setTimeout(ui.populateClockDate(hour, minutes, seconds, month, day, year), 1000);

  setTimeout(getTimeDate, 1000);
}
getTimeDate();

/*------------------------------------------------------------------------*/

// dictionary section
// on submit click get word defintion,
wordSubmitBtn.addEventListener('click', e => {
  e.preventDefault();
  // get word input
  const word = wordInputBox.value;

  //   if input is not empty, select the first object that contains shortdef
  if (wordInputBox.value !== '') {
    dictionary
      .getData(word)
      .then(results => ui.getDefinition(word, results[0]))
      .catch(err => console.log(err));
  } else {
    // if input is empty, add p element saying to enter word and temporarily disable get word button
    const para = document.createElement('p');
    para.innerText = 'Please enter a word';
    // insert para after button
    wordSubmitBtn.parentNode.insertBefore(para, wordSubmitBtn.nextSibling);
    wordSubmitBtn.setAttribute('disabled', true);
    setTimeout(() => {
      para.remove();
      wordSubmitBtn.removeAttribute('disabled');
    }, 1000);
  }
});

/*------------------------------------------------------------------------*/

// weather section
// Get Weather
function fetchWeather() {
  weather
    .getWeather()
    .then(results => ui.populateWeather(results))
    .catch(err => console.log(err));
}
fetchWeather();

// wait for user to select change weather
changeWeatherBtn.addEventListener('click', e => {
  e.preventDefault();
  // change weather button color fade animation
  if (changeWeatherBox.classList.contains('makeWeatherBoxInvisible') && weatherBoxOverlay.classList.contains('hideOverlayBox')) {
    // remove class that hides weather/overlay box behind all other content
    changeWeatherBox.classList.remove('hideOverlayWeatherBox');
    weatherBoxOverlay.classList.remove('hideOverlayWeatherBox');

    // remove makeWeatherBoxInvisible and hideoverlaybox
    changeWeatherBox.classList.remove('makeWeatherBoxInvisible');
    weatherBoxOverlay.classList.remove('hideOverlayBox');
  }
  weatherBoxOverlay.classList.add('showOverlayBox');
  changeWeatherBox.classList.add('makeWeatherBoxVisible');
});

// submit change weather modal event listener
submitChangeWeather.addEventListener('click', e => {
  // gets new info from user and updates weather information on page
  e.preventDefault();
  // hide weather change box and hide overlay
  if (changeWeatherBox.classList.contains('makeWeatherBoxVisible') && weatherBoxOverlay.classList.contains('showOverlayBox')) {
    changeWeatherBox.classList.remove('makeWeatherBoxVisible');
    weatherBoxOverlay.classList.remove('showOverlayBox');
  }
  // hide weatherbox and overlay
  weatherBoxOverlay.classList.add('hideOverlayBox');
  changeWeatherBox.classList.add('makeWeatherBoxInvisible');

  // After boxes are hidden, z-index has to be set to 0 so that both the overlay and box are under the main content of the site. Otherwise, we can't click anything. Wait 300 ms to invoke - same time animation takes to execute
  // Hide weather/overlay box under ALL content
  setTimeout(() => {
    weatherBoxOverlay.classList.add('hideOverlayWeatherBox');
    changeWeatherBox.classList.add('hideOverlayWeatherBox');
  }, 300);

  // update weather location information
  // may or may not contain a 'state' value, check
  // if state field is empty (location NOT in United States)
  if (wState.value === '' && wCountry.value !== '' && wCity.value !== '') {
    weather.changeLocation((city = wCity.value), (country = wCountry.value));
    fetchWeather();
    // If location is in United States
  } else if (wCountry.value !== '' && wState.value !== '' && wCity.value !== '') {
    weather.changeLocation((city = wCity.value), (state = wState.value), (country = wCountry.value));
    fetchWeather();
  }
  // clear input values
  wCity.value = '';
  wState.value = '';
  wCountry.value = '';
});

// Check for click on overlay box (darkened area). If clicked, simply remove overlay and check weather box section just as before when clicking submit
weatherBoxOverlay.addEventListener('click', () => {
  if (changeWeatherBox.classList.contains('makeWeatherBoxVisible') && weatherBoxOverlay.classList.contains('showOverlayBox')) {
    // add hide classes
    weatherBoxOverlay.classList.add('hideOverlayBox');
    changeWeatherBox.classList.add('makeWeatherBoxInvisible');
    // add z-index classes after animation occurs
    setTimeout(() => {
      weatherBoxOverlay.classList.add('hideOverlayWeatherBox');
      changeWeatherBox.classList.add('hideOverlayWeatherBox');
    }, 300);
  }
});

// if add task button is clicked
taskAddBtn.addEventListener('click', ui.addItemToToDoList);

// if remove task button (x) is clicked
taskRemoveBtn.addEventListener('click', ui.removeItemFromToDoList);

// on load, bring items from local storage into to do list
document.addEventListener('DOMContentLoaded', ui.getFromLocalStorage);

// On hover animations scripts for Change Weather button
// button fades colors white -> blueish -> white, .3s
changeWeatherBtn.addEventListener('mouseover', () => {
  changeWeatherBtn.classList.remove('change-weather-btn-Remove');
  changeWeatherBtn.classList.add('change-weather-btn-Add');
});
changeWeatherBtn.addEventListener('mouseout', () => {
  changeWeatherBtn.classList.remove('change-weather-btn-Add');
  changeWeatherBtn.classList.add('change-weather-btn-Remove');
});

// On hover animations for convenient links
// link fades from white->black->white, .3s
navLi.addEventListener('mouseover', e => {
  e.target.classList.remove('convenient-links-Remove');
  e.target.classList.add('convenient-links-Add');
});
navLi.addEventListener('mouseout', e => {
  e.target.classList.remove('convenient-links-Add');
  e.target.classList.add('convenient-links-Remove');
});

/*------------------------------------------------------------------------*/

// All submit buttons for weather, quotes, dictionary, and task list
// change color from rgb(25, 187, 224) to rgb(6, 204, 248) and back, .4s
submitChangeWeather.addEventListener('mouseover', () => {
  submitChangeWeather.classList.remove('btn-remove-effect');
  submitChangeWeather.classList.add('btn-add-effect');
});
submitChangeWeather.addEventListener('mouseout', () => {
  submitChangeWeather.classList.remove('btn-add-effect');
  submitChangeWeather.classList.add('btn-remove-effect');
});
cnInputBtn.addEventListener('mouseover', () => {
  cnInputBtn.classList.remove('btn-remove-effect');
  cnInputBtn.classList.add('btn-add-effect');
});
cnInputBtn.addEventListener('mouseout', () => {
  cnInputBtn.classList.remove('btn-add-effect');
  cnInputBtn.classList.add('btn-remove-effect');
});
wordSubmitBtn.addEventListener('mouseover', () => {
  wordSubmitBtn.classList.remove('btn-remove-effect');
  wordSubmitBtn.classList.add('btn-add-effect');
});
wordSubmitBtn.addEventListener('mouseout', () => {
  wordSubmitBtn.classList.remove('btn-add-effect');
  wordSubmitBtn.classList.add('btn-remove-effect');
});
taskAddBtn.addEventListener('mouseover', () => {
  taskAddBtn.classList.remove('btn-remove-effect');
  taskAddBtn.classList.add('btn-add-effect');
});
taskAddBtn.addEventListener('mouseout', () => {
  taskAddBtn.classList.remove('btn-add-effect');
  taskAddBtn.classList.add('btn-remove-effect');
});
