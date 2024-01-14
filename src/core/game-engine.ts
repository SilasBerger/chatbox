import {delayedRunnable, SequentialAsyncQueue} from "./queue";
import {Accessor, createSignal, Setter} from "solid-js";

export class GameEngine {

  readonly messages: Accessor<Message[]>;
  readonly activeQuestion: Accessor<Question | undefined>;

  private readonly _messageQueue = new SequentialAsyncQueue();
  private readonly _setMessages: Setter<Message[]>;
  private readonly _setActiveQuestion: Setter<Question | undefined>;

  private _nextBeatIndex = 0;

  constructor(private _game: Game, private _onQuestionSuccessful: () => void) {
    const [
      activeQuestion,
      setActiveQuestion
    ] = createSignal<Question | undefined>(undefined);
    this.activeQuestion = activeQuestion;
    this._setActiveQuestion = setActiveQuestion;

    const [messages, setMessages] = createSignal<Message[]>([]);
    this.messages = messages;
    this._setMessages = setMessages;
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
    }, 1000));
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
