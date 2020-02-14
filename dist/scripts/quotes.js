class dailyQuotes {
  async getDailyQuote() {
    const response = await fetch(`http://quotes.rest/qod.json`);
    const resData = await response.json();
    return resData;
  }
}

class chuckNorrisQuotes {
  async getChuckNorrisQuotes(number) {
    const response = await fetch(`http://api.icndb.com/jokes/random/${number}`);
    const resData = await response.json();
    return resData;
  }
}
