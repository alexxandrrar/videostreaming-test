import { series } from "./src/constants/data.js";
import { getShowsByGenre } from "./src/utils/getShowsByGenre.js";

class User {
  constructor(name, subscriptions) {
    this.name = name;
    this.subscriptions = subscriptions;
  }
  show(movieName) {
    console.log(`${this.name} is wathching ${movieName}`);
  }
}

class StreamingService {
  shows = [];
  constructor(name) {
    this.name = name;
    this.shows = this.shows;
  }

  addShow(show) {
    this.shows.push(show);
  }

  getMostViewedShowOfGenre(genre) {
    const allViewes = [];
    const showByGenre = getShowsByGenre(this.shows, genre);
    for (let i of showByGenre) allViewes.push(Number(i.viewes));
    return Math.max(...allViewes);
  }
}

const netflix = new StreamingService("Netflix");
netflix.addShow(series[0]);
netflix.addShow(series[1]);
netflix.addShow(series[2]);
netflix.addShow(series[7]);
console.log(netflix.getMostViewedShowOfGenre("drama"));
