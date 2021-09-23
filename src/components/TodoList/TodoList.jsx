import React from "react";

import styles from "./TodoList.module.css";
import { Form } from "../Form/Form";
import { ListItem } from "../ListItem/ListItem";

export class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      mainTodos: [],
    };
  }

  onClickAdd = (todo) => {
    const newTodos = [...this.state.mainTodos, todo];

    this.setState({ todos: newTodos, mainTodos: newTodos });
  };

  onClickDone = (id) => {
    const changedTodos = this.state.mainTodos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });

    this.setState({
      todos: changedTodos,
      mainTodos: changedTodos,
    });
  };

  onClickDelete = (id) => {
    const filteredTodos = this.state.mainTodos.filter((item) => item.id !== id);

    this.setState({ todos: filteredTodos, mainTodos: filteredTodos });
  };

  onDoubleClick = (id) => {
    const changedTodos = this.state.mainTodos.map((todo) => {
      if (todo.id === id) {
        todo.isSelect = !todo.isSelect;
      }
      return todo;
    });

    this.setState({
      todos: changedTodos,
      mainTodos: changedTodos,
    });
  };

  deleteSelected = (filteredTodos) => {
    this.setState({ todos: filteredTodos, mainTodos: filteredTodos });
  };

  doneSelected = (filteredTodos) => {
    this.setState({ todos: filteredTodos, mainTodos: filteredTodos });
  };

  showInProgress = (filteredTodos) => {
    this.setState({ todos: filteredTodos });
  };

  showDone = (filteredTodos) => {
    this.setState({ todos: filteredTodos });
  };

  showAll = (newTodos) => {
    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>One More ToDo</h1>
        <Form
          onClick={this.onClickAdd}
          mainTodos={this.state.mainTodos}
          onClickdelete={this.deleteSelected}
          onClickDone={this.doneSelected}
          onClickInProgress={this.showInProgress}
          onClickInShowDone={this.showDone}
          onClickAll={this.showAll}
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
