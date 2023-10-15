export const toggleRegModule = (bool) => ({
  type: "TOGGLE_REG_MODULE",
  payload: bool,
});

export const toggleLogModule = (bool) => ({
  type: "TOGGLE_LOG_MODULE",
  payload: bool,
});

export const setProsSpecs = (arr) => ({
  type: "SET_PROS_SPECS",
  payload: arr,
});
export const setPlacesCategories = (arr) => ({
  type: "SET_PLACES_CATEGORIES",
  payload: arr,
});

export const setProsCategories = (arr) => ({
  type: "SET_PROS_CATEGORIES",
  payload: arr,
});

export const setCountries = (arr) => ({
  type: "SET_COUNTRIES",
  payload: arr,
});

export const setLanguages = (arr) => ({
  type: "SET_LANGUAGES",
  payload: arr,
});

export const setDataLoaded = (bool) => ({
  type: "SET_DATA_LOADED",
  payload: bool,
});
