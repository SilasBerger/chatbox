import type { Component } from 'solid-js';

import styles from './App.module.scss';
import {HeadUpDisplay} from "./components/HeadUpDisplay";
import {createSignal} from "solid-js";
import TerminalWindow from "./components/TerminalWindow";

const App: Component = () => {

  const [numSuccessfulQuestions, setNumSuccessfulQuestions] = createSignal(0);

  return (
    <div class={styles.App}>
      <TerminalWindow setNumSuccessfulQuestions={setNumSuccessfulQuestions} />
      <HeadUpDisplay numSuccessfulQuestions={numSuccessfulQuestions} />
    </div>
  );
};

export default App;
