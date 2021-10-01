import styles from "./ListItem.module.css";
import { useState } from "react";

export interface IListItem {
  text: string;
  id: string;
  isDone: boolean;
  isSelect: boolean;
  isRedacted: boolean;
  onClickDone(id: string): void;
  onClickDelete(id: string): void;
  onDoubleClick(id: string): void;
  onClickRedacted(id: string, newText: any): void;
}

export function ListItem({
  text,
  id,
  isDone,
  isSelect,
  isRedacted,
  onClickDone,
  onClickDelete,
  onDoubleClick,
  onClickRedacted,
}: IListItem) {
  const [newText, setText] = useState(text);

  function changeTodo() {
    if (isDone && isSelect) {
      return styles.selectedDoneContainer;
    } else if (isDone && isSelect === false) {
      return styles.doneContainer;
    } else if (isDone === false && isSelect) {
      return styles.selectedContainer;
    } else {
      return styles.container;
    }
  }

  function pressEnter(event: any) {
    if (event.key === "Enter") {
      return onClickRedacted(id, newText);
    }
  }

  function onChangeInput(event: any) {
    setText(event.target.value);
  }

  return (
    <div onDoubleClick={() => onDoubleClick(id)} className={changeTodo()}>
      <div className={styles.wrap}>
        {isDone ? (
          <div className={styles.done} onClick={() => onClickDone(id)}>
            &#128504;
          </div>
        ) : (
          <div className={styles.done} onClick={() => onClickDone(id)}></div>
        )}
        <div
          className={styles.redact}
          onClick={() => onClickRedacted(id, newText)}
        >
          {isRedacted === false ? "⮄" : `⮆`}
        </div>
        {isRedacted ? (
          <input
            onKeyDown={(event) => pressEnter(event)}
            value={newText}
            onChange={onChangeInput}
            className={styles.input}
            placeholder={text}
          />
        ) : (
          <p className={isDone === false ? styles.text : styles.doneText}>
            {text}
          </p>
        )}
      </div>
      <div className={styles.remove} onClick={() => onClickDelete(id)}>
        &#10006;
      </div>
    </div>
  );
}
