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
    DialogLine.of('Leider finden wir nicht heraus, welches Verschlüsselungsverfahren dazu verwendet wurde.'),
    Question.create()
      .withPrompt('Entschlüsseln Sie bitte die Nachricht.')
      .withCorrectAnswers(['CROISSANT'])
      .withAllowSubstringMatch(true)
      .withResponseToIncorrectAnswer('Das sieht mir nicht ganz richtig aus...')
      .withResponseToCorrectAnswer('Das ist es! Ich wusste, dass ich auf Sie zählen kann!')
      .build(),
    DialogLine.of('Haben Sie noch einen Moment Zeit für mich? Ich muss ich Sie um einen weiteren Gefallen bitten.'),
    DialogLine.of('Einer unserer besten Agenten ist in grosser Gefahr und muss dringend exfiltriert werden.'),
    DialogLine.of('SecOps-5 erwartet ihn morgen bei Sonnenaufgang am Treffpunkt KAUFHAUS.'),
    Question.create()
      .withPrompt('Verschlüsseln Sie bitte den Namen des Treffpunkts mit dem Schlüsselwort ELIXIR. Verwenden Sie ebenfalls das Vigenère verfahren.')
      .withCorrectAnswers(['OLCCPRYD'])
      .withAllowSubstringMatch(true)
      .withResponseToIncorrectAnswer('Hmm... Da scheint etwas noch nicht ganz zu stimmen.')
      .withResponseToCorrectAnswer('Danke. Hoffentlich erinnert sich unser Agent noch an das Schlüsselwort ;)')
      .build(),
    DialogLine.of('Eine letzte Bitte noch...'),
    DialogLine.of('Ich darf Ihnen leider keine Details verraten, aber so viel sei gesagt: Wir stehen kurz vor einem denkwürdigen Zugriff.'),
    DialogLine.of('Unsere Zielperson hat kürzlich folgende Nachricht übermittelt: NVGQZ OMZAAZI VH FJGJNNZPH'),
    DialogLine.of('Leider kennen wir weder den Verschlüsselungsmechanismus, noch den Schlüssel.'),
    DialogLine.of('Wir wissen aber, dass die Zielperson jede Nachricht mit AVE, SALVE oder CIAO anfängt.'),
    Question.create()
      .withPrompt('Reichen Ihnen diese Informationen, um die geheime Nachricht zu entschlüsseln?')
      .withCorrectAnswers(['SALVE TREFFEN AM KOLOSSEUM'])
      .withAllowSubstringMatch(true)
      .withResponseToIncorrectAnswer('Ich glaube das ist nicht korrekt.')
      .withResponseToCorrectAnswer('Das macht Sinn! Ich freue mich schon auf seinen Gesichtsausdruck, wenn am Kolosseum eine nette Überraschung auf ihn wartet :D')
      .build(),
    DialogLine.of('Im Namen der Agency danke ich Ihnen für Ihre Hilfe. Passen Sie auf sich auf!'),
  ],
}
