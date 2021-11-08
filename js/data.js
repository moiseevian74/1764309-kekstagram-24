import {getRandomNumber, getLeghtCheck, counter, currentCount} from './util.js';

const COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const NAMES = [
  'Артём',
  'Андрей',
  'Мария',
  'Максим',
  'Виктор',
  'Юлия',
  'Дмитрий',
  'Сергей',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  'Я считаю, что снимок получился смешным.',
  'Хорошая фотография - это приятное воспоминание, запечатленное навсегда.',
  'Просто вот! :)',
  'Моя жизнь хороша только на фото >_<',
  'Хочу пиццы',
  '( ͡° ͜ʖ ͡°)',
  'Делюсь фоточкой, с вас лайки!',
  'Упс, случайно ткнул на камеру',
  'Kekstagram — это просто Twitter для людей, которые выходят на улицу.',
  'Страшнее фотографии в паспорте может быть только эта',
  'Я - описание фотографии',
];

const getCommentsArray = () => {//функция получения массива объектов комментария в кол-ве from/to
  const comments = [];
  const numberOfComments = getRandomNumber(2, 15);
  for (let i = 0; i < numberOfComments; i++) {
    const comment = {
      id: currentCount,
      avatar: `img/avatar-${  getRandomNumber(MIN_AVATAR, MAX_AVATAR)  }.svg`,
      message: MESSAGE[getRandomNumber(0, MESSAGE.length - 1)],
      name: NAMES[getRandomNumber(0, NAMES.length - 1)],
    };
    comments.push(comment);
  }
  return comments;
};

const getArrayProfiles = () => ({
  id: counter(),
  url: `photos/${  currentCount  }.jpg`,
  description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)], //описание как массив в задании не указан, поэтому один на всех
  likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
  comments: getCommentsArray(),
});

const photoDescription = () => Array.from({length: COUNT}, getArrayProfiles);//метод формирования массива объектов

export {getArrayProfiles, photoDescription, getLeghtCheck};
