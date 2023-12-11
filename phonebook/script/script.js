'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

/*Создаем свою область видимости, 
чтобы ничего не выходило в глобальную область, 
кроме того, что необходимо вынести*/

{  //Ф-я создает контейнер
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
//Добавляем в форму кнопки, которые достаем из массива btns
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
      {
        className: 'btn btn-primary mr-3', // класс кнопки 1. mr-3 отступ по bootstrap
        type: 'button', // тип кнопки 1
        text: 'Добавить', // текст кнопки 1
      },
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
    // Вызываем форму
    const form = createForm();
    // Добавляем кнопки,таблицу и оверлай в main
    main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);
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
      btnAdd: buttonGroup.btns[0],
      formOverlay: form.overlay,
    };
  };
// Ф-я создает строку на основе данных из объекта. Можно так:   const createRow = dataObj, но лучше через деструктуризацию
   // В скобках сразу проводим деструктуризацию
  const createRow = ({name: firstName, surname, phone}) => { // Переименовываем name в firatName, т.к. в глобальной области видимости уже есть name 
  // Создаем строку
  const tr = document.createElement('tr');

// Создаем ячейки
    // в tdDel данных нет, есть кнопка. 
    const tdDel = document.createElement('td');
    // Кнопки изначально скрыты, поэтому назначаем им класс delete
    tdDel.classList.add('delete');
    // Создаем кнопку
    const buttonDel = document.createElement('button');
    //Появившиеся кнопки оформляем подготовленным классом
    buttonDel.classList.add('del-icon');
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
    // В tdPhone дщбавляем нашу ссылку
    tdPhone.append(phoneLink);

    // Вставляем td в tr
    tr.append(tdDel, tdName, tdSurname, tdPhone);
    // Возвращаем получившуюся строку
    return tr;
  };
  // Ф-я принимает элемент и массив с объектами
  const renderContacts = (elem, data) => {
    // Создаем элементы перебирая массив с объектами
    const allRow = data.map(createRow);
    // выводим результат на страницу
    elem.append(...allRow);

    return allRow;
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

 // Ф-я, конорая инициализирует наше приложение
  const init = (selectorApp, title) => {
    // Получим элемент по селектору и передадим в ф-ю render
    const app = document.querySelector(selectorApp);
    // Вызываем основную функцию и передаем в нее app и title
    const phoneBook = renderPhoneBook(app, title);
    // Выполним деструктуризацию list из phoneBook
    const {list, logo, btnAdd, formOverlay} = phoneBook;

    // Функционал
    //В ф-ю передаем list в чистом виде после деструктуризации и data
    const allRow = renderContacts(list, data);
    // Вызываем функцию, передаем allRow и logo?  иначе не сможем с ними взаимодействовать
    hoverRow(allRow, logo);
    // При клике на кнопку "Добавить" открывается модальное окно
    // Создадим объект
    const objEvent = {
      handleEvent() {
        formOverlay.classList.add('is-visible');
      },
    };
    btnAdd.addEventListener('click', objEvent);
  };

  window.phoneBookInit = init;
}