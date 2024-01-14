import {createSignal, For, Setter, Show} from "solid-js";
import styles from './styles.module.scss'
import {Message, GameEngine} from "../../core/game-engine";
import {cryptoBasics} from "../../games/cryptoBasics";
import OutputLine from "../OutputLine";
import InputLine from "../InputLine";

export default ({setNumSuccessfulQuestions}: {setNumSuccessfulQuestions: Setter<number>}) => {

  const [lines, setLines] = createSignal<Message[]>([]);
  const [questionActive, setQuestionActive] = createSignal(false);

  const onQuestionSuccessful = () => {
    numSuccessfulQuestions++;
    setNumSuccessfulQuestions(numSuccessfulQuestions);
  }

  let numSuccessfulQuestions = 0;

  const gameEngine = new GameEngine(
    cryptoBasics,
    (lines: Message[]) => setLines(lines),
    (questionActive: boolean) => setQuestionActive(questionActive),
    onQuestionSuccessful);
  gameEngine.progressDialog();

  const onInputEntered = (inputValue: string) => {
    gameEngine.onNewAnswer(inputValue);
  }

  return (
    <div class={styles.TerminalWindow}>
      <For each={lines()}>{(dialogLine: Message) =>
        <OutputLine text={dialogLine.text} isUser={dialogLine.isUser} />
      }
      </For>
      <Show when={questionActive()}>
        <InputLine onInputEntered={onInputEntered} />
      </Show>
    </div>
  );
}
