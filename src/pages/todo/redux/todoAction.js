export const ADD_TODO = "add_todo";
export const ADDED_TODO = "added_todo";
export const GET_TODO_LIST = "get_todo_list";
export const GOT_TODO_LIST = "got_todo_list";
export const EDIT_TODO_LIST = "edit_todo_list";
export const DELETE_TODO_ITEM = "delete_todo_item";

export function addTodoItem(payload) {
  return {
    type: ADD_TODO,
    payload
  };
}

export function addedTodo() {
  return {
    type: ADDED_TODO
  };
}

export function getTodoList() {
  return {
    type: GET_TODO_LIST
  };
}

export function gotTodoList(todoList) {
  return {
    type: GOT_TODO_LIST,
    payload: todoList
  };
}

export function editTodoList(payload) {
  return {
    type: EDIT_TODO_LIST,
    payload: {
      id: payload.editItemId,
      todoItem: payload.editItem,
      isComplete: payload.isComplete
    }
  };
}

export function deleteTodoItem(id) {
  return {
    type: DELETE_TODO_ITEM,
    id
  };
}
