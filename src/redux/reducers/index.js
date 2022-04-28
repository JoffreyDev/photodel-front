import { combineReducers } from "redux";
import siteEntities from "./siteEntities";
import userData from "./userData";

const rootReducer = combineReducers({
  siteEntities,
  userData,
});

export default rootReducer;
