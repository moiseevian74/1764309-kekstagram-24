import {photoDescription} from './data.js';
import {fillBigPicture} from './big-picture.js';

const pictureBlock = document.querySelector('.pictures');//поиск блока для вставки фрагментов
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');//поиск содержимого шаблона

const usersPicture = photoDescription();//запись результата функции в переменную

const pictureFragment = document.createDocumentFragment();

usersPicture.forEach(({url, likes, comments, description}) => {//деструктуризация параметров объекта в переменные
  const pictureElement = pictureTemplate.cloneNode(true);//клонирование шаблона
  pictureElement.querySelector('.picture__img').src = url;//присваивание источнику значение параметра объекта из массива
  pictureElement.querySelector('.picture__likes').textContent = likes;//вывести колличесво лайков под фотографией
  pictureElement.querySelector('.picture__comments').textContent = comments.length;////вывести колличесво комментариев под фотографией

  pictureFragment.appendChild(pictureElement);//создание макета фотографии с данными на каждой итерации
  pictureElement.addEventListener('click', () => {
    fillBigPicture({url, likes, comments, description});
  });
});

pictureBlock.appendChild(pictureFragment);//вставка элементов с данными в искомый блок

export {usersPicture};
