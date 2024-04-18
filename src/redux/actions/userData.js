function insertInvisibleCharIfNeeded(str) {
  // Список невидимых символов Unicode
  const invisibleChars = ['\u200B', '\u200C', '\u200D', '\u2060', '\uFEFF'];
  const invisibleCharRegex = new RegExp(`[${invisibleChars.join('')}]`);
  
  // Проверяем, есть ли в строке невидимый символ
  if (!invisibleCharRegex.test(str)) {
  // Если нет, добавляем случайный невидимый символ в конец строки
  const randomIndex = Math.floor(Math.random() * invisibleChars.length);
  return str + invisibleChars[randomIndex];
  }
  
  // Если невидимый символ уже есть, возвращаем исходную строку
  return str;
  }

export const toggleIsLoggenIn = (bool) => ({
  type: "TOGGLE_IS_LOGGED_IN",
  payload: bool,
});

export const setUserData = (obj) => ({
  type: "SET_USER_DATA",
  payload: obj,
});

export const openSuccessAlert = (str) => ({
  type: "OPEN_SUCCESS_ALERT",
  payload: insertInvisibleCharIfNeeded(str),
});

export const openErrorAlert = (str) => ({
  type: "OPEN_ERROR_ALERT",
  payload: insertInvisibleCharIfNeeded(str),
});

export const setUserCoords = (coords) => ({
  type: "SET_USER_COORDS",
  payload: coords,
});

export const setNotifications = (obj) => ({
  type: "SET_USER_NOTIFICATIONS",
  payload: obj,
});
