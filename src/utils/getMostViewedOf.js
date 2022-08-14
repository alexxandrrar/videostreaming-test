export const getMostViewedShows = (shows) => {
  const sortedShows = shows.sort((a, b) => b.views - a.views);
  return sortedShows.slice(0, sortedShows.length / 2);
};
