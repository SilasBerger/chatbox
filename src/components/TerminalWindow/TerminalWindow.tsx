import {Component} from "solid-js";
import styles from './TerminalWindow.module.css'
import {OutputLine} from "../OutputLine/OutputLine";
import {InputLine} from "../InputLine/InputLine";

export const TerminalWindow: Component = () => {
  return (
    <div class={styles.TerminalWindow}>
      <OutputLine text='Hallo.'/>
      <OutputLine text='Mein Name ist Special Agent Charles Marsh. Ich benötige dringend Ihre Hilfe.'/>
      <OutputLine text='Satellit D-128q hat heute um 04:37 UTC-0900 eine verdächtige Nachricht abgefangen.'/>
      <OutputLine text='Wir haben Grund zur Annahme, dass es sich beim Absender um den französichen Diplomaten Blaise de Vigenère handelt.'/>
      <OutputLine text='Wir haben keine Ahnung, für wen sie bestimmt ist, oder was der Inhalt sein könnte.'/>
      <OutputLine text='Die Nachricht lautet: EFPZSUOOK'/>
      <OutputLine text='Aus sicherer Quelle wissen wir, dass die Nachricht mit dem Schlüsselwort COBRA verschlüsselt wurde.'/>
      <OutputLine text='Leider kennen wir aber den verwendeten kryptografischen Algorithmus nicht.'/>
      <OutputLine text='Entschlüsseln Sie bitte die Nachricht, und geben Sie sie hier ein.'/>
      <InputLine />
    </div>
  );
}
