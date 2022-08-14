export const getShowByName = (showList, name) => {
  return showList.filter((item) => item.name === name);
};
