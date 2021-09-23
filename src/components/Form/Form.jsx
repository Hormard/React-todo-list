import { useState } from "react";
import styles from "./Form.module.css";

function getId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export function Form({
  onClick,
  onClickdelete,
  onClickDone,
  onClickInProgress,
  onClickInShowDone,
  onClickAll,
  mainTodos,
}) {
  const [text, setText] = useState("");

  const onClickAdd = () => {
    const todo = {
      text: text,
      isDone: false,
      isSelect: false,
      id: getId(),
    };
    onClick(todo);
    setText("");
  };

  const onChangeInput = (event) => {
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
          Show All
        </button>
        <button className={styles.button} onClick={showInProgress}>
          Show in progress
        </button>
        <button className={styles.button} onClick={showDone}>
          Show done
        </button>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={doneSelected}>
          Done Selected
        </button>
        <button className={styles.button} onClick={deleteSelected}>
          Delete Selected
        </button>
      </div>
    </div>
  );
}
