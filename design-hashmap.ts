class MyHashMap {
  private map: number[][];
  private inserted: boolean[];
  private size: number;
  private capacity: number;

  constructor() {
    this.map = [];
    this.inserted = [];
    this.size = 0;
    this.capacity = 10;
  }

  hash(key: number): number {
    return key % this.capacity;
  }

  ensureCapacity() {
    const is75PercentFull = Math.round(this.size / this.capacity) * 100 >= 75;
    if (!is75PercentFull) return;

    this.capacity = 2 * this.capacity;
    this.reHash();
  }

  reHash() {
    const saveData = this.map;
    this.map = [];
    this.inserted = [];

    for (let i = 0; i < saveData.length; i += 1) {
      if (!saveData[i]) continue;
      const [key, value] = saveData[i];
      if (value === null || value === undefined) continue;

      const index = this.findNextPos(key);

      this.map[index] = [key, value];
      this.inserted[index] = true;
    }
  }

  findNextPos(key: number) {
    return this.findPos(key, true);
  }

  findPos(key: number, isNeedLastPos: boolean) {
    let pos = this.hash(key);
    while (this.inserted[pos]) {
      if (this.map[pos][0] === key) return pos;
      pos = (pos + 1) % this.capacity;
    }

    return isNeedLastPos ? pos : -1;
  }

  put(key: number, value: number): void {
    this.ensureCapacity();

    const index = this.findNextPos(key);
    this.map[index] = [key, value];
    this.inserted[index] = true;
    this.size += 1;
  }

  get(key: number): number {
    const index = this.findPos(key, false);
    if (index === -1) return -1;
    return this.map[index][1];
  }

  remove(key: number): void {
    this.ensureCapacity();

    const index = this.findPos(key, false);
    if (index === -1) return;

    this.map[index] = [];
    this.inserted[index] = false;
    this.size -= 1;
  }
}
