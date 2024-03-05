import createElements from './createElements.js';

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
} = createElements;


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

export default {
  renderPhoneBook,
  renderContacts,
};