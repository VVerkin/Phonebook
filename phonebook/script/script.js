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


{
  // Ф-я открывает модальное окно с формой при нажатии на кнопку "Добавить"
  const modalControl = (btnAdd, formOverlay) => {
    // Ф-я добавляет класс для открыттия формы
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };
    // Ф-я убирает класс для закрытия формы
    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };
    // Навешиваем событие при клике на кнопку
    btnAdd.addEventListener('click', openModal);
    // Ф-я закрывает форму при клике на overlay или на крестик
    formOverlay.addEventListener('click', e => {
      const target = e.target; // создаем переменную target что бы дальше не писать event.target
      // Проверяем, что target - это formOverlay
      if (target === formOverlay || target.closest('.close')) {
        // Если да, то вызываем функцию закрытия формы
        closeModal();
      }
    });
    // Возвращаем ф-ю закрытия формы
    return {
      closeModal,
    };
  };
  // Ф-я при нажатии на кнопку "Удалить" показывает крестики, при нажатии на которые удаляется строка
  const deleteControl = (btnDel, list) => {
    // Навешиваем событие на кнопку "Удалить"
    btnDel.addEventListener('click', () => {
      // Проходим по таблице, находим элементы с классом delete и показываем их
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    // С помощью делегирования m,eltv кликать по list - это вся наша область таблицы
    list.addEventListener('click', event => {
      const target = event.target // Назначаем переменную, что бы дальне не писать event.target
      // contains используют если кнопка в единственном виде без содержимого 
      // closest используют когда внутри элемента есть еще элемент. Например, внутри кнопки svg
      if (target.closest('.del-icon')) {
      // находим родителя у event.target и удаляем его
        // из localstorage
        removeStorage(target.dataset.phone);
        // из таблицы
        target.closest('.contact').remove();
      }
    });
  };
  // Ф-я принимает contact и list и добавляет contact в list
  const addContactPage = (contact, list) => {
    // добавляет contact в list  с применением ф-и createRow, которая на основе объекта делает строку
    list.append(createRow(contact));
  };

  // Функция обрабатывает форму
  const formControl = (form, list, closeModal) => {
  // Вешаем событе на нажатие кнопки "Добавить" в форме
    form.addEventListener('submit', e => {
      // Убираем стандартную перезагрузку страницы при нажатии на кнопку "добавить"
      e.preventDefault();
      // Создаем FormData и передаем туда форму через e.target
      const formData = new FormData(e.target);
      // Создаем объект, который будет формироваться из введеных пользователем данных в формк=у
      const newContact = Object.fromEntries(formData);
      console.log('newContact:', newContact);
      // Получаем значения полей формы
      // const name = form.querySelector('#name').value;
      // const surname = form.querySelector('#surname').value;
      // const phone = form.querySelector('#phone').value;

      // Вызываем функцию добавления контакта в таблицу на странице
      addContactPage(newContact, list);
      // Вызываем временную функцию добавления контакта в массив
      // addContactData(newContact);
      // Добавляем очистку формы  после того как она отработает
      form.reset();
      // Добавляем закрытие формы  после того как она очистится
      closeModal();
      // Вызываем функцию setStorage, передавая ключ и объект из полей ввода формы
      setStorage('contacts', newContact);
    });
  };

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
