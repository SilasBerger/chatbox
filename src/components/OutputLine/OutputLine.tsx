import {Component} from "solid-js";
import styles from './OutputLine.module.css';

export const OutputLine = ({text}: {text: string}) => {
  return (
    <div class={styles.OutputLine}>
      <div class={styles.prefix}>&gt;</div>
      <div>{text}</div>
    </div>
  );
}
