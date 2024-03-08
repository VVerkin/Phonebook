
import * as control from './modules/control.js';

import render from './modules/render.js';

import {getStorage} from './modules/serviceStorage.js';

import createElements from './modules/createElements.js';


const {
  modalControl,
  deleteControl,
  formControl,
} = control;

const {
  hoverRow,
} = createElements;

const {
  renderPhoneBook,
  renderContacts,
} = render;

{
  // Ф-я, которая инициализирует наше приложение
  const init = (selectorApp, title) => {
    // Получим элемент по селектору и передадим в ф-ю render
    const app = document.querySelector(selectorApp);
    // Получаем data
    const data = getStorage('contacts');
    // Получаем объект и сразу выполняем деструктуризацию
    const {
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      form,
    } = renderPhoneBook(app, title);

    // Функционал
    //В ф-ю передаем list в чистом виде после деструктуризации и data
    const allRow = renderContacts(list, data);
    // Вызываем ф-ю открытия модального окна при нажатии кн "Добавить"
    const {closeModal} = modalControl(btnAdd, formOverlay);
    // Вызываем функцию, передаем allRow и logo?  иначе не сможем с ними взаимодействовать
    hoverRow(allRow, logo);
    // Вызываем ф-ю проявления "крестиков" при нажатии кнопки "удалить"
    deleteControl(btnDel, list);
    // Принимает деструктурированную форму
    formControl(form, list, closeModal);
  };

  window.phoneBookInit = init;
};
