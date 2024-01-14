import type {Component} from 'solid-js';
import {createSignal} from "solid-js";

import styles from './App.module.scss';
import ChatboxUi from "./components/ChatboxUi";
import StartScreen from "./components/StartScreen";

const App: Component = () => {

  const [started, setStarted] = createSignal(false);

  return (
    <div class={styles.App}>
      {started() ? <ChatboxUi /> : <StartScreen onStart={() => setStarted(true)} />}
    </div>
  );
};

export default App;
