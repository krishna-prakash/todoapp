import { fromJS, List, Map } from "immutable";
import {
  ADD_TODO,
  GOT_TODO_LIST,
  ADDED_TODO,
  EDIT_TODO_SUCCESS
} from "./todoAction";

var initialstate = {
  isLoading: false,
  isComplete: false,
  todos: []
};

export default function todoReducer(state = initialstate, action) {
  switch (action.type) {
    case ADD_TODO: {
      return state;
    }
    case ADDED_TODO: {
      return state;
    }
    case GOT_TODO_LIST: {
      state = {
        ...state,
        todos: action.payload,
        isEditing: false
      };
      console.log(state);
      return state;
    }
    default:
      return state;
  }
  return state;
}
