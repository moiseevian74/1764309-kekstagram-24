import {showAlert, showForm} from './data_exchange.js';
import {clearForm} from './form.js';
import {resetFilter} from './scale.js';

const getData = async () => {
  try {
    const response = await fetch('https://24.javascript.pages.academy/kekstagram/data');
    return await response.json();
  } catch (error) {
    showAlert('Не удалось получить изображения. Обновите страницу');
  }
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        clearForm();
        resetFilter();
        showForm();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
        clearForm();
        resetFilter();
        showForm(false);
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
