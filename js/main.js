import {pictures, renderPicture} from './picture.js';
import {closeUserModal} from './form.js';
import {setUserFormSubmit} from './form.js';
import {getData} from './api.js';

const getTask = async () => {
  const data = await getData();

  pictures.setData(data);
  renderPicture();

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  setUserFormSubmit(closeUserModal);
};

getTask();
