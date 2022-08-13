export const getShowsByGenre = (showList, genre) =>
  showList.filter((item) => item.genre === genre);
