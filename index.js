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
    this.shows.includes(show)
      ? console.log(`${show} has already exist`)
      : this.shows.push(show);
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

class Subscription {
  constructor(StreamingService) {
    this.streamingService = StreamingService;
  }

  watch(showName) {
    const show = getShowByName(series, showName)[0]; //series має наслідуатися зі сервісу, ПЕРЕРОБИИИ
    show === undefined
      ? console.log(`${showName} can not be found`)
      : (show.viewes += 1);
    console.log(`User watched ${showName},now views count is ${show.viewes}`);
  }
  getRecommendationByGenre(genre) {
    const result =
      this.streamingService.getMostViewedShowOfGenre(genre)[
        Math.floor(
          Math.random() *
            [this.streamingService.getMostViewedShowOfGenre(genre)].length
        )
      ];
    console.log(result.name); // працює, але ще 2 рази повертає попередні масиви сортованих шоу :(
  }
  getRecommendationTrending() {
    const currentYear = new Date().getFullYear();
    const result =
      this.streamingService.getMostViewedShowsOfYear(currentYear)[
        Math.floor(
          Math.random() *
            [this.streamingService.getMostViewedShowsOfYear(currentYear)].length
        )
      ];
    console.log(result.name); // працює, але 2 рази поверне масиви
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

const netflix = new StreamingService("Netflix");
for (let i of series) {
  netflix.addShow(i);
} // додає
netflix.getMostViewedShowsOfYear(2019); //РАБОТАЕТ
netflix.getMostViewedShowOfGenre("drama"); //РАБОТАЕТ

const Sasha = new User("Sasha", []);
const netflixSubscription = Sasha.subscribe(netflix);

netflixSubscription.watch("Dynasty");
//netflixSubscription.watch("Dynasy"); майже працює, потім помилка
netflixSubscription.getRecommendationByGenre("drama");
netflixSubscription.getRecommendationTrending();
