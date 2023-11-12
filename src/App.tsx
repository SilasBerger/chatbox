import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {TerminalWindow} from "./components/TerminalWindow/TerminalWindow";
import {HeadUpDisplay} from "./components/HeadUpDisplay/HeadUpDisplay";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <TerminalWindow />
      <HeadUpDisplay />
    </div>
  );
};

export default App;
