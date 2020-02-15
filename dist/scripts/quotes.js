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
