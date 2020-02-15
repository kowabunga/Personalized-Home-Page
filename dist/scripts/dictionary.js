class Dictionary {
  // add keys to class
  constructor() {
    this.dict_api_key = '5c923f37-5b6d-4dc4-8a19-7e96ffed91e2';
  }
  async getData(word) {
    //   fetch data
    const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${this.dict_api_key}`);

    // parses response into json object
    const resData = await response.json();
    return resData;
  }
}
