const json2query = (obj) => {
  const keys = Object.keys(obj);
  return keys.map((key) => `${key}="${obj[key]}"`).join();
};
module.exports = json2query;
