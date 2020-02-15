const weather = new Weather('New York', 'NY', 'US');
const news = new News();
const dayQuotes = new dailyQuotes();
const cNorrisQuotes = new chuckNorrisQuotes();
const ui = new UI();

// Get input value for selection of chuck norris quotes
const cnInputNumber = document.getElementById('cnInput');
const cnInputBtn = document.getElementById('chuck-norris-quotes-btn');

// For link toggle on small screens, toggle dropdown on icon click
const toggleBtn = document.getElementById('toggler-icon');
toggleBtn.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.navbar').classList.toggle('responsive');
  if (document.querySelector('.navbar').classList.contains('responsive')) {
    toggleBtn.style.color = 'black';
  } else {
    toggleBtn.style.color = 'white';
  }
});

// change background dynamically, once per hour (for simplicity)

const link = `https://source.unsplash.com/random/1920x1080`;
const body = document.body;
function changeBackground() {
  body.style.backgroundImage = `url(https://source.unsplash.com/random/1920x1080)`;
  body.style.backgroundSize = 'cover';
  body.style.backgroundAttachment = 'fixed';
  body.style.backgroundPosition = 'top';
}
changeBackground();
setInterval(changeBackground, 3600000);

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
    day = time.getDay(),
    year = time.getFullYear();
  setTimeout(ui.populateClockDate(hour, minutes, seconds, month, day, year), 1000);

  setTimeout(getTimeDate, 1000);
}
getTimeDate();
