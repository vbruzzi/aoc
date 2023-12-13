import getInput, { getTestInput } from "./input/d3";

const nums = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

function getNumBackwards(row: string, startIdx: number): string {
  let num = "";
  let tempIdx = startIdx;
  while (tempIdx >= 0 && nums.has(row[tempIdx])) {
    num = row[tempIdx] + num;
    tempIdx -= 1;
  }

  return num;
}

function getNumForwards(row: string, startIdx: number): string {
  let num = "";
  let tempIdx = startIdx;
  while (tempIdx < row.length && nums.has(row[tempIdx])) {
    num += row[tempIdx];
    tempIdx += 1;
  }

  return num;
}

function getNumFromRow(row: string, startIdx: number): number[] {
  const forward = getNumForwards(row, startIdx + 1);
  const backward = getNumBackwards(row, startIdx - 1);
  // there is a num in the middle, meaning this row has at most 1 adjacent num
  if (nums.has(row[startIdx])) {
    return [+(backward + row[startIdx] + forward)];
  }

  return [+forward, +backward];
}

function solve(): number {
  const input = getInput().split("\n");

  let total = 0;
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (char !== "*") {
        continue;
      }

      let cur: number[] = [];

      // up
      if (i > 0) {
        cur.push(...getNumFromRow(input[i - 1], j));
      }
      // down
      if (i < input.length - 1) {
        cur.push(...getNumFromRow(input[i + 1], j));
      }

      // back
      if (j > 0) {
        cur.push(+getNumBackwards(row, j - 1));
      }

      // forward
      if (j < row.length - 1) {
        cur.push(+getNumForwards(row, j + 1));
      }

      // +'' is 0
      cur = cur.filter((c) => c !== 0);
      if (cur.length === 2) {
        console.log(cur);
        total += cur[0] * cur[1];
      }
    }
  }
  return total;
}

console.log(solve());
