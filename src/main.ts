/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Router {
  memoryLimit = 0;

  packetQueue: [source: number, destination: number, timestamp: number][] = [];

  // For judging `packetQueue` includes a packet or not by O(1)
  packetKeySet: Set<string> = new Set<string>();

  // destination => timestampQueue
  dst2timestampQueue: Map<number, number[]> = new Map<number, number[]>();

  constructor(memoryLimit: number) {
    this.memoryLimit = memoryLimit;
  }

  getPacketKey(source: number, destination: number, timestamp: number): string {
    return `${source}-${destination}-${timestamp}`;
  }

  addPacket(source: number, destination: number, timestamp: number): boolean {
    const packetKey = this.getPacketKey(source, destination, timestamp);
    if (this.packetKeySet.has(packetKey)) {
      return false;
    }

    if (this.packetQueue.length === this.memoryLimit) {
      this.forwardPacket();
    }

    this.packetKeySet.add(packetKey);
    this.packetQueue.push([source, destination, timestamp]);
    const timestampQueue = this.dst2timestampQueue.get(destination);

    if (timestampQueue) {
      timestampQueue.push(timestamp);
    } else {
      this.dst2timestampQueue.set(destination, [timestamp]);
    }

    return true;
  }

  forwardPacket(): number[] {
    if (!this.packetQueue.length) {
      return [];
    }

    // Shift left hand side packet of `packetQueue`
    const [source, destination, timestamp] = this.packetQueue.shift()!;

    const shiftedPacketKey = this.getPacketKey(source, destination, timestamp);
    // Delete the shifted packet's key from `packetKeySet`
    this.packetKeySet.delete(shiftedPacketKey);

    const timestampQueue = this.dst2timestampQueue.get(destination);
    // Shift left hand side timestamp of `timestampQueue`
    timestampQueue?.shift();
    return [source, destination, timestamp];
  }

  // >= startTime
  findStart(startTime: number, timestampQueue: number[]): number {
    let left = 0;
    let right = timestampQueue.length - 1;
    let mid;
    while (left <= right) {
      //! feat
      mid = left + ((right - left) >> 1);
      if (timestampQueue[mid] >= startTime) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    //! fix
    return right + 1;
  }

  // <= endTime
  findEnd(endTime: number, timestampQueue: number[]): number {
    let left = 0;
    let right = timestampQueue.length - 1;
    let mid;
    while (left <= right) {
      //! feat
      mid = left + ((right - left) >> 1);
      if (timestampQueue[mid] > endTime) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    //! fix
    return left - 1;
  }

  getCount(destination: number, startTime: number, endTime: number): number {
    const timestampQueue = this.dst2timestampQueue.get(destination);
    if (!timestampQueue || !timestampQueue.length) {
      return 0;
    }

    const startIndex = this.findStart(startTime, timestampQueue);
    const endIndex = this.findEnd(endTime, timestampQueue);
    return endIndex - startIndex + 1;
  }
}
