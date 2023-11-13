import {Component} from "solid-js";
import styles from './OutputLine.module.css';

export const OutputLine = ({text, isUser}: {text: string, isUser: boolean}) => {
  return (
    <div classList={{[styles.OutputLine]: true, [styles.byUser]: isUser}}>
      <div class={styles.prefix}>&gt;</div>
      <div>{text}</div>
    </div>
  );
}
