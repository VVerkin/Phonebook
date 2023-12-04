'use strict';

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
   // Ф-я добавляет логотип
  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

const createMain = () => {
  const main = document.createElement('main');
  const mainContainer = createContainer();
  main.append(mainContainer);
  main.mainContainer = mainContainer;

  return main;
};


  // Ф-я, конорая инициализирует наше приложение
  const init = (selectorApp, title) => {
    // Получим элемент по селектору
    const app = document.querySelector(selectorApp);
    // Создаем хедер страницы
    const header = createHeader();
    // Добавляем лого в хедер
    const logo = createLogo(title);
    // Добавляем лого в хедер
    header.append(logo);
    // Добавляем header на страницу
    app.apend(header);
  };

  window.phoneBookInit = init;
}