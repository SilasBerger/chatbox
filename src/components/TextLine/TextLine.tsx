import {Component} from "solid-js";
import styles from './TextLine.module.css';

export const TextLine: Component = () => {
  return (
    <div class={styles.TextLine}>
      <div class={styles.prefix}>&gt;</div>
      <div>This is the text. It is very long. It goes way beyond just a single line. This is important, since we need to see what happens if the line breaks.</div>
    </div>
  );
}
