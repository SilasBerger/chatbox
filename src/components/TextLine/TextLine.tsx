import {Component} from "solid-js";
import styles from './TextLine.module.css';

export const TextLine = ({text}: {text: string}) => {
  return (
    <div class={styles.TextLine}>
      <div class={styles.prefix}>&gt;</div>
      <div>{text}</div>
    </div>
  );
}
