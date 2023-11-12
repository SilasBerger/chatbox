import {Component} from "solid-js";
import styles from './TerminalWindow.module.css'
import {TextLine} from "../TextLine/TextLine";

export const TerminalWindow: Component = () => {
  return (
    <div class={styles.TerminalWindow}>
      <TextLine text='Hallo.'/>
      <TextLine text='Mein Name ist Special Agent Charles Marsh. Ich benötige dringend Ihre Hilfe.'/>
      <TextLine text='Satellit D-128q hat heute um 04:37 UTC-0900 eine verdächtige Nachricht abgefangen.'/>
      <TextLine text='Wir haben Grund zur Annahme, dass es sich beim Absender um den französichen Diplomaten Blaise de Vigenère handelt.'/>
      <TextLine text='Wir haben keine Ahnung, für wen sie bestimmt ist, oder was der Inhalt sein könnte.'/>
      <TextLine text='Die Nachricht lautet: EFPZSUOOK'/>
      <TextLine text='Aus sicherer Quelle wissen wir, dass die Nachricht mit dem Schlüsselwort COBRA verschlüsselt wurde.'/>
      <TextLine text='Leider kennen wir aber den verwendeten kryptografischen Algorithmus nicht.'/>
      <TextLine text='Entschlüsseln Sie bitte die Nachricht, und geben Sie sie hier ein.'/>
      <TextLine text='_'/>
    </div>
  );
}
