// utils.js
export const getRecentItems = (items, days = 10) => {
  const today = new Date();
  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() - days);
  return items.filter(
    (item) =>
      new Date(item.createdAt) >= limitDate && new Date(item.createdAt) <= today
  );
};
