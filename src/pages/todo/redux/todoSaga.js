import { takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { push } from "react-router-redux";
import axios from "axios";
import { getTodoList, gotTodoList, addedTodo } from "./todoAction";
import { getApiCall } from "./../../../utils/api";

import {
  ADD_TODO,
  GET_TODO_LIST,
  GOT_TODO_LIST,
  EDIT_TODO_LIST,
  DELETE_TODO_ITEM
} from "./todoAction";

function* addTodoWorker({ payload }) {
  try {
    const res = yield axios.post("http://localhost:3001/todoList/", payload);
    yield put(getTodoList());
  } catch (e) {
    console.log(e);
  }
}

export function* getTodoWorker() {
  try {
    const res = yield call(getApiCall, ["http://localhost:3001/todoList/"]);
    yield put(gotTodoList(res.data));
  } catch (e) {
    console.log(e);
  }
}

export function* editTodoWorker({ payload }) {
  try {
    const res = yield axios.put(
      "http://localhost:3001/todoList/" + payload.id,
      payload
    );
    yield put(getTodoList());
  } catch (e) {
    console.log(e);
  }
}

export function* deleteTodoWorker({ id }) {
  try {
    console.log(id);
    const res = yield axios.delete("http://localhost:3001/todoList/" + id);
    yield put(getTodoList());
  } catch (e) {
    console.log(e);
  }
}

export function* addTodoWatcher() {
  yield takeEvery(ADD_TODO, addTodoWorker);
}

export function* getTodoWatcher() {
  yield takeLatest(GET_TODO_LIST, getTodoWorker);
}

export function* editTodoWatcher() {
  yield takeLatest(EDIT_TODO_LIST, editTodoWorker);
}

export function* deleteTodoWatcher() {
  yield takeLatest(DELETE_TODO_ITEM, deleteTodoWorker);
}
