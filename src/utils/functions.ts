export const pause = (delay = 2000) =>
  new Promise((resolve) => setTimeout(resolve, delay));
