import {JSX} from "solid-js";
import styles from './InputLine.module.css';

export const InputLine = ({onInputEntered}: { onInputEntered: (_: string) => void }) => {

  const handleKeyPress = (keyboardEvent: KeyboardEvent) => {
    if (keyboardEvent.key == 'Enter') {
      const result = (inputElement as any).value.trim();
      (inputElement as any).value = '';
      onInputEntered(result);
    }
  };

  const inputElement: JSX.Element = <input type='text' onKeyPress={handleKeyPress} />;

  return (
    <div class={styles.InputLine}>
      <div class={styles.prefix}>&gt;</div>
      {inputElement}
    </div>
  );
}
