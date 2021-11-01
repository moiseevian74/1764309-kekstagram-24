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

const getArrayProfiles = () => ({
  id: counter(),
  url: `photos/${  currentCount  }.jpg`,
  description: 'Я считаю, что снимок получился смешным', //описание как массив в задании не указан, поэтому один на всех
  likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
  comments: [
    {
      id: currentCount,
      avatar: `img/avatar-${  getRandomNumber(MIN_AVATAR, MAX_AVATAR)  }.png`,
      message: MESSAGE[getRandomNumber(0, MESSAGE.length - 1)],//для формирования текста комментария можно брать и 1 сообщение, согласно заданию
      name: NAMES[getRandomNumber(0, NAMES.length - 1)],
    },
  ],
});

const photoDescription = () => Array.from({length: COUNT}, getArrayProfiles);//метод формирования массива объектов

export {getArrayProfiles, photoDescription, getLeghtCheck};
