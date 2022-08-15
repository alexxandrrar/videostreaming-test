# Incora task

## Creating streamnig service

```js
const netflix = new StreamingService("Netflix");
```

## Creating user and subscribe

```js
const Sasha = new User("Sasha", []);
Sasha.subscribe(netflix);

// returns "Sasha subscribed on Netflix"
```

## Method getRecommendationByGenre

```js
netflixSubscription.getRecommendationByGenre("drama");

// returns a random show in genre from list (data.js)
```

## Method watch

```js
netflixSubscription.watch("Sherlock Holmes");

// returns "User watched Sherlock Holmes, now views count is 1821"
```

If we want to watch a non-existing show

```js
netflixSubscription.watch("Dynagg");

// returns "Dynagg can not be found"
```

## Method getRecommendationTrending

```js
netflixSubscription.getRecommendationTrending();

// returns "Riverdale"
```

## Method addShow

```js
  netflix.addShow(
    new Series(
      name: "Stranger things",
      seriesCount: 5,
      genre: "drama",
      views: 6451,
      releaseDate: 2022,
      episodes: [
        { name: "Stranger things serie 1", count: 1 },
        { name: "Stranger things serie 2", count: 2 },
        { name: "Stranger things serie 3", count: 3 },
        { name: "Stranger things serie 4", count: 4 },
        { name: "Stranger things serie 5", count: 5 },
      ],
    )
  );

  // returns "Stranger things successfully added"
```

## Method userSubscriptions

```js
const netflix = new StreamingService("Netflix");
const megogo = new StreamingService("Megogo");
const amazonPrime = new StreamingService("Amazon");

const Sasha = new User("Sasha", []);

Sasha.subscribe(netflix);
Sasha.subscribe(megogo);
Sasha.subscribe(amazonPrime);

Sasha.userSubscriptions();

// returns "User Sasha is subscribed on Netflix,Megogo,Amazon"
```
