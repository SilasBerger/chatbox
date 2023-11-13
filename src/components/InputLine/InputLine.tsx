import {Component} from "solid-js";
import styles from './InputLine.module.css';

export const InputLine = ({onInputEntered}: { onInputEntered: (_: string) => void }) => {

  let currentInput = '';

  const handleKeyPress = (keyboardEvent: KeyboardEvent) => {
    if (keyboardEvent.key == 'Enter') {
      onInputEntered(currentInput);
    }
  };

  const handleInput = (inputEvent: InputEvent) => {
    // currentInput = inputEvent.data;
  };

  return (
    <div class={styles.InputLine}>
      <div class={styles.prefix}>&gt;</div>
      <input type='text' onKeyPress={handleKeyPress} />
    </div>
  );
}
