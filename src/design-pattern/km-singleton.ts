import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface ICart {
  add(name: string, cnt: number): void;
  // add: (name: string, cnt: number) => void;
  print(): void;
  // print: () => void;
}

class Cart implements ICart {
  private static instance = new Cart();
  private nameToCnt = new Map<string, number>();

  // private constructor() {}
  static getInstance() {
    return Cart.instance;
  }

  add(name: string, cnt: number) {
    Cart.instance.nameToCnt.set(
      name,
      (Cart.instance.nameToCnt.get(name) ?? 0) + cnt,
    );
  }

  print() {
    for (const [name, cnt] of Cart.instance.nameToCnt.entries()) {
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
