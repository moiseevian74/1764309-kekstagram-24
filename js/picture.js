import {fillBigPicture} from './big-picture.js';
import {debounce} from './utils/debounce.js';

const pictureBlock = document.querySelector('.pictures');//поиск блока для вставки фрагментов
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');//поиск содержимого шаблона
const filtersContainer = document.querySelector('.img-filters');
filtersContainer.classList.remove('img-filters--inactive');
const filterForm = document.querySelector('.img-filters__form');
const discussedFilter = document.querySelector('#filter-discussed');
const randomFilter = document.querySelector('#filter-random');
const defaultFilter = document.querySelector('#filter-default');
const getRandomPicture = () => Math.random() - 0.5;

const pictures = {
  data: [],

  setData(picturesData) {
    this.data = picturesData;
  },
};

const filterDiscussed = (first, second) => {
  if (first.comments < second.comments) {
    return 1;
  } else {
    return -1;
  }
};

const filterDefault = (first, second) => {
  if (first.id > second.id) {
    return 1;
  } else {
    return -1;
  }
};

const renderPicture = (similarPictures) => {//запись результата функции в переменную

  const pictureFragment = document.createDocumentFragment();
  const pictureItems = pictures.data;
  const somePhotos = pictureItems.slice(0, similarPictures);
  somePhotos.forEach(({url, likes, comments, id, description}) => {//деструктуризация параметров объекта в переменные
    const pictureElement = pictureTemplate.cloneNode(true);//клонирование шаблона
    pictureElement.querySelector('.picture__img').src = url;//присваивание источнику значение параметра объекта из массива
    pictureElement.querySelector('.picture__likes').textContent = likes;//вывести колличесво лайков под фотографией
    pictureElement.querySelector('.picture__comments').textContent = comments.length;////вывести колличесво комментариев под фотографией

    pictureFragment.appendChild(pictureElement);//создание макета фотографии с данными на каждой итерации
    pictureElement.addEventListener('click', () => {
      fillBigPicture({url, likes, comments, id, description});
    });
  });
  pictureBlock.appendChild(pictureFragment);//вставка элементов с данными в искомый блок
};

const removeFilter = () => {
  discussedFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  defaultFilter.classList.remove('img-filters__button--active');
};

const clearPicture = () => {
  const picture = document.getElementsByClassName('picture');
  let numberPicture;
  while ((numberPicture = picture[0])) {
    numberPicture.parentNode.removeChild(numberPicture);
  }
};

const onButtonClick = () => {
  filterForm.addEventListener('click', (evt) => {
    const makeDebounce = debounce(() => renderPicture());
    const makeRandomDebounce = debounce(() => renderPicture(10));
    if (evt.target.id === 'filter-default') {
      clearPicture();
      removeFilter();
      evt.target.classList.add('img-filters__button--active');
      pictures.data.sort(filterDefault);
      makeDebounce();
    }
    if (evt.target.id === 'filter-discussed') {
      clearPicture();
      removeFilter();
      evt.target.classList.add('img-filters__button--active');
      pictures.data.sort(filterDiscussed);
      makeDebounce();
    }
    if (evt.target.id === 'filter-random') {
      clearPicture();
      removeFilter();
      evt.target.classList.add('img-filters__button--active');
      pictures.data.sort(getRandomPicture);
      makeRandomDebounce();
    }
  });
};

export {renderPicture, pictures, onButtonClick};
