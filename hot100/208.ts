class TrieNode {
  constructor(
    public children = new Array<TrieNode | null>(26).fill(null),
    public end = false
  ) {}
}

enum ReturnMsg {
  Failed = 0,
  SearchOK = 1,
  StartsWithOK = 2,
}

class Trie {
  constructor(public root = new TrieNode()) {}

  insert(word: string): void {
    let cur = this.root;
    for (let charStr of word) {
      let charCode = charStr.charCodeAt(0) - "a".charCodeAt(0);
      if (cur.children[charCode] === null) {
        cur.children[charCode] = new TrieNode();
      }
      cur = cur.children[charCode];
    }
    cur.end = true;
  }

  private find(word: string): ReturnMsg {
    let cur = this.root;
    for (let charStr of word) {
      let charCode = charStr.charCodeAt(0) - "a".charCodeAt(0);
      if (cur.children[charCode] === null) {
        return ReturnMsg.Failed;
      }
      cur = cur.children[charCode];
    }
    return cur.end ? ReturnMsg.SearchOK : ReturnMsg.StartsWithOK;
  }

  search(word: string): boolean {
    return this.find(word) === ReturnMsg.SearchOK;
  }

  startsWith(prefix: string): boolean {
    return (
      this.find(prefix) === ReturnMsg.StartsWithOK ||
      this.find(prefix) === ReturnMsg.SearchOK
    );
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
