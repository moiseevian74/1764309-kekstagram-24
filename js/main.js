const GET_RANDON_NUMBER =  (from, to) => {
  if (to <= from && to <= 0) {
    return false;
  }
  const rand = from - 0.5 + Math.random() * (to - from + 1);
  return Math.round(rand);
};

const GET_LEGHT_CHECK = function (str, MAX_LENGHT) {
  if  (MAX_LENGHT  <= str || str === '') {
    return false;
  }
  return true;
};

GET_LEGHT_CHECK();

let currentCount = 0;

function makeCounter() {
  return function() {
    return currentCount++;
  };
}

const counter = makeCounter();

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

const COUNT = 25;

const PROFILE = () => ({
  id: counter(),
  url: 'photos/' + currentCount + '.jpg', //eslint-disable-line prefer-template,
  description: 'описание',
  likes: GET_RANDON_NUMBER(15, 200),
  coments: [
    {
      id: currentCount,
      avatar: 'img/avatar-' + GET_RANDON_NUMBER(1, 6) + '.png', //eslint-disable-line prefer-template
      message: MESSAGE[GET_RANDON_NUMBER(0, MESSAGE.length - 1)],
      name: NAMES[GET_RANDON_NUMBER(0, NAMES.length - 1)],
    },
  ],
});

const PHOTO_DESCRIPTION = Array.from({length: COUNT}, PROFILE);

PHOTO_DESCRIPTION();
