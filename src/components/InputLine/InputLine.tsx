import {Component} from "solid-js";
import styles from './InputLine.module.css';

export const InputLine = () => {
  return (
    <div class={styles.InputLine}>
      <div class={styles.prefix}>&gt;</div>
      <input type='text'/>
    </div>
  );
}
