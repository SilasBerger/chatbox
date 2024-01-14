import {createEffect, createSignal, For, Show} from "solid-js";
import styles from './styles.module.scss'
import {GameEngine} from "../../core/game-engine";
import OutputLine from "../OutputLine";
import InputLine from "../InputLine";
import {Message} from "../../core/models/messages";

interface Props {
  gameEngine: GameEngine;
}

export default ({gameEngine}: Props) => {

  const [inputActive, setInputActive] = createSignal(false);
  createEffect(() => setInputActive(!!gameEngine.activeQuestion()));

  const onInputEntered = (inputValue: string) => {
    gameEngine.onNewAnswer(inputValue);
  }

  const terminal = (
    <div class={styles.TerminalWindow}>
      <For each={gameEngine.messages()}>{(dialogLine: Message) =>
        <OutputLine text={dialogLine.text} isUser={dialogLine.isUser}/>
      }
      </For>
      <Show when={!inputActive()}>
        <OutputLine isUser={false}/>
      </Show>
      <Show when={inputActive()}>
        <InputLine onInputEntered={onInputEntered} active={inputActive}/>
      </Show>
    </div>
  );

  // Auto-scroll on new message or active input change.
  createEffect(() => {
    gameEngine.messages();
    inputActive();
    const element = terminal as HTMLElement;
    element.scrollTop = element.offsetHeight;
  });

  return terminal;
}
