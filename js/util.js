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
const getLeghtCheck = function (str, maxLenght) {
  if  (maxLenght  <= str.length) {
    return false;
  }
  return true;
};

export {getLeghtCheck};

// Функция - счетчик
let currentCount = 0;

function makeCounter() {
  return function() {
    return currentCount++;
  };
}

const counter = makeCounter();

const isEscapeKey = (evt) => evt.key === 'Escape';

export {counter, currentCount, isEscapeKey};
