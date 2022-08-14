export const getRandomShow = (shows) => {
  return shows[Math.floor(Math.random() * shows.length)];
};
