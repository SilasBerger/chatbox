import styles from "./styles.module.scss";
import TerminalWindow from "../ChatTerminal";
import {createSignal} from "solid-js";
import {HeadUpDisplay} from "../HeadUpDisplay";
import clsx from "clsx";

export default () => {

  const [numSuccessfulQuestions, setNumSuccessfulQuestions] = createSignal(0);
  const [layoutSizeClass, setLayoutSizeClass] = createSignal('layout-m');

  const updateLayoutSizeClass = () => {
    const innerWidth = window.innerWidth;

    if (innerWidth < 1000) {
      setLayoutSizeClass('layout-s');
    } else if (innerWidth < 1200) {
      setLayoutSizeClass('layout-m');
    } else {
      setLayoutSizeClass('layout-l');
    }
  };

  updateLayoutSizeClass();
  window.addEventListener('resize', () => updateLayoutSizeClass());

  return (
    <div class={clsx(styles.ChatboxUi, layoutSizeClass())}>
      <div class={styles.container}>
        <TerminalWindow setNumSuccessfulQuestions={setNumSuccessfulQuestions}/>
        <HeadUpDisplay numSuccessfulQuestions={numSuccessfulQuestions}/>
      </div>
    </div>
  )
}
