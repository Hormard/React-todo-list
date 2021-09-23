import styles from "./ListItem.module.css";

export function ListItem({
  text,
  id,
  isDone,
  isSelect,
  onClickDone,
  onClickDelete,
  onDoubleClick,
}) {
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
        <p className={isDone === false ? styles.text : styles.doneText}>
          {text}
        </p>
      </div>
      <div className={styles.remove} onClick={() => onClickDelete(id)}>
        &#10006;
      </div>
    </div>
  );
}
