'use strict';

// Создадим временную ф-ю что-бы в будущем мы ее переписали и добавляли наши контакты в какое-то хранилище
// const addContactData = contact => {
  //Добавляем введенный пользователем контакт в исходный массив data
//   data.push(contact);
//   console.log('data:', data);
// };

/*Создаем свою область видимости, 
чтобы ничего не выходило в глобальную область, 
кроме того, что необходимо вынести*/

// Импортируем объекты из модулей и сразу деструктурируем объекты
import {
  modalControl,
  deleteControl,
  formControl,
} from './modules/control.js';

import hoverRow from './modules/createElements.js';

import {
  renderPhoneBook,
  renderContacts,
} from './modules/render.js';

import getStorage from './modules/serviceStorage.js';

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
}