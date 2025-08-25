// 简单工厂: 一个工厂方法创建所有具体产品
// 工厂方法: 一个工厂方法创建一个具体产品
// 抽象工厂: 一个工厂方法创建一类具体产品

// 工厂方法模式
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

abstract class AbstractBlock {
  abstract produce(): void;
}

class CircleBlock extends AbstractBlock {
  produce() {
    console.log("Circle Block");
  }
}

class SquareBlock extends AbstractBlock {
  produce() {
    console.log("Square Block");
  }
}

abstract class AbstractBlockFactory {
  abstract createBlock(): AbstractBlock;
}

class CircleBlockFactory extends AbstractBlockFactory {
  createBlock(): AbstractBlock {
    return new CircleBlock();
  }
}

class SquareBlockFactory extends AbstractBlockFactory {
  createBlock(): AbstractBlock {
    return new SquareBlock();
  }
}

class BlockFactorySystem {
  blocks: AbstractBlock[] = [];

  produceBlocks(factory: AbstractBlockFactory, cnt: number) {
    for (let i = 0; i < cnt; i++) {
      const block = factory.createBlock();
      this.blocks.push(block);
      block.produce();
    }
  }
}

let lineno = 0;
let productionCnt = 0;
const circleBlockFactory = new CircleBlockFactory();
const squareBlockFactory = new SquareBlockFactory();
const factorySystem = new BlockFactorySystem();

rl.on("line", (line) => {
  lineno++;
  if (lineno === 1) {
    productionCnt = Number.parseInt(line.trim());
    return;
  }

  const [blockType, cntStr] = line.trim().split(" ");
  const cnt = Number.parseInt(cntStr);

  if (blockType === "Circle") {
    factorySystem.produceBlocks(circleBlockFactory, cnt);
  }

  if (blockType === "Square") {
    factorySystem.produceBlocks(squareBlockFactory, cnt);
  }

  if (lineno === productionCnt + 1) {
    rl.close();
  }
});

// rl.on("pause", () => {
//   rl.close()
// })
