import { all } from "redux-saga/effects";
import {
  addTodoWatcher,
  getTodoWatcher,
  editTodoWatcher,
  deleteTodoWatcher
} from "./pages/todo/redux/todoSaga";

export function* rootSaga() {
  yield all([
    addTodoWatcher(),
    getTodoWatcher(),
    editTodoWatcher(),
    deleteTodoWatcher()
  ]);
}
