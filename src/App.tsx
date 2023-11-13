import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {TerminalWindow} from "./components/TerminalWindow/TerminalWindow";
import {HeadUpDisplay} from "./components/HeadUpDisplay/HeadUpDisplay";
import {createSignal} from "solid-js";

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
