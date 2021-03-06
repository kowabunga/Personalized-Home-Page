// classes
const news = new News(),
  dayQuotes = new DailyQuotes(),
  cNorrisQuotes = new ChuckNorrisQuotes(),
  dictionary = new Dictionary(),
  ui = new UI(),
  weather = new Weather('New York', 'NY', 'US'); //default weather location is NYC, NY, US

/*------------------------------------------------------------------------*/
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
  submitChangeWeather = document.getElementById('weather-submit'),
  submitChangeWeatherGeoLocate = document.getElementById('geoLocate-submit'),
  changeWeatherBox = document.querySelector('.change-weather-box'),
  weatherBoxOverlay = document.querySelector('.overlay'),
  wordInputBox = document.getElementById('wordInput'),
  wordSubmitBtn = document.getElementById('wordSubmit'),
  taskAddBtn = document.getElementById('add-task'),
  taskRemoveBtn = document.querySelector('.list-items');

/*------------------------------------------------------------------------*/
// Event Listeners
// automatically load this function ONCE, on load. If more quotes requested, user can use get quotes button
document.addEventListener('DOMContentLoaded', () => {
  // load 5 quotes by default
  fetchChuckNorrisQuotes(5);
});

// change toggle icon from bars to x on open state, revert on close
toggleBtn.addEventListener('click', navToggle);

// on submit click get word defintion,
wordSubmitBtn.addEventListener('click', getDefinitions);

// wait for user to select change weather
changeWeatherBtn.addEventListener('click', showWeatherPopup);

// submit change weather modal, manual entry, event listener
submitChangeWeather.addEventListener('click', changeWeather);

// submit change weather modal, geo locate, event listener
submitChangeWeatherGeoLocate.addEventListener('click', getLocationAndWeather);

// Check for click on overlay box (darkened area). If clicked, simply remove overlay and check weather box section just as before when clicking submit
weatherBoxOverlay.addEventListener('click', showHideOverlay);

// if add task button is clicked, remove if clicked, get from local storage
taskAddBtn.addEventListener('click', ui.addItemToToDoList);
taskRemoveBtn.addEventListener('click', ui.removeItemFromToDoList);
document.addEventListener('DOMContentLoaded', ui.getFromLocalStorage);

// Get Chuck Norris Quotes
cnInputBtn.addEventListener('click', getChuckNorrisQuotes);

/*------------------------------------------------------------------------*/

// For link toggle on small screens, toggle dropdown on icon click
function navToggle(e) {
  e.preventDefault();
  nav.classList.toggle('responsive');
  if (nav.classList.contains('responsive')) {
    toggleBtn.style.color = 'rgb(25, 187, 224)';
  } else {
    toggleBtn.style.color = 'rgb(255,255,255)';
    toggleBtn.className = 'fa fa-bars fa-2x';
  }
}

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

// Call function when new chuck norris quotes are requested by user
function getChuckNorrisQuotes(e) {
  e.preventDefault();
  if (cnInputNumber.value !== '') {
    fetchChuckNorrisQuotes(cnInputNumber.value);
  } else fetchChuckNorrisQuotes(5);
  cnInputNumber.value = '';
}

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

function getDefinitions(e) {
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

    // Remove after 1.5s
    setTimeout(() => {
      para.remove();
      wordSubmitBtn.removeAttribute('disabled');
    }, 1500);
  }
}
/*------------------------------------------------------------------------*/

// weather section
// Get Weather
function fetchWeather() {
  // Get weather from the manually input locations submitted by user and display
  weather
    .getInputLocationWeather()
    .then(results => ui.populateWeather(results))
    .catch(err => console.log(err));
}
fetchWeather();

function fetchGeoLocatedWeather() {
  // weather from the geo-located data requested by user and display
  weather
    .getGeoLocationWeather()
    .then(results => ui.populateWeather(results))
    .catch(err => console.log(err));
}

function showWeatherPopup(e) {
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
  setTimeout(() => {
    changeWeatherBox.classList.add('makeWeatherBoxVisible');
  }, 200);
}

function hideWeatherPopup() {
  /* ---- Hide Weather ----  */

  // hide weather change box and hide overlay
  if (changeWeatherBox.classList.contains('makeWeatherBoxVisible') && weatherBoxOverlay.classList.contains('showOverlayBox')) {
    changeWeatherBox.classList.remove('makeWeatherBoxVisible');
  }
  // hide weatherbox and overlay. Weatherbox first, then 200ms later hide overlay
  changeWeatherBox.classList.add('makeWeatherBoxInvisible');
  setTimeout(() => {
    weatherBoxOverlay.classList.remove('showOverlayBox');
    weatherBoxOverlay.classList.add('hideOverlayBox');
  }, 200);

  // After boxes are hidden, z-index has to be set to 0 so that both the overlay and box are under the main content of the site. Otherwise, we can't click anything. Wait 300 ms to invoke - same time animation takes to execute
  // Hide weather/overlay box under ALL content
  setTimeout(() => {
    weatherBoxOverlay.classList.add('hideOverlayWeatherBox');
    changeWeatherBox.classList.add('hideOverlayWeatherBox');
  }, 400);
}

function changeWeather(e) {
  // gets new info from user and updates weather information on page
  e.preventDefault();

  /* ---- Hide Weather ----  */
  hideWeatherPopup();

  // hide weather change box and hide overlay
  if (changeWeatherBox.classList.contains('makeWeatherBoxVisible') && weatherBoxOverlay.classList.contains('showOverlayBox')) {
    changeWeatherBox.classList.remove('makeWeatherBoxVisible');
  }
  // hide weatherbox and overlay. Weatherbox first, then 200ms later hide overlay
  changeWeatherBox.classList.add('makeWeatherBoxInvisible');
  setTimeout(() => {
    weatherBoxOverlay.classList.remove('showOverlayBox');
    weatherBoxOverlay.classList.add('hideOverlayBox');
  }, 200);

  // After boxes are hidden, z-index has to be set to 0 so that both the overlay and box are under the main content of the site. Otherwise, we can't click anything. Wait 300 ms to invoke - same time animation takes to execute
  // Hide weather/overlay box under ALL content
  setTimeout(() => {
    weatherBoxOverlay.classList.add('hideOverlayWeatherBox');
    changeWeatherBox.classList.add('hideOverlayWeatherBox');
  }, 400);

  /* ---- Handle Actual Weather Updating ----  */

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
}

function getLocationAndWeather() {
  hideWeatherPopup();

  // Get long and lat from HTML Geolocation API
  // Check to see if browser supports the api
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocationChangeWeather);
  } else {
    console.log('Geolocation not supported.');
  }
  // console.log('Long ' + long, 'Lat ' + lat);
}
function getLocationChangeWeather(location) {
  let long = location.coords.longitude;
  let lat = location.coords.latitude;
  weather.changeGeographicCoordinates(long, lat);
  fetchGeoLocatedWeather();
}

function showHideOverlay() {
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
}
