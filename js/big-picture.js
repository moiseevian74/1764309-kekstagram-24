import './data.js';
import {isEscapeKey} from './util.js';
import {addEffect, resetFilter} from './scale.js';

const effectsList = document.querySelector('.effects__list');
const MAX_INDEX_OF_COMMENTS_ARRAY = 5;//согласно ТЗ
const MIN_INDEX_OF_COMMENTS_ARRAY = 0;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureImg = document.querySelector('.big-picture__img');
const img = bigPictureImg.querySelector('img');
const likesСount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialComment = document.querySelector('.social__comment');
const socialComments = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const commentsLoader = document.querySelector('.comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
const bigPictureClose = document.querySelector('.big-picture__cancel');//крестик закрытия попап

const socialCommentFragment = document.createDocumentFragment();

const removeComments = () => {//удаление комментариев (из массива) при закрытии окна
  socialComments.innerHTML = '';
};

const fillComments = (items) => {//комментарии к изображению
  items.forEach(({avatar, name, message}) => {
    const commentElement = socialComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    socialCommentFragment.appendChild(commentElement);
  });

  socialComments.appendChild(socialCommentFragment);
};

let totalCommentsArray = [];

const showFiveComments = () => {//функция показа 5 комментариев
  const allComments = totalCommentsArray.length;
  const commentsFive = totalCommentsArray.slice(MIN_INDEX_OF_COMMENTS_ARRAY, MAX_INDEX_OF_COMMENTS_ARRAY );//возвращает новый массив, содержащий копию части исходного массива(5 комментариев)
  fillComments(commentsFive);
  commentsLoader.classList.remove('hidden');
  socialCommentCount.firstChild.textContent = `${MAX_INDEX_OF_COMMENTS_ARRAY} из `;
  if (allComments <= MAX_INDEX_OF_COMMENTS_ARRAY) {
    commentsLoader.classList.add('hidden');
    socialCommentCount.firstChild.textContent = `${allComments} из `;
  }
};

const showMoreComments = () => {//функция подгрузки ещё +5 комментариев
  let moreComments = socialComments.children.length + MAX_INDEX_OF_COMMENTS_ARRAY;
  const commentsPart = totalCommentsArray.slice(socialComments.children.length, moreComments);
  fillComments(commentsPart);
  if (moreComments >= totalCommentsArray.length) {
    moreComments = totalCommentsArray.length;
    commentsLoader.classList.add('hidden');
    socialCommentCount.firstChild.textContent = `${moreComments} из `;
  }
  socialCommentCount.firstChild.textContent = `${moreComments} из `;
};

const fillBigPicture = ({url, likes, comments, description}) => {//отрисовка комметариев
  removeComments();
  totalCommentsArray = comments;
  img.src = url;
  likesСount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
  showFiveComments();
  openBigPicture();
};

const onEscKeydown = (evt) => {//закрытие окна при нажатии клавиши esc
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture() {//функция - показать попап
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.addEventListener('click', showMoreComments);
  body.classList.add('.modal-open');
  document.addEventListener('keydown', onEscKeydown);
  effectsList.addEventListener('click', addEffect);
}

function closeBigPicture() {//функция - скрыть попап
  resetFilter();
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.removeEventListener('click', showMoreComments);
  body.classList.remove('.modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  effectsList.removeEventListener('click', addEffect);
}

bigPictureClose.addEventListener('click', () => {//закрытие окна при нажатии button "X"
  closeBigPicture();
});

export {fillBigPicture};
