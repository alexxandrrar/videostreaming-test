import { series } from "./src/constants/data.js";
import { getShowsByGenre } from "./src/utils/getShowsByGenre.js";
import { getShowByName } from "./src/utils/getShowByName.js";
import { getShowsByYear } from "./src/utils/getShowsByYear.js";

class StreamingService {
  shows = [];
  constructor(name) {
    this.name = name;
    this.shows = this.shows;
  }

  addShow(show) {
    this.shows.push(show);
    console.log(`${show} was added`);
  }

  getMostViewedShowOfGenre(genre) {
    const showByGenre = getShowsByGenre(this.shows, genre);
    const sortedShowsByGenre = showByGenre.sort((a, b) => b.viewes - a.viewes);
    console.log(sortedShowsByGenre.slice(0, sortedShowsByGenre.length / 2));
    return sortedShowsByGenre.slice(0, sortedShowsByGenre.length / 2);
  }
  getMostViewedShowsOfYear(year) {
    const showByYear = getShowsByYear(this.shows, year);
    const sortedShowsByYear = showByYear.sort((a, b) => b.viewes - a.viewes);
    console.log(sortedShowsByYear.slice(0, sortedShowsByYear.length / 2));
    return sortedShowsByYear.slice(0, sortedShowsByYear.length / 2);
  }
}

const netflix = new StreamingService("Netflix");
const news = new StreamingService("News");
netflix.addShow(series[0]);
// netflix.addShow(series[1]);
// netflix.addShow(series[2]);
// netflix.addShow(series[3]);
// netflix.addShow(series[4]);
// netflix.addShow(series[5]);
// netflix.addShow(series[6]);
// netflix.addShow(series[7]);
news.addShow("Hello");
//netflix.getMostViewedShowsOfYear(2019);

class Subscription {
  constructor(StreamingService) {
    this.streamingService = StreamingService;
  }

  watch(showName) {
    const show = getShowByName(series, showName)[0];
    show === undefined
      ? console.log(`${showName} can not be found`)
      : (show.viewes += 1);
    console.log(`User watched ${showName},now views count is ${show.viewes}`);
  }
}

class User {
  subscriptions = [];
  constructor(name, subscriptions) {
    this.name = name;
    this.subscriptions = subscriptions;
  }
  subscribe(StreamingService) {
    this.subscriptions.includes(StreamingService)
      ? console.log(
          `User has already made a subscription on ${StreamingService}`
        )
      : this.subscriptions.push({ ...new Subscription(StreamingService) });

    return new Subscription(StreamingService);
  }
}

const Sasha = new User("Sasha", []);
const netflixSubscription = Sasha.subscribe(netflix);

console.log(netflixSubscription);

netflixSubscription.watch("Dynasty");
Sasha.subscribe(news);
