const getRandomNumber = function (from, to) {
  if (to <= from && to, from <= 0) {
    return false;
  }
  const rand = from - 0.5 + Math.random() * (to - from + 1);
  return Math.round(rand);
};

getRandomNumber(0, 10);

const getLengthCheck = function (str, MAX_LENGHT) {
  if  (MAX_LENGHT  <= str || str === '') {
    return false;
  }
  return true;
};

getLengthCheck(100, 140);
