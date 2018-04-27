import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addTodoItem,
  getTodoList,
  editTodoList,
  deleteTodoItem
} from "./redux/todoAction";
import { Button, Form, Grid, Message, Segment, Table } from "semantic-ui-react";

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

  onUserAction(event, data) {
    const { name, value } = event.target;
    if (data.type == "checkbox") {
      this.setState({ isComplete: data.checked });
      console.log(this.state);
    } else {
      this.setState({ [name]: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    if (this.state.isEditing) {
      console.log(this.state);
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
        <div className="todo-form">
          <style>{`
      body > div,
      body > div > div,
      body > div > div > div.todo-form {
        height: 100%;
      }
    `}</style>
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 700 }}>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    placeholder="Enter the Todo item"
                    onChange={this.onUserAction}
                    type="text"
                    name="todoItem"
                    value={todoItem}
                  />
                  <Button color="teal" fluid size="large">
                    Add
                  </Button>
                </Segment>
              </Form>

              <Table celled striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="3">Todo List</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.todos.map((v, k) => {
                    if (!v.isComplete) {
                      return (
                        <Table.Row key={k}>
                          {this.state.isEditing &&
                          v.id == this.state.editItemId ? (
                            <Table.Cell colspan="3">
                              <Form size="small" onSubmit={this.handleSubmit}>
                                <Form.Input
                                  fluid
                                  placeholder="Enter the Todo item"
                                  onChange={this.onUserAction}
                                  type="text"
                                  name="editItem"
                                  value={this.state.editItem}
                                />
                                <Form.Checkbox
                                  label="Done"
                                  onChange={this.onUserAction}
                                />

                                <Button color="teal" fluid size="large">
                                  Update
                                </Button>
                              </Form>
                            </Table.Cell>
                          ) : (
                            <React.Fragment>
                              <Table.Cell>{v.todoItem}</Table.Cell>
                              <Table.Cell>
                                <Button
                                  color="teal"
                                  onClick={() => this.onEdit(v)}
                                  fluid
                                  size="large"
                                >
                                  Edit
                                </Button>
                              </Table.Cell>
                              <Table.Cell>
                                <Button
                                  color="teal"
                                  onClick={() => this.onDelete(v.id)}
                                  fluid
                                  size="large"
                                >
                                  Delete
                                </Button>
                              </Table.Cell>
                            </React.Fragment>
                          )}
                        </Table.Row>
                      );
                    }
                  })}
                </Table.Body>
              </Table>

              <Table celled striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="3">Todo List</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.todos.map((v, k) => {
                    if (v.isComplete) {
                      return (
                        <Table.Row key={k}>
                          <Table.Cell collapsing>{v.todoItem}</Table.Cell>
                        </Table.Row>
                      );
                    }
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        </div>
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
