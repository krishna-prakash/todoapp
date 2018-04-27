import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addTodoItem,
  getTodoList,
  editTodoList,
  deleteTodoItem
} from "./redux/todoAction";
import TaskList from "./../../components/taskList";

class TodoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoItem: "",
      todos: []
    };

    this.onUserAction = this.onUserAction.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    this.props.getTodoList();
  }

  componentWillReceiveProps(props) {
    this.setState({
      isEditing: props.isEditing
    });
  }

  onUserAction(event) {
    const { name, value } = event.target;
    if (event.target.name == "isComplete") {
      this.setState({ isComplete: event.target.checked });
    } else {
      this.setState({ [name]: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.isEditing) {
      const { editItemId, editItem, isComplete } = this.state;
      this.props.editTodoList({ editItemId, editItem, isComplete });
    } else {
      this.props.addTodoItem({
        todoItem: this.state.todoItem,
        isComplete: this.props.isComplete
      });
    }
  }

  onEdit(editedTodo) {
    this.setState({
      isEditing: true,
      editItemId: editedTodo.id,
      editItem: editedTodo.todoItem
    });
  }

  onDelete(deleteTodoId) {
    this.props.deleteTodoItem(deleteTodoId);
  }

  render() {
    console.log(this.props);
    const { todoItem } = this.state;
    const { isComplete } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Todo</label>
          <input
            onChange={this.onUserAction}
            type="text"
            name="todoItem"
            value={todoItem}
          />
          <button>Submit</button>
        </form>

        <table>
          <tbody>
            {this.props.todos.map((v, k) => {
              var editTodoItem = v.todoItem;
              return (
                <tr key={k}>
                  {this.state.isEditing &&
                  v.id == this.state.editItemId &&
                  v.isComplete ? (
                    <td>
                      <form onSubmit={this.handleSubmit}>
                        <input
                          onChange={this.onUserAction}
                          type="text"
                          name="editItem"
                          value={this.state.editItem}
                        />
                        <input
                          onChange={this.onUserAction}
                          type="checkbox"
                          name="isComplete"
                        />
                        <label>Completed</label>
                        <button>Update</button>
                      </form>
                    </td>
                  ) : (
                    <div>
                      <td />
                      <td>{v.todoItem}</td>
                      <td>
                        <button onClick={() => this.onEdit(v)}>edit</button>
                      </td>
                      <button onClick={() => this.onDelete(v.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        <table>
          <thead>
            <th>Completed Items</th>
          </thead>
          <tbody>
            {this.props.todos.map((v, k) => {
              return (
                <tr key={k}>
                  <td>{v.todoItem}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <TaskList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todoReducer.todos,
  isEditing: state.todoReducer.isEditing,
  isComplete: state.todoReducer.isComplete
});

const mapActionToProps = dispatch => {
  return bindActionCreators(
    {
      addTodoItem,
      getTodoList,
      editTodoList,
      deleteTodoItem
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapActionToProps)(TodoPage);
