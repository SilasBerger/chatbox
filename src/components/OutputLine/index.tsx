import styles from './styles.module.scss';
import {createSignal} from "solid-js";

interface Props {
  text?: string,
  isUser: boolean,
}

export default ({text, isUser}: Props) => {

  const [displayedText, setDisplayedText] = createSignal<string>(text ?? '');
  if (!text) {
    createTypingAnimation();
  }

  function createTypingAnimation() {
    setInterval(() => {
      const currentText = displayedText();
      if (currentText === '...') {
        setDisplayedText('');
      } else {
        setDisplayedText(`${currentText}.`);
      }
    }, 500);
  }

  return (
    <div classList={{[styles.OutputLine]: true, [styles.byUser]: isUser}}>
      <div class={styles.prefix}>&gt;</div>
      <div>{displayedText()}</div>
    </div>
  );
}
