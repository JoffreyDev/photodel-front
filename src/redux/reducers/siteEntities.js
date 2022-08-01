const initialState = {
  logModuleActive: false,
  regModuleActive: false,
  prosSpecs: null,
  prosCategories: null,
  countries: null,
  languages: null,
  isLoaded: false,
};

const siteEntities = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_LOG_MODULE":
      return {
        ...state,
        logModuleActive: action.payload,
      };

    case "TOGGLE_REG_MODULE":
      return {
        ...state,
        regModuleActive: action.payload,
      };

    case "SET_PROS_SPECS":
      return {
        ...state,
        prosSpecs: action.payload,
      };

    case "SET_PROS_CATEGORIES":
      return {
        ...state,
        prosCategories: action.payload,
      };

    case "SET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };

    case "SET_LANGUAGES":
      return {
        ...state,
        languages: action.payload,
      };

    case "SET_DATA_LOADED":
      return {
        ...state,
        isLoaded: action.payload,
      };

    default:
    //nothing
  }
  return state;
};

export default siteEntities;
