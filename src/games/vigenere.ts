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
      .withResponseToCorrectAnswer('Das ist es! Vielen Dank.')
      .build(),
    DialogLine.of('Da Sie sich mit kryptografie so gut auskennen, muss ich Sie um einen weiteren Gefallen bitten.'),
    DialogLine.of('Einer unserer besten Agenten ist in grosser Gefahr und muss dringend exfiltriert werden.'),
    DialogLine.of('SecOps-5 erwartet ihn morgen bei Sonnenaufgang am Treffpunkt KAUFHAUS.'),
    Question.create()
      .withPrompt('Verschlüsseln Sie bitte den Namen des Treffpunkts mit dem gleichen Algorithmus und mit dem Schlüsselwort ELIXIR.')
      .withCorrectAnswers(['OLCCPRYD', 'olccpryd'])
      .withResponseToIncorrectAnswer('Hmm... Da scheint etwas noch nicht ganz zu stimmen.')
      .withResponseToCorrectAnswer('Danke. Hoffentlich erinnert sich unser Agent noch an das Schlüsselwort.')
      .build(),
    DialogLine.of('Im Namen der Agency danke ich Ihnen für Ihre Hilfe. Seien Sie vorsichtig!'),
  ],
}
