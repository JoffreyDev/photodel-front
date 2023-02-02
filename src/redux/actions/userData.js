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
  payload: str,
});

export const openErrorAlert = (str) => ({
  type: "OPEN_ERROR_ALERT",
  payload: str,
});

export const setUserCoords = (coords) => ({
  type: "SET_USER_COORDS",
  payload: coords,
});

export const setNotifications = (obj) => ({
  type: "SET_USER_NOTIFICATIONS",
  payload: obj,
});
