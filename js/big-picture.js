import './data.js';
import {usersPicture} from './picture.js';
import {isEscapeKey} from './util.js';

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

const fillComments = (item) => {//комментарии к изображению

  item.forEach(({avatar, name, message}) => {
    const commentElement = socialComment.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    socialCommentFragment.appendChild(commentElement);
  });

  socialComments.appendChild(socialCommentFragment);
  return socialComments;
};

const fillBigPicture = (picture) => {//отрисовка комметариев
  img.src = usersPicture[picture].url;
  likesСount.textContent = usersPicture[picture].likes;
  commentsCount.textContent = usersPicture[picture].comments;
  socialCaption.textContent = usersPicture[picture].description;
  fillComments(usersPicture[picture].comments);
  openBigPicture();
};

const onEscKeydown = (evt) => {//закрытие окна при нажатии клавиши esc
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const removeComments = () => {//удаление комментариев (из массива) при закрытии окна
  socialComments.removeChild(socialComments.lastChild);
};


function openBigPicture() {//функция - показать попап
  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('.modal-open');

  document.addEventListener('keydown', onEscKeydown);
}

function closeBigPicture() {//функция - скрыть попап
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('.modal-open');
  removeComments();

  document.removeEventListener('keydown', onEscKeydown);
}

bigPictureClose.addEventListener('click', () => {//закрытие окна при нажатии button "X"
  closeBigPicture();
});

export {fillBigPicture};
