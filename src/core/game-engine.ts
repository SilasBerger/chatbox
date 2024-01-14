import {delayedRunnable, SequentialAsyncQueue} from "./queue";

export class GameEngine {

  private readonly _printedLines: Message[] = [];
  private readonly _messageQueue = new SequentialAsyncQueue();

  private _nextBeatIndex = 0;
  private _activeQuestion?: Question;

  constructor(private _game: Game,
              private _onMessagesUpdated: (_: Message[]) => void,
              private _onQuestionActiveChanged: (_: boolean) => void,
              private _onQuestionSuccessful: () => void) {
  }

  progressDialog() {
    while (this._nextBeatIndex < this._game.beats.length) {
      const nextBeat = this._game.beats[this._nextBeatIndex];
      this._nextBeatIndex++;
      switch (nextBeat.beatType) {
        case BeatType.Message:
          this.playMessageBeat(nextBeat as Message);
          break;
        case BeatType.Question:
          this.playQuestionBeat(nextBeat as Question);
          return;
      }
    }
  }

  private _sendAgentMessage(message: Message) {
    this._messageQueue.enqueue(delayedRunnable(() => {
      this._printedLines.push(message);
      this._onMessagesUpdated([...this._printedLines]);
    }, 1000));
  }
  private _addUserMessage(line: string) {
    this._printedLines.push(new Message(line, true));
    this._onMessagesUpdated([...this._printedLines]);
  }

  private isCorrectAnswer(answer: string): boolean {
    const question = this._activeQuestion;
    if (!question) {
      return false;
    }

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

  onNewAnswer(answer: string) {
    const question = this._activeQuestion;

    if (!question) {
      return;
    }

    this._addUserMessage(answer);

    if (!this.isCorrectAnswer(answer)) {
      this._sendAgentMessage(new Message(question.responseToIncorrectAnswer, false));
      return;
    }

    if (question.responseToCorrectAnswer) {
      this._sendAgentMessage(new Message(question.responseToCorrectAnswer, false));
    }
    this._activeQuestion = undefined;
    this._onQuestionActiveChanged(false);
    this._onQuestionSuccessful();
    this.progressDialog();
  }

  private playMessageBeat(dialogLine: Message) {
    this._sendAgentMessage(new Message(dialogLine.text, false));
  }

  private playQuestionBeat(question: Question) {
    this._activeQuestion = question;
    this._onQuestionActiveChanged(true);
    if (question.prompt) {
      this._sendAgentMessage(new Message(question.prompt, false));
    }
  }
}

export enum BeatType {
  Message,
  Question,
}

export class StoryBeat {
  constructor(private _beatType: BeatType) {
  }

  get beatType(): BeatType {
    return this._beatType;
  }
}

export class Message extends StoryBeat {

  constructor(private _text: string, private _isUser: boolean) {
    super(BeatType.Message);
  }

  get text(): string {
    return this._text;
  }

  get isUser(): boolean {
    return this._isUser;
  }

  static of(text: string): Message {
    return new Message(text, false);
  }
}

export class Question extends StoryBeat {
  constructor(private _correctAnswers: string[],
              private _responseToIncorrectAnswer: string,
              private _prompt?: string,
              private _responseToCorrectAnswer?: string,
              private _respectCase?: boolean,
              private _allowSubstringMatch?: boolean) {
    super(BeatType.Question);
  }

  get correctAnswers(): string[] {
    return this._correctAnswers;
  }

  get responseToIncorrectAnswer(): string {
    return this._responseToIncorrectAnswer;
  }

  get prompt(): string | undefined {
    return this._prompt;
  }

  get responseToCorrectAnswer(): string | undefined {
    return this._responseToCorrectAnswer;
  }

  get respectCase(): boolean {
    return !!this._respectCase;
  }

  get allowSubstringMatch(): boolean {
    return !!this._allowSubstringMatch;
  }

  static create(): QuestionBuilder {
    return new QuestionBuilder();
  }
}

export class QuestionBuilder {

  private _correctAnswers?: string[];
  private _responseToIncorrectAnswer?: string;
  private _prompt?: string;
  private _responseToCorrectAnswer?: string;
  private _respectCase?: boolean;
  private _allowSubstringMatch?: boolean;

  withCorrectAnswers(correctAnswers: string[]) {
    this._correctAnswers = correctAnswers;
    return this;
  }

  withAllowSubstringMatch(allowSubstringMatch: boolean) {
    this._allowSubstringMatch = allowSubstringMatch;
    return this;
  }

  withResponseToIncorrectAnswer(responseToIncorrectAnswer: string) {
    this._responseToIncorrectAnswer = responseToIncorrectAnswer;
    return this;
  }

  withPrompt(prompt: string) {
    this._prompt = prompt;
    return this;
  }

  withResponseToCorrectAnswer(responseToCorrectAnswer: string) {
    this._responseToCorrectAnswer = responseToCorrectAnswer;
    return this;
  }

  build(): Question {
    if (!this._correctAnswers) {
      throw 'correctAnswer is required';
    }
    if (!this._responseToIncorrectAnswer) {
      throw 'responseToIncorrectAnswer is required';
    }
    return new Question(
      this._correctAnswers,
      this._responseToIncorrectAnswer,
      this._prompt,
      this._responseToCorrectAnswer,
      this._respectCase,
      this._allowSubstringMatch,
    );
  }
}

export interface Game {
  beats: StoryBeat[]
}
