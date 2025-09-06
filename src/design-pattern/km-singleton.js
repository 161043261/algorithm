import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Cart {
  /** @type {Cart} */ static #instance; // = new Cart();
  /** @type {Map<string, number>} */ #nameToCnt = new Map();

  static getInstance() {
    if (!Cart.#instance) {
      Cart.#instance = new Cart();
    }
    return Cart.#instance;
  }

  /**
   *
   * @param {string} name
   * @param {number} cnt
   */
  add(name, cnt) {
    Cart.#instance.#nameToCnt.set(
      name,
      (Cart.#instance.#nameToCnt.get(name) ?? 0) + cnt,
    );
  }

  print() {
    for (const [name, cnt] of Cart.#instance.#nameToCnt.entries()) {
      console.log(name, cnt);
    }
  }
}

rl.on("line", (line) => {
  const [name, cntStr] = line.trim().split(" ");
  const cnt = Number.parseInt(cntStr);
  const instance = Cart.getInstance();
  instance.add(name, cnt);
});

rl.on("pause", () => {
  const instance = Cart.getInstance();
  instance.print();
  rl.close();
});
