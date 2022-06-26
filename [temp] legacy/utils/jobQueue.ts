interface QueueElement {
  queryKey: string;
  queryStyle: 'block' | 'page';
}

class JobQueue {
  private _queue: QueueElement[];

  constructor() {
    this._queue = [];
  }

  get queue() {
    return this._queue;
  }

  push(queryKey: string, queryStyle: 'block' | 'page') {
    this._queue.push({ queryKey, queryStyle });
  }

  getFront() {
    return this._queue[0];
  }

  pushFront(elements: QueueElement[]) {
    this._queue.splice(0, 0, ...elements);
  }

  pop() {
    return this._queue.pop();
  }

  isEmpty() {
    return this._queue.length === 0;
  }
}

export default new JobQueue();
