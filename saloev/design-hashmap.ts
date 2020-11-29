class MyHashMap {
  /**
   * inv: size >= 0
   * inv: capacity >= 0
   * inv: map number[][]
   * inv: capacity >= 0
   * */
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

  /**
   * 
   * pre: 
   * key - >= 0
   */
  hash(key: number): number {
    return key % this.capacity;
  }
  // post: number <= capacity

  /**
   * Думаю тут Pre не нужен из из инвариантов которые у нас есть
   * 
   */
  ensureCapacity() {
    const is75PercentFull = Math.round(this.size / this.capacity) * 100 >= 75;
    if (!is75PercentFull) return;

    this.capacity = 2 * this.capacity;
    this.reHash();
  }
  /**
   * Post: 
   * if size / capacity  <= 0.75 nothing
   * else 
   * capacity = 2 * this.capacity';
   * [key, value] in map every must be in [key, value] in map'
   * inserted = boolean[]
   * */

  /**
   * 
   */
  reHash() {
    const saveData = this.map;
    this.map = [];
    this.inserted = [];

    for (let i = 0; i < saveData.length; i += 1) {
      if (!saveData[i]) continue;
      const [key, value] = saveData[i];
      if (value === null || value === undefined) continue;

      this.put(key, value);
    }
  }
  /** 
   * [key, value] in map every must be in [key, value] in map'
   * inserted = boolean[]
   * */

   /**
    * Pre: key >= 0
    */
  findNextPos(key: number) {
    return this.findPos(key, true);
  }
  /**
   * Post: 
   * number >= 0
   */

  /**
   * Pre:
   * key >= 0
   */
  findPos(key: number, isNeedLastPos: boolean) {
    // inv: pos -> number
    let pos = this.hash(key);
    // inv: this.inserted[pos] === true || this.inserted[pos] === undefined
    while (this.inserted[pos]) {
      if (this.map[pos][0] === key) return pos;
      pos = (pos + 1) % this.capacity;
    }

    return isNeedLastPos ? pos : -1;
  }
  /**
   * Post: 
   * if (key in map) pos in this.map
   * else if (isNeedLastPos) 0 <= pos <= capacity
   * else -1
   */

  /**
   * key >= 0
   * 
   */ 
  put(key: number, value: number): void {
    this.ensureCapacity();

    // inv: 0<= index <= this.capacity 
    const index = this.findNextPos(key);
    this.map[index] = [key, value];
    this.inserted[index] = true;
    this.size += 1;
  }
  /**
   * Post: 
   * [key, value] in map
   * inserted[index] === true
   * size = size' + 1
   */

   /**
    * Pre:
    * key >= 0
    */
  get(key: number): number {
    const index = this.findPos(key, false);
    if (index === -1) return -1;
    return this.map[index][1];
  }
  /**
   * Post:
   * -1 or value in map
   */


   /**
    * Pre:
    * key >= 0
    */
  remove(key: number): void {
    this.ensureCapacity();

    const index = this.findPos(key, false);
    if (index === -1) return;

    this.map[index] = [];
    this.size -= 1;
  }
  /**
   * Post:
   * if (key in map)
   *  map[index]
   *  size = size' - 1;
   * else nothing
   */
}
