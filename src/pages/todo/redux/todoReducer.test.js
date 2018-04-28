import todoReducer from "./todoReducer";
import { ADD_TODO, GOT_TODO_LIST } from "./todoAction";

describe("Todo Reducer Testing", () => {
  let initialstate = {
    isLoading: false,
    isComplete: false,
    todos: []
  };

  it("Test initialState", () => {
    expect(todoReducer(undefined, {})).toEqual(initialstate);
  });

  it("Test Add Todo", () => {
    expect(
      todoReducer(initialstate, {
        type: ADD_TODO
      })
    ).toEqual(initialstate);
  });

  it("Test Got to do list", () => {
    let payload = [
      {
        id: 3,
        todoItem: "new test",
        isComplete: true
      },
      {
        id: 4,
        todoItem: "New data yes",
        isComplete: true
      },
      {
        todoItem: "as",
        isComplete: false,
        id: 7
      }
    ];

    let shouldReturn = {
      ...initialstate,
      todos: payload,
      isEditing: false
    };

    expect(
      todoReducer(initialstate, {
        type: GOT_TODO_LIST,
        payload
      })
    ).toEqual(shouldReturn);
  });
});
