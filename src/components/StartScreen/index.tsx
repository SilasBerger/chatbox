import styles from "./styles.module.scss";

export interface Props {
  onStart: () => void;
}

export default ({onStart}: Props) => {
  return (
    <div class={styles.container} onClick={() => onStart()}>
      <button class={styles.startButton}>START</button>
    </div>
  )
};
