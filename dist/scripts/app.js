const weather = new Weather('New York', 'NY', 'US');
const news = new News();
const dayQuotes = new dailyQuotes();
const cNorrisQuotes = new chuckNorrisQuotes();
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

// change background dynamically, once per hour (for simplicity)

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
