const weather = new Weather('New York', 'NY', 'US');
const news = new News();
const dayQuotes = new DailyQuotes();
const cNorrisQuotes = new ChuckNorrisQuotes();
const dictionary = new Dictionary();
const ui = new UI();

// Get input value for selection of chuck norris quotes
const cnInputNumber = document.getElementById('cnInput');
const cnInputBtn = document.getElementById('chuck-norris-quotes-btn');

// For link toggle on small screens, toggle dropdown on icon click
// change toggle icon from bars to x on open state, revert on close
const toggleBtn = document.getElementById('toggler-icon');
toggleBtn.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.navbar').classList.toggle('responsive');
  if (document.querySelector('.navbar').classList.contains('responsive')) {
    toggleBtn.style.color = 'black';
    toggleBtn.className = 'fa fa-remove fa-2x';
  } else {
    toggleBtn.style.color = 'white';
    toggleBtn.className = 'fa fa-bars fa-2x';
  }
});

// Get Weather
function fetchWeather() {
  weather
    .getWeather()
    .then(results => ui.populateWeather(results))
    .catch(err => console.log(err));
}
fetchWeather();

// Get News
function fetchNews() {
  news
    .getNews()
    .then(results => ui.populateNews(results))
    .catch(err => console.log(err));
}
fetchNews();

// Get Daily Quote
function fetchDailyQuote() {
  dayQuotes
    .getDailyQuote()
    .then(results => ui.populateDailyQuote(results))
    .catch(err => console.log(err));
}
fetchDailyQuote();

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

// Call above function when new quotes are requested by user
cnInputBtn.addEventListener('click', e => {
  e.preventDefault();
  if (cnInputNumber.value !== '') {
    fetchChuckNorrisQuotes(cnInputNumber.value);
  } else fetchChuckNorrisQuotes(5);
  cnInputNumber.value = '';
});

// Clock
function getTimeDate() {
  const time = new Date();
  let hour = time.getHours(),
    minutes = time.getMinutes(),
    seconds = time.getSeconds(),
    month = time.getMonth(),
    day = time.getDate(),
    year = time.getFullYear();
  console.log(day);
  setTimeout(ui.populateClockDate(hour, minutes, seconds, month, day, year), 1000);

  setTimeout(getTimeDate, 1000);
}
getTimeDate();

// cache dom
const wordInputBox = document.getElementById('wordInput'),
  wordSubmitBtn = document.getElementById('wordSubmit');

// on submit click,
wordSubmitBtn.addEventListener('click', getDefinition);

function getDefinition(e) {
  e.preventDefault();
  // get word input
  const word = wordInputBox.value;

  //   if input is not empty, select the first object that contains shortdef
  if (wordInputBox.value !== '') {
    dictionary
      .getData(word)
      .then(results => ui.addToList(word, results[0]))
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
}

// if add task button is clicked
const taskAddBtn = document.getElementById('add-task');
taskAddBtn.addEventListener('click', ui.addItemToToDoList);

// if remove task button (x) is clicked
const taskRemoveBtn = document.querySelector('.list-items');
taskRemoveBtn.addEventListener('click', ui.removeItemFromToDoList);

// on load, bring items from local storage into to do list
document.addEventListener('DOMContentLoaded', ui.getFromLocalStorage);

// Change weather button
const changeWeather = document.querySelector('.change-weather-btn'),
  submitChangeWeather = document.querySelector('#weather-submit');

// change weather inputs
const wCity = document.getElementById('weather-city'),
  wState = document.getElementById('weather-state'),
  wCountry = document.getElementById('weather-country');

// Open up change weather modal on click and add overlay to whole screen to whole screen
changeWeather.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.change-weather-box').classList.add('changeWeatherBoxVisibility');
  document.getElementById('overlay').style.display = 'block';
});

// submit change weather modal event listener
submitChangeWeather.addEventListener('click', sendChangeWeatherInfo);

// gets new info from user and updates weather information on page
function sendChangeWeatherInfo(e) {
  e.preventDefault();
  // show overlay
  document.querySelector('.change-weather-box').style.visibility = 'hidden';

  // update weather location information
  if (wCountry.value !== '' && wState.value !== '' && wCity.value !== '') {
    weather.changeLocation((city = wCity.value), (state = wState.value), (country = wCountry.value));
    fetchWeather();
  } else {
  }
  wCity.value = '';
  wState.value = '';
  wCountry.value = '';
  document.getElementById('overlay').style.display = 'none';
}
