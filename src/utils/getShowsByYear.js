export const getShowsByYear = (showList, releaseDate) =>
  showList.filter((item) => item.releaseDate === releaseDate);
