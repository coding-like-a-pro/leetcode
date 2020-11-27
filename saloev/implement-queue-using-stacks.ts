class MyStack {
  private stack: number[];
  private size: number;

  constructor() {
    this.stack = [];
    this.size = 0;
  }

  push(x: number): void {
    this.stack[this.size] = x;
    this.size += 1;
  }

  pop(): number {
    const deletetNum = this.stack[this.size - 1];
    this.size -= 1;
    return deletetNum;
  }

  peek(): number {
    return this.stack[this.size - 1];
  }

  empty(): boolean {
    return this.size === 0;
  }
}

class MyQueue {
  private queue: MyStack;
  private stack: MyStack;
  private needToReverse: boolean = false;

  constructor() {
    this.queue = new MyStack();
  }

  private reverseStack() {
    const stack = new MyStack();
    while (!this.queue.empty()) {
      const last = this.queue.pop();
      stack.push(last);
    }

    this.queue = stack;
  }

  private reverseForPop() {
    if (this.needToReverse) {
      this.reverseStack();
      this.needToReverse = false;
    }
  }

  push(x: number): void {
    if (!this.needToReverse) this.reverseStack();
    this.queue.push(x);
    this.needToReverse = true;
  }

  pop(): number {
    this.reverseForPop();
    return this.queue.pop();
  }

  peek(): number {
    this.reverseForPop();
    return this.queue.peek();
  }

  empty(): boolean {
    return this.queue.empty();
  }
}

export default MyQueue;
