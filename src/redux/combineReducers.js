import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import todoReducer from "../pages/todo/redux/todoReducer";

const reducer = combineReducers({
  todoReducer,
  router: routerReducer
});

export default reducer;
