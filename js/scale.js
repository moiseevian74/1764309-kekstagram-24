const STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;

const btnSmaller = document.querySelector('.scale__control--smaller');
const btnBigger = document.querySelector('.scale__control--bigger');
const inputValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__picture');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');

let currentValue = 100;

inputValue.value = `${currentValue}%`;

btnSmaller.addEventListener('click', () => {
  if (currentValue !== MIN_VALUE) {
    currentValue -= STEP;
    imgUploadPreview.style.transform = `scale(${currentValue / 100})`;
    inputValue.value = `${currentValue}%`;
  }
});

btnBigger.addEventListener('click', () => {
  if (currentValue !== MAX_VALUE) {
    currentValue += STEP;
    imgUploadPreview.style.transform = `scale(${currentValue / 100})`;
    inputValue.value = `${currentValue}%`;
  }
});

const resetFilter = () => {
  imgUploadPreview.style.filter = '';
  imgUploadPreview.className = '';
  effectLevel.classList.add('hidden');
};

const SLIDER_PARAMETERS = {
  'chrome': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  'sepia': {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  'marvin': {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => `${value}%`,
      from: (value) => Number(value.replace('%', '')),
    },
  },
  'phobos': {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => `${value}px`,
      from: (value) => Number(value.replace('px', '')),
    },
  },
  'heat': {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
};
const FILTERS = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

const addEffect = (evt) => {
  const currentEffectValue = evt.target.value;
  if (evt.target.classList.contains('effects__radio')) {
    effectLevel.classList.remove('hidden');
    if (currentEffectValue === 'none') {
      resetFilter();
    } else {
      noUiSlider.create(effectLevelSlider, SLIDER_PARAMETERS[currentEffectValue]);
      imgUploadPreview.className = `effects__preview--${currentEffectValue}`;
      effectLevelSlider.noUiSlider.on('update', (value, handle, unencoded) => {
        imgUploadPreview.style.filter = `${FILTERS[currentEffectValue]}(${value[handle]})`;
        effectLevelValue.value = unencoded[handle];
      });
    }
  } else if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
};

export {resetFilter, addEffect, imgUploadPreview};
