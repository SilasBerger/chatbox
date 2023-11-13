import {Component, createSignal, For, Show} from "solid-js";
import styles from './TerminalWindow.module.css'
import {OutputLine} from "../OutputLine/OutputLine";
import {InputLine} from "../InputLine/InputLine";
import {DialogLine, GameEngine} from "../../core/game-engine";
import {vigenere} from "../../games/vigenere";

export const TerminalWindow: Component = () => {

  const [lines, setLines] = createSignal<DialogLine[]>([]);
  const [questionActive, setQuestionActive] = createSignal(false);

  const gameEngine = new GameEngine(
    vigenere,
    (lines: DialogLine[]) => setLines(lines),
    (questionActive: boolean) => setQuestionActive(questionActive));
  gameEngine.progressDialog();

  const onInputEntered = (inputValue: string) => {
    gameEngine.onNewAnswer(inputValue);
  }

  return (
    <div class={styles.TerminalWindow}>
      <For each={lines()}>{(dialogLine: DialogLine) =>
        <OutputLine text={dialogLine.text} isUser={dialogLine.isUser} />
      }
      </For>
      <Show when={questionActive()}>
        <InputLine onInputEntered={onInputEntered} />
      </Show>
    </div>
  );
}
