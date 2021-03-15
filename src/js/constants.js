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
  ERROR_TITLE_BUTTON: 'Неверный формат заголовка кнопки модального окна',
  ERROR_CALLBACK_BUTTON: 'Неверный формат обработчика кнопки модального окна',
};

export const Titles = {
  addList: 'Создать новый TODO-лист',
  addTask: 'Добавить новую задачу',
  toList: 'Вернуться к оглавлению',
  deleteList: 'Удалить TODO-лист',
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

export const deleteModal = {
  title: 'Подтвердите действие',
  okTitle: 'Подтвердить',
  cancelTitle: 'Отменить',
  content: '<p>Вы действительно хотите удалить запись?</p>',
};

export const saveModal = {
  title: 'Выберите действие',
  saveTitle: 'Сохранить',
  backEditTitle: 'Назад к редактированию',
  cancelTitle: 'Отменить изменения',
  content: '<p>Вы покинули поле для редактирования, выберите действие для изменений.</p>',
};

export const typesButton = {
  success: 'success',
  danger: 'danger',
  primary: 'primary',
}

export const maxCharsDeleteWithoutModal = 50;
