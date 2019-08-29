import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    let url = `https://www.food2fork.com/api/search?key=aa39f9fa8ca4cc042bff0def1d8d802f&q=${this.query}`;
    try {
      const res = await axios(url);

      this.result = res.data.recipes;
      //   console.log(this.result);
    } catch (err) {
      alert(err);
    }
  }
}
