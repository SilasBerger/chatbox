export interface Game {
  beats: StoryBeat[]
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
