// Функция получения случайного числа
const getRandomNumber =  (from, to) => {
  if (to <= from && to <= 0) {
    return false;
  }
  const rand = from - 0.5 + Math.random() * (to - from + 1);
  return Math.round(rand);
};

export {getRandomNumber};

// Функция проверки длины строки
const getLeghtCheck = function (str, MAX_LENGHT) {
  if  (MAX_LENGHT  <= str || str === '') {
    return false;
  }
  return true;
};

export {getLeghtCheck};

// Функция - счетчик
let currentCount = 1;

function makeCounter() {
  return function() {
    return currentCount++;
  };
}

const counter = makeCounter();

export {counter, currentCount};
