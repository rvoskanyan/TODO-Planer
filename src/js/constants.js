export const lsKeyApp = 'application';

export const SystemConstant = {
  NEW_TASK_ID: 'newTask',
};

export const TypeEvents = {
  RANGE: 'Range',
  ENTER: 'Enter',
};

export const Messages = {
  NO_TASKS: 'Задачи не найдены',
  NO_LISTS: 'Списки задач не найдены',
  ERROR_ID: 'Ошибка идентификатора!',
  ELEMENT_NOT_FOUND: 'Элемент не найден!',
  ERROR_DATA: 'Ошибка данных!',
  NOT_SAVE: 'Элемент не найден, данные не сохранены!',
  ERROR_MIN_LENGTH: 'Ошибка количества символов',
};

export const API_PREFIX = '/api/';
export const SERVER_ADDRESS = 'http://localhost:3000';

export const workers = {
  server: 'server',
  locale: 'locale',
  notFound: 'unknown worker',
};

export const resultMessages = {
  success: 'success',
  error: 'error',
};

export const textContent = {
  titleList: 'Оглавление',
};

export const yandexAuth = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=f7e4fe91e90143bda33360c43fe13b8e';
export const token = /access_token=([^&]+)/.exec(document.location.hash)[1];
