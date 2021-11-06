import {isEscapeKey} from './util.js';
import {getLeghtCheck} from './util.js';

const uploadFile = document.querySelector('#upload-file');//изначальное состояние поля для загрузки изображения
const imgUploadOverlay = document.querySelector('.img-upload__overlay');//форма редактирования изображения
const body = document.querySelector('body');
const textDescription = document.querySelector('.text__description');//textarea для добавления комментария к изображению
const uploadCancel = document.querySelector('#upload-cancel');//кнопка для закрытия формы редактирования изображения
const textHashtags = document.querySelector('.text__hashtags');//input для добавления хэш-тегов
const btnSubmit = document.querySelector('.img-upload__submit');//кнопка отправки формы
const regularValue = /^#[A-Za-zА-Яа-яЁё0-9#]{1,19}$|(^$)/;//регулярное выражение для хэш-тегов
const symbols = /^#\S*#\S*/;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;

const checkTextHashtags = () => {//проверка валидности поля хэш-тега на превышение лимита введеных символов или неккоретное ввод
  const hashtagText = textHashtags.value.toLowerCase();//возвращает значение строки, на которой он был вызван, преобразованное в нижний регистр
  const hashtagArray = hashtagText.split('');//метод разделяет строку на массив строк путем разделения строки на подстроки
  const tempHashtagArray = [];
  textHashtags.setCustomValidity('');
  for (let i = 0; i < hashtagArray.length; i++) {
    if (hashtagArray[i] === '#') {
      textHashtags.setCustomValidity('Хэш-тег не может состоять только из одной решётки.');
    } else if (!regularValue.test(hashtagArray[i])) {
      textHashtags.setCustomValidity('Строка после решётки должна состоять из 20 букв и чисел, включая хештег и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
    } else if (symbols.test(hashtagArray[i])) {
      textHashtags.setCustomValidity('Хэш-теги должны разделяться пробелами.');
    } else if (hashtagArray.length > MAX_HASHTAG_COUNT) {
      textHashtags.setCustomValidity('Нельзя указать больше 5 хэш-тегов');
    } else if (tempHashtagArray.includes(hashtagArray[i])) {
      textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
    } else {
      tempHashtagArray.push(hashtagArray[i]);
    }

    textHashtags.reportValidity();//проверка валидности поля на каждый ввод символа
  }
};

const checkCommentsLenght = () => {//проверка валидности поля комментария на превышение лимита введеных символов
  const commentLength = getLeghtCheck(textDescription.value, MAX_COMMENT_LENGTH);
  if (!commentLength) {
    textDescription.setCustomValidity(`Длина комментария не может составлять больше 140 символов. Лишних символов: ${textDescription.value.length - MAX_COMMENT_LENGTH}.`);
    btnSubmit.disabled = true;
  } else {
    textDescription.setCustomValidity('');
    btnSubmit.disabled = false;
  }
  textDescription.reportValidity();
};

const onEscKeydown = (evt) => {//закрытие окна, если поле комментария или хэштега не в фокусе
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const stopEvent = (evt) => {//запрет на закрытие окна при фокусе!, если нажать ESC
  evt.stopPropagation();
};

const clearForm = () => {//очистка формы
  uploadFile.value = '';
  document.querySelector('.img-upload__form').reset();
};

function openUserModal() {//функция показа окна 'добавления фотографии'
  uploadFile.addEventListener ('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', onEscKeydown);
    textHashtags.addEventListener('keydown', stopEvent);
    textHashtags.addEventListener('input', checkTextHashtags);
    textDescription.addEventListener('keydown', stopEvent);
    textDescription.addEventListener('input', checkCommentsLenght);
  });
}

function closeUserModal() {//функция закрытия окна 'добавления фотографии'
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  clearForm();//очистка формы

  document.removeEventListener('keydown', onEscKeydown);
  textHashtags.removeEventListener('keydown', stopEvent);
  textHashtags.removeEventListener('input', checkTextHashtags);
  textDescription.removeEventListener('keydown', stopEvent);
  textDescription.removeEventListener('input', checkCommentsLenght);
}

uploadFile.addEventListener('click', openUserModal);//Событие открытия окна при клике кнопки 'загрузить'

uploadCancel.addEventListener('click', closeUserModal);//Событие закрытия окна при клике на 'X'
