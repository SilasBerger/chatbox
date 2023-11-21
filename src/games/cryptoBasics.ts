import {DialogLine, Game, Question} from "../core/game-engine";

export const cryptoBasics: Game = {
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
      .withPrompt('Entschlüsseln Sie bitte die Nachricht.')
      .withCorrectAnswers(['CROISSANT'])
      .withAllowSubstringMatch(true)
      .withResponseToIncorrectAnswer('Das sieht mir nicht ganz richtig aus...')
      .withResponseToCorrectAnswer('Das ist es! Vielen Dank.')
      .build(),
    DialogLine.of('Da Sie sich mit Kryptografie so gut auskennen, muss ich Sie um einen weiteren Gefallen bitten.'),
    DialogLine.of('Einer unserer besten Agenten ist in grosser Gefahr und muss dringend exfiltriert werden.'),
    DialogLine.of('SecOps-5 erwartet ihn morgen bei Sonnenaufgang am Treffpunkt KAUFHAUS.'),
    Question.create()
      .withPrompt('Verschlüsseln Sie bitte den Namen des Treffpunkts mit dem gleichen Algorithmus und mit dem Schlüsselwort ELIXIR.')
      .withCorrectAnswers(['OLCCPRYD'])
      .withAllowSubstringMatch(true)
      .withResponseToIncorrectAnswer('Hmm... Da scheint etwas noch nicht ganz zu stimmen.')
      .withResponseToCorrectAnswer('Danke. Hoffentlich erinnert sich unser Agent noch an das Schlüsselwort.')
      .build(),
    DialogLine.of('Eine letzte Bitte noch: Wir haben noch eine weitere Nachricht erhalten...'),
    DialogLine.of('Die Nachricht lautet: NVGQZ OMZAAZI VH FJGJNNZPH'),
    DialogLine.of('Leider kennen wir weder den Verschlüsselungsmechanismus, noch den Schlüssel.'),
    DialogLine.of('Allerdings kennen wir den Absender.'),
    DialogLine.of('Wir wissen, dass in all seinen Nachrichten das erste Wort immer entweder AVE, SALVE oder CIAO ist.'),
    Question.create()
      .withPrompt('Nutzen Sie Ihr Angriffswissen, um die geheime Nachricht zu entschlüsseln.')
      .withCorrectAnswers(['SALVE TREFFEN AM KOLOSSEUM'])
      .withAllowSubstringMatch(true)
      .withResponseToIncorrectAnswer('Ich glaube das ist nicht korrekt.')
      .withResponseToCorrectAnswer('Das ergibt Sinn! Wie der wohl reagiert, wenn am Kolosseum eine Überraschung auf ihn wartet?')
      .build(),
    DialogLine.of('Im Namen der Agency danke ich Ihnen für Ihre Hilfe. Passen Sie auf sich auf!'),
  ],
}
