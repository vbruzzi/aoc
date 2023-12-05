import getInput, { testInput } from "./input/p1";

type WordTrie = {
  children: { [key: string]: WordTrie };
  value: number | undefined;
};

function buildTrie(): WordTrie {
  const digits = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const res: WordTrie = {
    children: {},
    value: undefined,
  };

  for (let i = 0; i < digits.length; i++) {
    const element = digits[i];
    let cur = res;
    for (let j = 0; j < element.length; j++) {
      const char = element[j];
      if (!(char in cur.children)) {
        cur.children[char] = { children: {}, value: undefined };
      }
      cur = cur.children[char];
    }

    cur.value = i + 1;
  }

  // Add 1-9 to the trie
  for (let i = 1; i < 10; i++) {
    res.children[i.toString()] = { children: {}, value: i };
  }

  return res;
}

const trie = buildTrie();

/**
 * Find the next value in the string that is a digit or a word that represents a digit (1-9).
 * @returns A tuple with the digit as a string and the index in which it was found.
 */
function findNextMatch(line: string): [string, number] {
  let l = 0;

  while (l < line.length) {
    let cur = trie;
    let curSeg = l;
    while (cur && line[curSeg] in cur.children) {
      cur = cur.children[line[curSeg]];
      curSeg += 1;
    }

    // if we've reached the end of the trie and there's a value, we've reached a valid value
    if (cur?.value) {
      return [cur.value.toString(), l + 1];
    }

    l += 1;
  }
  // no more values
  return null;
}

function parseLine(line: string): number {
  const firstMatch = findNextMatch(line);
  let curIdx = firstMatch[1];
  let last = null;
  while (true) {
    const cur = findNextMatch(line.slice(curIdx));
    if (!cur) {
      // if last is null, firstmatch is the only match
      return +(firstMatch[0] + (last ?? firstMatch[0]));
    }
    last = cur[0];
    curIdx += cur[1];
  }
}

function findSum(): number {
  return getInput()
    .split("\n")
    .reduce((acc, cur) => acc + parseLine(cur), 0);
}

console.log(findSum());
