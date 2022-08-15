export const getUserSubscriptions = (subscriptions) => {
  const subscriptionList = [];
  for (let i of subscriptions) {
    subscriptionList.push(i.streamingService["name"]);
  }
  return subscriptionList;
};
