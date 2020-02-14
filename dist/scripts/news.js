class News {
  constructor() {
    this.api_key = '15740a87ca9749828da0c5071af09d20';
  }
  async getNews() {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.api_key}`);
    const resData = await response.json();
    return resData;
  }
}
