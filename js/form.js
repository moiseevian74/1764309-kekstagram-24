import {isEscapeKey} from './util.js';
import {getLeghtCheck} from './util.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

const uploadFile = document.querySelector('#upload-file');//изначальное состояние поля для загрузки изображения
const imgUploadOverlay = document.querySelector('.img-upload__overlay');//форма редактирования изображения
const body = document.querySelector('body');
const textDescription = document.querySelector('.text__description');//textarea для добавления комментария к изображению
const uploadCancel = document.querySelector('#upload-cancel');//кнопка для закрытия формы редактирования изображения
const textHashtags = document.querySelector('.text__hashtags');//input для добавления хэш-тегов
const btnSubmit = document.querySelector('.img-upload__submit');//кнопка отправки формы
const regularValue = /^#[A-Za-zА-Яа-яЁё0-9#]{1,19}$|(^$)/;//регулярное выражение для хэш-тегов

function findDuplicates(array) {//Функция для поиска дубликата
  return (new Set(array)).size !== array.length;
}

const checkTextHashtags = () => {//проверка валидности поля хэш-тега на превышение лимита введеных символов или неккоретное ввод
  const hashtagArray = textHashtags.value.toLowerCase().split(' '); //Переводим строку в нижний регистр и создаем массив разделением строки пробелами/Метод split() разбивает объект String на массив строк путём разделения строки указанной подстрокой

  hashtagArray.forEach((hashtag) => {
    if (hashtagArray[0] === '') {
      textHashtags.value = textHashtags.value.trim();//Метод trim() удаляет пробельные символы с начала и конца строки
      textHashtags.setCustomValidity('');
    } else if (!hashtag.startsWith('#')) {
      textHashtags.setCustomValidity('хеш-тег должен начинаться с решётки #');
    } else if (hashtag === '#'){
      textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки #');
    } else if (hashtag.length > MAX_HASHTAG_LENGTH){
      textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку #');
    } else if (!regularValue.test(hashtag)){
      textHashtags.setCustomValidity('хеш-тег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
    } else if (hashtagArray.length > MAX_HASHTAG_COUNT){
      textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    } else if (findDuplicates(hashtagArray)){
      textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    } else {
      textHashtags.setCustomValidity('');
    }
  });

  textHashtags.reportValidity();
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