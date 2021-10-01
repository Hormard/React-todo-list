import { useState, useEffect } from "react";

import styles from "./TodoList.module.css";
import { Form } from "../Form/Form";
import { ListItem, IListItem } from "../ListItem/ListItem";

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [mainTodos, setMainTodos] = useState([]);

  const refreshTodos = (todo: any) => {
    setTodos(todo);
    setMainTodos(todo);
  };

  useEffect(() => {
    let todo: any = localStorage.getItem("todos") || [];
    if (todo.length !== 0) {
      todo = JSON.parse(todo);
      todo.forEach((el: any) => {
        el.isRedacted = false;
      });
    }

    refreshTodos(todo);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(mainTodos));
  }, [mainTodos]);

  const onClickAdd = (todo: object) => {
    const newTodos: any = [...mainTodos, todo];

    refreshTodos(newTodos);
  };

  const onClickDone = (id: string) => {
    const changedTodos: any = mainTodos.map((todo: any) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });

    refreshTodos(changedTodos);
  };

  const onClickDelete = (id: string) => {
    const filteredTodos: any = mainTodos.filter((item: any) => item.id !== id);

    refreshTodos(filteredTodos);
  };

  const onDoubleClick = (id: string) => {
    const changedTodos: any = mainTodos.map((todo: any) => {
      if (todo.id === id) {
        todo.isSelect = !todo.isSelect;
      }
      return todo;
    });

    refreshTodos(changedTodos);
  };

  const onClickRedacted = (id: string, newText: any) => {
    const changedTodos: any = mainTodos.map((todo: any) => {
      if (todo.id === id) {
        todo.isRedacted = !todo.isRedacted;
        todo.text = newText;
      }
      return todo;
    });
    refreshTodos(changedTodos);
  };

  const deleteSelected = (filteredTodos: []) => {
    refreshTodos(filteredTodos);
  };

  const doneSelected = (filteredTodos: []) => {
    refreshTodos(filteredTodos);
  };

  const showInProgress = (filteredTodos: []) => {
    setTodos(filteredTodos);
  };

  const showDone = (filteredTodos: []) => {
    setTodos(filteredTodos);
  };

  const showAll = (newTodos: []) => {
    setTodos(newTodos);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>One More ToDo</h1>
      <Form
        onClick={onClickAdd}
        onClickdelete={deleteSelected}
        onClickDone={doneSelected}
        onClickInProgress={showInProgress}
        onClickInShowDone={showDone}
        onClickAll={showAll}
        mainTodos={mainTodos}
      />
      <div className={styles.todoList}>
        {todos.map((item: IListItem) => {
          return (
            <ListItem
              key={item.id}
              text={item.text}
              isDone={item.isDone}
              isSelect={item.isSelect}
              isRedacted={item.isRedacted}
              id={item.id}
              onClickDone={onClickDone}
              onClickDelete={onClickDelete}
              onDoubleClick={onDoubleClick}
              onClickRedacted={onClickRedacted}
            />
          );
        })}
      </div>
    </div>
  );
}
