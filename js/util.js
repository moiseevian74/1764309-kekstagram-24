// Функция проверки длины строки
const getLeghtCheck = function (str, maxLenght) {
  if  (maxLenght  <= str.length) {
    return false;
  }
  return true;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getLeghtCheck, isEscapeKey};
