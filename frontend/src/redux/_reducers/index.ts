import { combineReducers } from "redux";
import userReducer from "./user_reducer";

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
