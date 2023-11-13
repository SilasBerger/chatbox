export class GameEngine {

  private readonly _printedLines: DialogLine[] = [];

  private _nextBeatIndex = 0;
  private _activeQuestion?: Question;

  constructor(private _game: Game,
              private _onLinesChanged: (_: DialogLine[]) => void,
              private _onQuestionActiveChanged: (_: boolean) => void) {
  }

  progressDialog() {
    while (this._nextBeatIndex < this._game.beats.length) {
      const nextBeat = this._game.beats[this._nextBeatIndex];
      this._nextBeatIndex++;
      switch (nextBeat.beatType) {
        case BeatType.DialogLine:
          this.playDialogBeat(nextBeat as DialogLine);
          break;
        case BeatType.Question:
          this.playQuestionBeat(nextBeat as Question);
          return;
      }
    }
  }

  private addAgentLine(line: string) {
    this._printedLines.push(new DialogLine(line, false));
    this._onLinesChanged([...this._printedLines]);
  }

  private addUserLine(line: string) {
    this._printedLines.push(new DialogLine(line, true));
    this._onLinesChanged([...this._printedLines]);
  }

  onNewAnswer(answer: string) {
    const question = this._activeQuestion;

    if (!question) {
      return;
    }

    this.addUserLine(answer);

    if (!question.correctAnswers.includes(answer)) {
      this.addAgentLine(question.responseToIncorrectAnswer);
      return;
    }

    if (question.responseToCorrectAnswer) {
      this.addAgentLine(question.responseToCorrectAnswer);
    }
    this._activeQuestion = undefined;
    this._onQuestionActiveChanged(false);
    this.progressDialog();
  }

  private playDialogBeat(dialogLine: DialogLine) {
    this.addAgentLine(dialogLine.text);
  }

  private playQuestionBeat(question: Question) {
    this._activeQuestion = question;
    this._onQuestionActiveChanged(true);
    if (question.prompt) {
      this.addAgentLine(question.prompt);
    }
  }
}

export enum BeatType {
  DialogLine,
  Question,
}

export class Beat {
  constructor(private _beatType: BeatType) {
  }

  get beatType(): BeatType {
    return this._beatType;
  }
}

export class DialogLine extends Beat {

  constructor(private _text: string, private _isUser: boolean) {
    super(BeatType.DialogLine);
  }

  get text(): string {
    return this._text;
  }

  get isUser(): boolean {
    return this._isUser;
  }

  static of(text: string): DialogLine {
    return new DialogLine(text, false);
  }
}

export class Question extends Beat {
  constructor(private _correctAnswers: string[],
              private _responseToIncorrectAnswer: string,
              private _prompt?: string,
              private _responseToCorrectAnswer?: string) {
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

  static create(): QuestionBuilder {
    return new QuestionBuilder();
  }
}

export class QuestionBuilder {

  private _correctAnswers?: string[];
  private _responseToIncorrectAnswer?: string;
  private _prompt?: string;
  private _responseToCorrectAnswer?: string;

  withCorrectAnswers(correctAnswers: string[]) {
    this._correctAnswers = correctAnswers;
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
    return new Question(this._correctAnswers, this._responseToIncorrectAnswer, this._prompt, this._responseToCorrectAnswer);
  }
}

export interface Game {
  beats: Beat[]
}
