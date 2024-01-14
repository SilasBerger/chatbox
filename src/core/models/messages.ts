import {BeatType, StoryBeat} from "./game";

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
