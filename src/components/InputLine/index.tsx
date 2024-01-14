import styles from './styles.module.scss';
import {Accessor, createEffect} from "solid-js";

interface Props {
  onInputEntered: (_: string) => void,
  active: Accessor<boolean>;
}

export default ({onInputEntered, active}: Props) => {

  const handleKeyPress = (keyboardEvent: KeyboardEvent) => {
    if (keyboardEvent.key == 'Enter') {
      const result = (inputElement as any).value.trim();
      (inputElement as any).value = '';
      onInputEntered(result);
    }
  };

  const inputElement = <input type='text' onKeyPress={handleKeyPress} />;
  createEffect(() => {
    if (active()) {
      (inputElement as HTMLInputElement).focus();
    }
  })

  return (
    <div class={styles.InputLine}>
      <div class={styles.prefix}>&gt;</div>
      {inputElement}
    </div>
  );
}
