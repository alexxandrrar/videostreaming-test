import { series } from "./src/constants/data.js";
import { getShowsByGenre } from "./src/utils/getShowsByGenre.js";
import { getShowByName } from "./src/utils/getShowByName.js";
import { getShowsByYear } from "./src/utils/getShowsByYear.js";
import { getMostViewedShows } from "./src/utils/getMostViewedOf.js";
import { getRandomShow } from "./src/utils/getRandomShow.js";
import { getUserSubscriptions } from "./src/utils/getUserSubscriptions.js";

class User {
  subscriptions = [];
  constructor(name, subscriptions) {
    this.name = name;
    this.subscriptions = subscriptions;
  }

  subscribe(StreamingService) {
    if (this.subscriptions.includes(StreamingService)) {
      console.log(
        `User has already made a subscription on ${StreamingService.name}`
      );
    } else {
      console.log(`${this.name} subscribed on ${StreamingService.name}`);
      this.subscriptions.push({ ...new Subscription(StreamingService) });
    }

    return new Subscription(StreamingService);
  }

  userSubscriptions() {
    const list = getUserSubscriptions(this.subscriptions);
    console.log(`User ${this.name} is subscribed on ${list}`);
  }
}

class Subscription {
  constructor(StreamingService) {
    this.streamingService = StreamingService;
  }

  watch(showName) {
    const show = getShowByName(this.streamingService.shows, showName)[0];
    if (show === undefined) {
      console.log(`${showName} can not be found`);
    } else {
      show.views += 1;
      console.log(`User watched ${showName}, now views count is ${show.views}`);
    }
  }

  getRecommendationByGenre(genre) {
    const result = getRandomShow(
      this.streamingService.getMostViewedShowOfGenre(genre)
    );
    console.log(result.name);
  }

  getRecommendationTrending() {
    const currentYear = new Date().getFullYear();
    const result = getRandomShow(
      this.streamingService.getMostViewedShowsOfYear(currentYear)
    );
    console.log(result.name);
  }
}

class StreamingService {
  shows = [];

  constructor(name) {
    this.name = name;
    this.shows = this.shows;
  }

  addShow(show) {
    if (this.shows.includes(show)) {
      console.log(`${show} has already exist`);
    } else {
      this.shows.push(show);
      console.log(`${show.name} successfully added`);
    }
  }

  getMostViewedShowOfGenre(genre) {
    return getMostViewedShows(getShowsByGenre(this.shows, genre));
  }

  getMostViewedShowsOfYear(year) {
    return getMostViewedShows(getShowsByYear(this.shows, year));
  }
}

class Show {
  constructor(name, genre, releaseDate, views) {
    this.name = name;
    this.genre = genre;
    this.releaseDate = releaseDate;
    this.views = views;
  }
}

class Series extends Show {
  episodes = [];

  constructor(name, genre, releaseDate, views, episodes) {
    super(name, genre, releaseDate, views);
    this.episodes = episodes;
  }
  getDuration() {
    const duration = this.episodes.length * 60;
    console.log(`${this.name} duration is ${duration} min.`);
  }
}

// Start

const netflix = new StreamingService("Netflix");

for (let i = 0; i < series.length; i++) {
  netflix.addShow(
    new Series(
      series[i].name,
      series[i].genre,
      series[i].releaseDate,
      series[i].views,
      series[i].episodes
    )
  );
}

const Sasha = new User("Sasha", []);
const netflixSubscription = Sasha.subscribe(netflix);

netflixSubscription.watch("Sherlock Holmes");
netflixSubscription.watch("Dynagg");
netflixSubscription.getRecommendationByGenre("drama");
netflixSubscription.getRecommendationTrending();
