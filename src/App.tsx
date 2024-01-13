import type {Component} from 'solid-js';
import {createSignal} from "solid-js";

import styles from './App.module.scss';
import ChatboxUi from "./components/ChatboxUi";

const App: Component = () => {

  const [numSuccessfulQuestions, setNumSuccessfulQuestions] = createSignal(0);

  return (
    <div class={styles.App}>
      <ChatboxUi></ChatboxUi>
    </div>
  );
};

export default App;
