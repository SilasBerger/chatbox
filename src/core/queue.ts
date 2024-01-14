import {sleep} from "./util/timing-util";

export type Runnable = () => Promise<void>;

export const delayedRunnable = (runnable: Runnable, delay: number): Runnable => {
  return async () => {
    await sleep(delay);
    await runnable();
  }
}

export class SequentialAsyncQueue {

  private _items: Runnable[] = [];
  private _isProcessing = false;

  enqueue(item: Runnable): void {
    this._items.push(item);
    this._processQueue();
  }

  private _processQueue(): void {
    if (this._isProcessing) {
      return;
    }

    this._isProcessing = true;
    this._processItems().then(() => this._isProcessing = false);
  }

  private async _processItems(): Promise<void> {
    while (this._items.length > 0) {
      const item = this._items.shift();
      if (!item) {
        throw `Encountered unexpected falsy item (undefined or null) while processing queue`;
      }
      await this._processItem(item);
    }
  }

  private async _processItem(item: Runnable): Promise<void> {
    await item();
  }
}
