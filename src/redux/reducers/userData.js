const initialState = {
  isLoggedIn: false,
  userData: "",
  successAlertMessage: "",
  errorAlertMessage: "",
  userCoords: [55.751574, 37.573856],
  notifications: {},
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      };

    case "OPEN_SUCCESS_ALERT":
      return {
        ...state,
        successAlertMessage: action.payload,
      };

    case "SET_USER_COORDS":
      return {
        ...state,
        userCoords: action.payload,
      };

    case "OPEN_ERROR_ALERT":
      return {
        ...state,
        errorAlertMessage: action.payload,
      };

    case "SET_USER_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      };

    default:
    //nothing
  }
  return state;
};

export default userData;
