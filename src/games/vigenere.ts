import {DialogLine, Game, Question} from "../core/game-engine";

export const vigenere: Game = {
  beats: [
    DialogLine.of('Hallo.'),
    DialogLine.of('Mein Name ist Special Agent Charles Marsh. Ich benötige dringend Ihre Hilfe.'),
    DialogLine.of('Satellit D-128q hat heute um 04:37 UTC-0900 eine verdächtige Nachricht abgefangen.'),
    DialogLine.of('Wir haben Grund zur Annahme, dass es sich beim Absender um den französichen Diplomaten Blaise de Vigenère handelt.'),
    DialogLine.of('Wir haben keine Ahnung, für wen sie bestimmt ist, oder was der Inhalt sein könnte.'),
    DialogLine.of('Die Nachricht lautet: EFPZSUOOK'),
    DialogLine.of('Aus sicherer Quelle wissen wir, dass die Nachricht mit dem Schlüsselwort COBRA verschlüsselt wurde.'),
    DialogLine.of('Leider kennen wir aber den verwendeten kryptografischen Algorithmus nicht.'),
    Question.create()
      .withPrompt('Entschlüsseln Sie bitte die Nachricht und geben Sie sie hier ein.')
      .withCorrectAnswers(['CROISSANT', 'croissant'])
      .withResponseToIncorrectAnswer('Das sieht mir nicht ganz richtig aus...')
      .withResponseToCorrectAnswer('Das ist es! Im Namen der Agency bedanke ich mich für Ihre Hilfe.')
      .build(),
  ],
}
