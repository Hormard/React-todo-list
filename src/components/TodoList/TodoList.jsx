import React from "react";

import styles from "./TodoList.module.css";
import { Form } from "../Form/Form";
import { ListItem } from "../ListItem/ListItem";

export class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }

  onClickAdd = (todo) => {
    const newTodos = [...this.state.todos, todo];

    this.setState({ todos: newTodos });
  };

  onClickDone = (id) => {
    const changedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });

    this.setState({
      todos: changedTodos,
    });
  };

  onClickDelete = (id) => {
    const filteredTodos = this.state.todos.filter((item) => item.id !== id);

    this.setState({ todos: filteredTodos });
  };

  onDoubleClick = (id) => {
    const changedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.isSelect = !todo.isSelect;
      }
      return todo;
    });

    this.setState({
      todos: changedTodos,
    });
  };

  deleteSelected = (filteredTodos) => {
    this.setState({ todos: filteredTodos });
  };

  doneSelected = (filteredTodos) => {
    this.setState({ todos: filteredTodos });
  };

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>One More ToDo</h1>
        <Form
          onClick={this.onClickAdd}
          todos={this.state.todos}
          onClickdelete={this.deleteSelected}
          onClickDone={this.doneSelected}
        />
        <div className={styles.todoList}>
          {this.state.todos.map((item) => {
            return (
              <ListItem
                key={item.id}
                text={item.text}
                isDone={item.isDone}
                isSelect={item.isSelect}
                id={item.id}
                onClickDone={this.onClickDone}
                onClickDelete={this.onClickDelete}
                onDoubleClick={this.onDoubleClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
