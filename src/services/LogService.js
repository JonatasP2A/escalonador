
export const addNewLog = (logPosts, newLog) => new Promise((resolve, reject) => {
  resolve(logPosts.concat(newLog));

}); 