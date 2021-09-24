import styles from "./ListItem.module.css";
import { useState } from "react";

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
  onChange,
}) {
  const [newText, setText] = useState(text);

  function changeTodo() {
    if (isDone === true && isSelect === true) {
      return styles.selectedDoneContainer;
    } else if (isDone === true && isSelect === false) {
      return styles.doneContainer;
    } else if (isDone === false && isSelect === true) {
      return styles.selectedContainer;
    } else {
      return styles.container;
    }
  }

  function onChangeInput(event) {
    setText(event.target.value);
  }

  return (
    <div onDoubleClick={() => onDoubleClick(id)} className={changeTodo()}>
      <div className={styles.wrap}>
        {isDone === false ? (
          <div className={styles.done} onClick={() => onClickDone(id)}></div>
        ) : (
          <div className={styles.done} onClick={() => onClickDone(id)}>
            &#128504;
          </div>
        )}
        {isRedacted === false ? (
          <div
            className={styles.redact}
            onClick={() => onClickRedacted({ id, newText })}
          >
            &#11140;
          </div>
        ) : (
          <div
            className={styles.redact}
            onClick={() => onClickRedacted({ id, newText })}
          >
            &#11142;
          </div>
        )}
        {isRedacted === false ? (
          <p className={isDone === false ? styles.text : styles.doneText}>
            {text}
          </p>
        ) : (
          <input
            value={newText}
            onChange={onChangeInput}
            className={styles.input}
            placeholder={text}
          />
        )}
      </div>
      <div className={styles.remove} onClick={() => onClickDelete(id)}>
        &#10006;
      </div>
    </div>
  );
}
