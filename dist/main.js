(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

const {
  createRow,
} = require('./createElements');

const {
  setStorage,
  removeStorage,
} = require('./serviceStorage');

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

module.exports = {
  modalControl,
  deleteControl,
  formControl,
};


},{"./createElements":2,"./serviceStorage":4}],2:[function(require,module,exports){
'use strict';

//Ф-я создает контейнер
const createContainer = () => {
  // Создаем эл-т div
  const container = document.createElement('div');
  // Назначаем контейнеру класс .container
  container.classList.add('container');
  // Возвращаем получившийся контейнер
  return container;
};
  
// Ф-я в верстке формирует эл-т хедер и возвращает его
const createHeader = () => {
  // Создаем эл-т хедер
  const header = document.createElement('header');
  // Элементу хедер добавляем класс header
  header.classList.add('header');
  // Все эл-ты в хедер вставляются в контейнер. Поэтому контейнер привяжем к элементу как свойство объекта 
  // Создаем контейнер
  const headerContainer = createContainer();
  // Вставляем контейнер в хедер
  header.append(headerContainer);
  // Привязываем headerContainer к header
  header.headerContainer = headerContainer;
  // Возвращаем header
  return header;
};

// Ф-я добавляет логотип в виде загловка
const createLogo = title => {
  // Создаем в верстке эл-т h1
  const h1 = document.createElement('h1');
  // Присваиваем эл-ту класс logo
  h1.classList.add('logo');
  // Добавляем содержимое в заголовок
  h1.textContent = `Телефонный справочник. ${title}`;

  return h1;
};
// Создадим ф-ю main
const createMain = () => {
  const main = document.createElement('main');
  // Создаем контейнер для main
  const mainContainer = createContainer();
  // Вставляем контейнер
  main.append(mainContainer);
  // Добавим такое же св-во как у хедер, что бы можно было вставлять в него элементы
  main.mainContainer = mainContainer;
  
  return main;
};
  
// Ф-я создает кнопки, принимает массив params, в котором может быть несколько кнопок
const createButtonsGroup = params => {
  // Создаем обертку для кнопок
  const btnWrapper = document.createElement('div');
  // Добавляем класс для обертки
  btnWrapper.classList.add('btn-wrapper');
  //params - массив, перебераем его с помощью map
  //map передаем данные, на основе которых будут получаться кнопки
  //в скобках деструктурируем className, type, text
  const btns = params.map(({className, type, text}) => {
    // Создаем сами кнопки
    const button = document.createElement('button');
    // Заполняем кнопки данными
    button.type = type;
    button.textContent = text;
    button.className = className;
    // Возвращаем получившуюся кнопку
    return button;
  });
  // Вставляем btns в btnWrapper
  btnWrapper.append(...btns); // Т.к. мы не можем вставить массив в обертку,
                            // мы раскладываем его с помощью спред-оператора
  
  return {
    btnWrapper,
    btns,
  };
};
  
//Ф-я создает таблицу
const createTable = () => {
  const table = document.createElement('table');
  // Назначаем классы по bootstrap
  table.classList.add('table', 'table-striped');
  // Создаем thead для заголовков таблицы
  const thead = document.createElement('thead');
  // Вставляем верстку шапки таблицы
  thead.insertAdjacentHTML('beforeend', `
    <tr> 
    <th class="delete">Удалить</th>
    <th>Имя</th>
    <th>Фамилия</th>
    <th>Телефон</th>
    </tr>
    `); // class="delete" - делает элемент скрытым
  
  // Создаем тело таблицы
  const tbody = document.createElement('tbody');
  // tbody ничего не содержит, поэтому просто вставляем в таблицу
  table.append(thead, tbody); // Важен порядок вставки
  // Что бы не возвращать tbody как объект, в сам элемент table добавим свойство tbody (как в контейнер)
  table.tbody = tbody;
  
  return table;
};
  
// Ф-я зоздает форму для добавления данных
const createForm = () => {
  // Почти все формы в модальном окне, поэтому создадим overlay для модального окна
  const overlay = document.createElement('div');
  // Задаем класс 
  overlay.classList.add('form-overlay');
  // Создаем форму
  const form = document.createElement('form');
  // Добавляем класс форме
  form.classList.add('form');
  // Форма статичная, поэтому просто вставляем верстку
  form.insertAdjacentHTML('beforeend', `
    <button class ="close" type="button"></button>
    <h2 class="form-title">Добавить контакт</h2>
    <div class = "form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" id="name" type="text" required>
    </div>
    <div class = "form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" id="surname" type="text" required>
    </div>
    <div class = "form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" id="phone" type="number" required>
    </div>
    `);
  // Добавляем кнопки в форму
  const buttonGroup = createButtonsGroup ([
    {
      className: 'btn btn-primary mr-3', // класс кнопки 1. mr-3 отступ по bootstrap
      type: 'submit', // тип кнопки 1
      text: 'Добавить', // текст кнопки 1
    },
    {
      className: 'btn btn-danger', // класс кнопки 2
      type: 'reset', // тип кнопки 2
      text: 'Отмена', // текст кнопки 2
    },
  ]);
  // Добавляем в форму кнопки, которые достаем из массива btns
  form.append(...buttonGroup.btns);
  // Добавляем форму в overlay
  overlay.append(form);
  // Можно вернуть кнопки, что бы можно было навешать на них события, но у нас это не требуется.
  // Мы вернем overlay и форму
  return {
    overlay,
    form,
  };
};
  
// Ф-я создает футер
const createFooter = () => {
  // Создаем эл-т футер
  const footer = document.createElement('footer');
  // Элементу footer добавляем класс footer
  footer.classList.add('footer');
  // Все эл-ты в хедер вставляются в контейнер. Поэтому контейнер привяжем к элементу как свойство объекта 
  // Создаем контейнер
  const footerContainer = createContainer();
  // Вставляем контейнер в footer
  footer.append(footerContainer);
  // Привязываем footerContainer к footer
  footer.footerContainer = footerContainer;
  // Возвращаем footer
  return footer;
};
//Ф-я принимает title и зоздает контент, который поместим в footer
const createCopyRight = title => {
  // Создаем в верстке эл-т для текста
  const copyRight = document.createElement('p');
  // Добавляем текст в элемент для текста
  copyRight.textContent = `Все права защищены ©${title}`;
  // Возвращаем получившуюся строку
  return copyRight;
};

// Ф-я создает строку на основе данных из объекта. Можно так:   const createRow = dataObj, но лучше через деструктуризацию
// В скобках сразу проводим деструктуризацию
const createRow = ({name: firstName, surname, phone}) =>  {// Переименовываем name в firatName, т.к. в глобальной области видимости уже есть name 
  // Создаем строку
  const tr = document.createElement('tr');
  // Назначасем класс contact, т.к. записываем контакты людей
  tr.classList.add('contact');
  // Создаем ячейки
  // в tdDel данных нет, есть кнопка. 
  const tdDel = document.createElement('td');
  // Кнопки изначально скрыты, поэтому назначаем им класс delete
  tdDel.classList.add('delete');
  // Создаем кнопку
  const buttonDel = document.createElement('button');
  //Появившиеся кнопки оформляем подготовленным классом
  buttonDel.classList.add('del-icon');
  // Добавляем атрибут data-phone
  buttonDel.dataset.phone = phone;
  //в ячейку tdDel вставляем кнопку
  tdDel.append(buttonDel);
  // Оформляем омтальные элементы
  const tdName = document.createElement('td');
  tdName.textContent = firstName; // В качестве контента берем деструктурированные данные
  const tdSurname = document.createElement('td');
  tdSurname.textContent = surname; // В качестве контента берем деструктурированные данные
  const tdPhone = document.createElement('td');
  //Создаем ссылку, что бы клике на телефон открывалась звонилка
  const phoneLink = document.createElement('a');
  phoneLink.href = `tel:${phone}`;
  phoneLink.textContent = phone; // В качестве контента берем деструктурированные данные
  tr.phoneLink = phoneLink;
  // В tdPhone добавляем нашу ссылку
  tdPhone.append(phoneLink);

  // Вставляем td в tr
  tr.append(tdDel, tdName, tdSurname, tdPhone);
  // Возвращаем получившуюся строку
  return tr;
};

// Ф-я, которая при наведении на строку с номером телефона показывает его в хедере
const hoverRow = (allRow, logo) => {
  // У logo в замыкании будем хранить текст? который был изначально
  const text = logo.textContent;
  // Перебираем все строки
  allRow.forEach(contact => {
    // При наведении мыши на строку будем вызывать функцию,
    contact.addEventListener('mouseenter', () => {
      // Которая в консоль будет передавать mouseEnter
      // У logo будет меняться содержимое
      logo.textContent = contact.phoneLink.textContent;
    });
    // При отведении мыши от строки будем возвращать исходный текст
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

module.exports = {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createCopyRight,
  createRow,
  hoverRow,
};

},{}],3:[function(require,module,exports){
'use strict';

const {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createCopyRight,
  createRow,
} = require('./createElements');


// Основная функция
const renderPhoneBook = (app, title) => {
  // Создаем хедер страницы
  const header = createHeader();
  // Добавляем заголовок
  const logo = createLogo(title);
  // Принимаем main
  const main = createMain();
  // Принимаем кнопки
  // в скобках указываем параметры, которые будем передавать в params.map({})
  const buttonGroup = createButtonsGroup([
    // Кнопка Добавить
    {
      className: 'btn btn-primary mr-3 js-add', // класс кнопки 1. mr-3 отступ по bootstrap
      type: 'button', // тип кнопки 1
      text: 'Добавить', // текст кнопки 1
    },
    // Кнопка Удалить
    {
      className: 'btn btn-danger', // класс кнопки 2
      type: 'button', // тип кнопки 2
      text: 'Удалить', // текст кнопки 2
    },
  ]);
  // Вызов функции создания таблицы
  const table = createTable();
    // Вызов ф-ии, создания футера
  const footer = createFooter();
  const copyRight = createCopyRight(title);
  // Получаем объект, который деструктурируем на form и overlay.
  // Таким образом мы сможем сразу использовать данные идентификаторы
  const {form, overlay} = createForm();
  // Добавляем кнопки,таблицу и оверлай в main
  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
  // Добавляем добавляем заголовок в контейнер хедера
  header.headerContainer.append(logo);
  // Добавляем элементы header, main и footer на страницу, в которые мы сможем добавлять содержимое
  footer.footerContainer.append(copyRight);
  app.append(header, main, footer);

  // Основная функция возвращает объект с необходимыми нам элементами
  return {
    //tbody можно вывести только черерез свойство лист в объекте
    list: table.tbody,
    logo,
    // Возвращаем кнопку добавить
    btnAdd: buttonGroup.btns[0],
    // Возвращаем кнопку "Удалить"
    btnDel: buttonGroup.btns[1],
    formOverlay: overlay,
    form,
  };
};

// Ф-я принимает элемент и массив с объектами
const renderContacts = (elem, data) => {
  // Создаем элементы перебирая массив с объектами
  const allRow = data.map(createRow);
  // выводим результат на страницу
  elem.append(...allRow);

  return allRow;
};

module.exports = {
  renderPhoneBook,
  renderContacts,
};

},{"./createElements":2}],4:[function(require,module,exports){
'use strict';

/* Ф-я получает в виде аргумента ключ и по нему запрашивает 
данные из localStorage и возвращает их, если их нет то возвращает пустой массив */
const getStorage = (key) => {
  // Запрос данных из localStore по ключу и распарсивание полученного объекта
  const localData = JSON.parse(localStorage.getItem(key));
  // Условие, при котором возвращаются данне, а если их нет - пустой массив
  return localData || [];
};
console.log(getStorage());
  // Ф-я получает ключ и объект в виде аргументов и дописывает данные в localStorage
const setStorage = (key, obj) => {
  // Вызываем ф-ю, которая получает данные из localStorage и возвращает их.
  const newData = getStorage(key);
  // Добавляем данные (объект) в массив
  newData.push(obj);
  // Отправляем данные в localStorage
  localStorage.setItem('contacts', JSON.stringify(newData));
};
  // removeStorage получает в виде аргумента номер телефона, и удаляет контакт из localStorage
const removeStorage = (phone) => {
  const existingData = getStorage('contacts');
  const updatedData = existingData.filter(contact => contact.phone !== phone);
  localStorage.setItem('contacts', JSON.stringify(updatedData));
};

module.exports = {
	getStorage,
  setStorage,
	removeStorage,
};

},{}],5:[function(require,module,exports){
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
const {
  modalControl,
  deleteControl,
  formControl,
} = require('./modules/control');

const {
  hoverRow,
} = require('./modules/createElements');

const {
  renderPhoneBook,
  renderContacts,
} = require('./modules/render');

const {
  getStorage,
} = require('./modules/serviceStorage');

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

},{"./modules/control":1,"./modules/createElements":2,"./modules/render":3,"./modules/serviceStorage":4}]},{},[5]);
