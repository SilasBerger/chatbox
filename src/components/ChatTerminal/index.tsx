import {createSignal, For, Setter, Show} from "solid-js";
import styles from './styles.module.scss'
import {GameEngine} from "../../core/game-engine";
import {cryptoBasics} from "../../games/cryptoBasics";
import OutputLine from "../OutputLine";
import InputLine from "../InputLine";
import {Message} from "../../core/models/messages";

export default ({setNumSuccessfulQuestions}: {setNumSuccessfulQuestions: Setter<number>}) => {

  const onQuestionSuccessful = () => {
    numSuccessfulQuestions++;
    setNumSuccessfulQuestions(numSuccessfulQuestions);
  }

  let numSuccessfulQuestions = 0;

  const gameEngine = new GameEngine(
    cryptoBasics,
    onQuestionSuccessful);
  gameEngine.progressDialog();

  const onInputEntered = (inputValue: string) => {
    gameEngine.onNewAnswer(inputValue);
  }

  return (
    <div class={styles.TerminalWindow}>
      <For each={gameEngine.messages()}>{(dialogLine: Message) =>
        <OutputLine text={dialogLine.text} isUser={dialogLine.isUser} />
      }
      </For>
      <Show when={!!gameEngine.activeQuestion()}>
        <InputLine onInputEntered={onInputEntered} />
      </Show>
    </div>
  );
}
