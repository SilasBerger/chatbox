import styles from './styles.module.scss';

export default ({onInputEntered}: { onInputEntered: (_: string) => void }) => {

  const handleKeyPress = (keyboardEvent: KeyboardEvent) => {
    if (keyboardEvent.key == 'Enter') {
      const result = (inputElement as any).value.trim();
      (inputElement as any).value = '';
      onInputEntered(result);
    }
  };

  const inputElement = <input type='text' onKeyPress={handleKeyPress} />;

  return (
    <div class={styles.InputLine}>
      <div class={styles.prefix}>&gt;</div>
      {inputElement}
    </div>
  );
}
