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
    const deletedNum = this.stack[this.size - 1];
    this.size -= 1;
    return deletedNum;
  }

  peek(): number {
    return this.stack[this.size - 1];
  }

  empty(): boolean {
    return this.size === 0;
  }
}

class MyQueue {
  private leftStack: MyStack;
  private rightStack: MyStack;

  constructor() {
    this.leftStack = new MyStack();
    this.rightStack = new MyStack();
  }

  private checkRightStack() {
    if (!this.rightStack.empty()) return;

    while (!this.leftStack.empty()) {
      this.rightStack.push(this.leftStack.pop());
    }
  }

  push(x: number): void {
    this.leftStack.push(x);
  }

  pop(): number {
    this.checkRightStack();
    return this.rightStack.pop();
  }

  peek(): number {
    this.checkRightStack();
    return this.rightStack.peek();
  }

  empty(): boolean {
    return this.leftStack.empty() && this.rightStack.empty();
  }
}
