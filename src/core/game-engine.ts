import {delayedRunnable, SequentialAsyncQueue} from "./queue";
import {Accessor, createSignal, Setter} from "solid-js";
import {Message, Question} from "./models/messages";
import {BeatType, Game} from "./models/game";
import {typingDelayMsPerCharacter} from "./util/timing-util";

export class GameEngine {

  readonly messages: Accessor<Message[]>;
  readonly activeQuestion: Accessor<Question | undefined>;

  private readonly _messageQueue = new SequentialAsyncQueue();
  private readonly _setMessages: Setter<Message[]>;
  private readonly _setActiveQuestion: Setter<Question | undefined>;

  private _nextBeatIndex = 0;

  constructor(private _game: Game, private _onQuestionSuccessful: () => void) {
    [this.activeQuestion, this._setActiveQuestion] = createSignal<Question | undefined>(undefined);
    [this.messages, this._setMessages] = createSignal<Message[]>([]);
  }

  progressDialog() {
    while (this._nextBeatIndex < this._game.beats.length) {
      const nextBeat = this._game.beats[this._nextBeatIndex];
      this._nextBeatIndex++;
      switch (nextBeat.beatType) {
        case BeatType.Message:
          this._playMessageBeat(nextBeat as Message);
          break;
        case BeatType.Question:
          this._playQuestionBeat(nextBeat as Question);
          return;
      }
    }
  }

  private _playMessageBeat(dialogLine: Message) {
    this._sendAgentMessage(new Message(dialogLine.text, false));
  }

  private _playQuestionBeat(question: Question) {
    if (question.prompt) {
      const message = new Message(question.prompt, false);
      this._sendAgentMessage(message, () => this._setActiveQuestion(question));
    }
  }

  private _sendAgentMessage(message: Message, onSent?: () => void) {
    this._messageQueue.enqueue(delayedRunnable(async () => {
      this._addMessage(message);
      if (onSent) {
        onSent();
      }
    }, this._calculateTypingDelay(message)));
  }

  private _calculateTypingDelay(messsage: Message): number {
    return messsage.text.length * typingDelayMsPerCharacter();
  }

  private _addUserMessage(line: string) {
    this._addMessage(new Message(line, true));
  }

  private _addMessage(message: Message) {
    this._setMessages([...this.messages(), message])
  }

  onNewAnswer(answer: string) {
    const question = this.activeQuestion();
    this._setActiveQuestion(undefined);

    if (!question) {
      return;
    }

    this._addUserMessage(answer);

    if (!this.isCorrectAnswer(answer, question)) {
      const message = new Message(question.responseToIncorrectAnswer, false);
      this._sendAgentMessage(message, () => this._setActiveQuestion(question));
      return;
    }

    if (question.responseToCorrectAnswer) {
      this._sendAgentMessage(new Message(question.responseToCorrectAnswer, false));
    }

    this._onQuestionSuccessful();
    this.progressDialog();
  }

  private isCorrectAnswer(answer: string, question: Question): boolean {
    return question.correctAnswers.some(correctAnswer => {
      if (question.allowSubstringMatch) {
        return question.respectCase
          ? answer.includes(correctAnswer)
          : answer.toLowerCase().includes(correctAnswer.toLowerCase());
      } else {
        return question.respectCase
          ? answer == correctAnswer
          : answer.toLowerCase() == correctAnswer.toLowerCase();
      }
    });
  }
}
