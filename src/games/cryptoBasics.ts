import {Message, Game, Question} from "../core/game-engine";

export const cryptoBasics: Game = {
  beats: [
    Message.of('Hallo.'),
    Message.of('Mein Name ist Special Agent Charles Marsh. Ich benötige dringend Ihre Hilfe.'),
    Message.of('Satellit D-128q hat heute um 04:37 UTC-0900 eine verdächtige Nachricht abgefangen.'),
    Message.of('Wir haben Grund zur Annahme, dass es sich beim Absender um den französichen Diplomaten Blaise de Vigenère handelt.'),
    Message.of('Wir haben keine Ahnung, für wen sie bestimmt ist, oder was der Inhalt sein könnte.'),
    Message.of('Die Nachricht lautet: EFPZSUOOK'),
    Message.of('Aus sicherer Quelle wissen wir, dass die Nachricht mit dem Schlüsselwort COBRA verschlüsselt wurde.'),
    Message.of('Leider finden wir nicht heraus, welches Verschlüsselungsverfahren dazu verwendet wurde.'),
    Question.create()
      .withPrompt('Entschlüsseln Sie bitte die Nachricht.')
      .withCorrectAnswers(['CROISSANT'])
      .withAllowSubstringMatch(true)
      .withResponseToIncorrectAnswer('Das sieht mir nicht ganz richtig aus...')
      .withResponseToCorrectAnswer('Das ist es! Ich wusste, dass ich auf Sie zählen kann!')
      .build(),
    Message.of('Haben Sie noch einen Moment Zeit für mich? Ich muss ich Sie um einen weiteren Gefallen bitten.'),
    Message.of('Einer unserer besten Agenten ist in grosser Gefahr und muss dringend exfiltriert werden.'),
    Message.of('SecOps-5 erwartet ihn morgen bei Sonnenaufgang am Treffpunkt KAUFHAUS.'),
    Question.create()
      .withPrompt('Verschlüsseln Sie bitte den Namen des Treffpunkts mit dem Schlüsselwort ELIXIR. Verwenden Sie ebenfalls das Vigenère verfahren.')
      .withCorrectAnswers(['OLCCPRYD'])
      .withAllowSubstringMatch(true)
      .withResponseToIncorrectAnswer('Hmm... Da scheint etwas noch nicht ganz zu stimmen.')
      .withResponseToCorrectAnswer('Danke. Hoffentlich erinnert sich unser Agent noch an das Schlüsselwort ;)')
      .build(),
    Message.of('Eine letzte Bitte noch...'),
    Message.of('Ich darf Ihnen leider keine Details verraten, aber so viel sei gesagt: Wir stehen kurz vor einem denkwürdigen Zugriff.'),
    Message.of('Unsere Zielperson hat kürzlich folgende Nachricht übermittelt: NVGQZ OMZAAZI VH FJGJNNZPH'),
    Message.of('Leider kennen wir weder den Verschlüsselungsmechanismus, noch den Schlüssel.'),
    Message.of('Wir wissen aber, dass die Zielperson jede Nachricht mit AVE, SALVE oder CIAO anfängt.'),
    Question.create()
      .withPrompt('Reichen Ihnen diese Informationen, um die geheime Nachricht zu entschlüsseln?')
      .withCorrectAnswers(['SALVE TREFFEN AM KOLOSSEUM'])
      .withAllowSubstringMatch(true)
      .withResponseToIncorrectAnswer('Ich glaube das ist nicht korrekt.')
      .withResponseToCorrectAnswer('Das macht Sinn! Ich freue mich schon auf seinen Gesichtsausdruck, wenn am Kolosseum eine nette Überraschung auf ihn wartet :D')
      .build(),
    Message.of('Im Namen der Agency danke ich Ihnen für Ihre Hilfe. Passen Sie auf sich auf!'),
  ],
}
