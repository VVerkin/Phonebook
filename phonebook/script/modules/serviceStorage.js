
export const getStorage = (key) => {
  // Запрос данных из localStore по ключу и распарсивание полученного объекта
  const localData = JSON.parse(localStorage.getItem(key));
  // Условие, при котором возвращаются данне, а если их нет - пустой массив
  return localData || [];
};
console.log(getStorage());
  // Ф-я получает ключ и объект в виде аргументов и дописывает данные в localStorage
export const setStorage = (key, obj) => {
  // Вызываем ф-ю, которая получает данные из localStorage и возвращает их.
  const newData = getStorage(key);
  // Добавляем данные (объект) в массив
  newData.push(obj);
  // Отправляем данные в localStorage
  localStorage.setItem('contacts', JSON.stringify(newData));
};
  // removeStorage получает в виде аргумента номер телефона, и удаляет контакт из localStorage
export const removeStorage = (phone) => {
  const existingData = getStorage('contacts');
  const updatedData = existingData.filter(contact => contact.phone !== phone);
  localStorage.setItem('contacts', JSON.stringify(updatedData));
};

