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
    this.wordSpot = document.getElementById('word');
  }
  //   Populate Weather section
  populateWeather(weather) {
    this.weatherIcon.setAttribute('src', `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
    this.info.innerText = `${weather.name}, ${weather.sys.country}`;
    this.temp.innerText = `Temp: ${weather.main.temp}°F`;
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
    let output = '';
    if (quote.contents !== undefined) {
      quote = quote.contents.quotes[0];
      output += `<p><strong>${quote.title}</strong> <br> Author:<em>${quote.author}</em> <br>"${quote.quote}"</p>`;
    } else {
      output = 'Awaiting new awesome quotes!';
    }
    this.qotd.innerHTML = output;
  }

  populateChuckNorrisQuotes(quotes) {
    quotes = quotes.value;
    let output = '';
    quotes.forEach(quote => {
      output += `<li>${quote.joke}</li>`;
    });
    this.cnQuotes.innerHTML = `
      <ul id='cnQuotes-list'>
        ${output}
      </ul>
    `;
  }

  addToList(word, definitions) {
    //   defintions can be undefined if the api returns an empty array (can't find any matches whatsoever)
    // when it does that, defintions comes in as undefined. If it is undefined (see else at end)
    if (definitions !== undefined) {
      //   function that creates the series of lists based on size of shortdef from API
      function makeList(definitions) {
        console.log(definitions);

        if (definitions.shortdef !== undefined) {
          let shortDefs = definitions.shortdef;
          let listItems = '';
          shortDefs.forEach(def => {
            listItems += `<li>${def}</li>`;
          });
          return listItems;
        } else {
          return 'The word you entered is not a word. Please enter a proper word and try again.';
        }
      }

      // insert h3 element with chosen word and ol (we want numbers) with returned li items from helper function above
      this.wordSpot.innerHTML = `
        <h3 >Chosen Word: <em>${word}<em></h3>
        <ol id="word-definition">
            ${makeList(definitions)}
        </ol>
    `;
      document.getElementById('wordInput').value = '';
    } else {
      // Insert a p element saying it isn't a word if the defintions came in as undefined
      this.wordSpot.innerHTML = `
        <h3 >Chosen Word: <em>${word}<em></h3>
        <p>This is not a word. Enter a different word.</p>
    `;
    }
  }

  // add item to to do list
  addItemToToDoList(e) {
    e.preventDefault();
    const taskList = document.getElementById('task-input');
    if (taskList.value === '') {
      taskList.style.border = '1px solid red';
      taskList.setAttribute('placeholder', 'PLEASE ENTER A TASK FIRST');
    } else {
      taskList.style.border = 'none';
      taskList.setAttribute('placeholder', 'Enter task...');
      // create new li
      const li = document.createElement('li');
      // add li class
      li.className = 'list-item';
      // append text node containing user input to li item
      li.appendChild(document.createTextNode(taskList.value));
      // create 'a' element to list and add classes/html
      const link = document.createElement('a');
      link.className = 'delete-item';
      link.innerHTML = '<i class="fas fa-times"></i>';

      // append 'a' element to li
      li.appendChild(link);
      document.querySelector('.list-items').append(li);

      // add to local storage
      ui.addToLocalStorage(taskList.value);
      // clear input
      taskList.value = '';
    }
  }
  // remove item from to do list
  removeItemFromToDoList(e) {
    e.preventDefault();
    // if i->a->contains 'delete item'
    if (e.target.parentElement.classList.contains('delete-item')) {
      // remove i->a->li
      e.target.parentElement.parentElement.remove();
    }
    ui.removeFromLocalStorage(e.target.parentElement.parentElement);
  }

  // add item to local storage
  addToLocalStorage(task) {
    let tasks;
    // if local storage is empty, make tasks an empty array
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      // if local storage not empty, load tasks from local storage into tasks
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // append new task to tasks and add to local storage
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // remove item from local storage
  removeFromLocalStorage(taskItem) {
    let tasks;
    // if local storage is empty, make tasks an empty array
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      // if local storage not empty, load tasks from local storage into tasks
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // loop through tasks. If the current task item has the same content as the task item to be removed, remove it from local storage
    tasks.forEach((task, index) => {
      console.log(taskItem.textContent, task);
      if (taskItem.textContent === task) {
        tasks.splice(index, 1);
      }
    });
    // store updated tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.forEach(task => {
        // create new li
        const li = document.createElement('li');
        // add li class
        li.className = 'list-item';
        // append text node containing user input to li item
        li.appendChild(document.createTextNode(task));
        // create 'a' element to list and add classes/html
        const link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML = '<i class="fas fa-times"></i>';

        // append 'a' element to li
        li.appendChild(link);
        document.querySelector('.list-items').append(li);
        // clear input
      });
    }
  }
}
