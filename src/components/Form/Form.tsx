import { useState } from "react";
import styles from "./Form.module.css";

function getId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export interface IForm {
  onClick(todo: object): void;
  onClickdelete(todo: object): void;
  onClickDone(todo: object): void;
  onClickInProgress(todo: object): void;
  onClickInShowDone(todo: object): void;
  onClickAll(todo: object): void;
  mainTodos: {
    text: string;
    isDone: boolean;
    isSelect: boolean;
    isRedacted: boolean;
    id: string;
  }[];
}

export function Form({
  onClick,
  onClickdelete,
  onClickDone,
  onClickInProgress,
  onClickInShowDone,
  onClickAll,
  mainTodos,
}: IForm) {
  const [text, setText] = useState("");

  const getInProgress = () => {
    const filteredTodos = mainTodos.filter((item) => item.isDone === false);
    return filteredTodos.length;
  };

  const getDone = () => {
    const filteredTodos = mainTodos.filter((item) => item.isDone === true);
    return filteredTodos.length;
  };

  const onClickAdd = () => {
    if (text === "") {
      alert("Enter something");
    } else {
      const todo = {
        text: text,
        isDone: false,
        isSelect: false,
        isRedacted: false,
        id: getId(),
      };
      onClick(todo);
      setText("");
    }
  };

  const onChangeInput = (event: any) => {
    setText(event.target.value);
  };

  const deleteSelected = () => {
    const filteredTodos = mainTodos.filter((item) => item.isSelect === false);
    onClickdelete(filteredTodos);
  };

  const doneSelected = () => {
    const filteredTodos = mainTodos.map((item) => {
      if (item.isSelect === true) {
        item.isDone = true;
        item.isSelect = false;
      }
      return item;
    });
    onClickDone(filteredTodos);
  };

  const showInProgress = () => {
    const filteredTodos = mainTodos.filter((item) => item.isDone === false);
    onClickInProgress(filteredTodos);
  };

  const showDone = () => {
    const filteredTodos = mainTodos.filter((item) => item.isDone === true);
    onClickInShowDone(filteredTodos);
  };

  const showAll = () => {
    const newTodos = mainTodos;

    onClickAll(newTodos);
  };

  const checkIsSelected = () => {
    return mainTodos.some((el) => el.isSelect);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.contaiiner}>
        <input
          value={text}
          className={styles.input}
          onChange={onChangeInput}
          placeholder="what are we doing  ?"
        />
        <button className={styles.button} onClick={onClickAdd}>
          Add
        </button>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={showAll}>
          Show All ({mainTodos.length})
        </button>
        <button className={styles.button} onClick={showInProgress}>
          Show in progress ({getInProgress()})
        </button>
        <button className={styles.button} onClick={showDone}>
          Show done ({getDone()})
        </button>
      </div>
      {checkIsSelected() ? (
        <div className={styles.buttons}>
          <button className={styles.button} onClick={doneSelected}>
            Done Selected
          </button>
          <button className={styles.button} onClick={deleteSelected}>
            Delete Selected
          </button>
        </div>
      ) : null}
    </div>
  );
}
