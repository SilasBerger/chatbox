import styles from "./styles.module.scss";
import {createSignal} from "solid-js";
import {HeadUpDisplay} from "../HeadUpDisplay";
import clsx from "clsx";
import ChatTerminal from "../ChatTerminal";
import {GameEngine} from "../../core/game-engine";
import {cryptoBasics} from "../../games/cryptoBasics";

export default () => {

  const [numSuccessfulQuestions, setNumSuccessfulQuestions] = createSignal(0);
  const [layoutSizeClass, setLayoutSizeClass] = createSignal('layout-m');

  const gameEngine = new GameEngine(cryptoBasics, () => {
    setNumSuccessfulQuestions(numSuccessfulQuestions() + 1);
  });
  gameEngine.progressDialog();

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
        <ChatTerminal gameEngine={gameEngine}/>
        <HeadUpDisplay numSuccessfulQuestions={numSuccessfulQuestions}/>
      </div>
    </div>
  )
}
