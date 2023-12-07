import { getInput, getTestInput } from "./input/d4";

type Game = {
  winningNums: Set<string>;
  playedNums: string[];
};

function parseInput(): Game[] {
  return getInput()
    .split("\n")
    .map((l) => {
      const [_, game] = l.split(": ");
      const [nums, winning] = game.split(" | ");
      return {
        playedNums: nums.split(" ").filter((n) => n !== ""),
        winningNums: new Set(winning.split(" ").filter((n) => n !== "")),
      };
    });
}

function getWinningMatchCount(played: string[], winning: Set<string>): number {
  let count = 0;
  for (let j = 0; j < played.length; j++) {
    if (winning.has(played[j])) {
      count += 1;
    }
  }
  return count;
}

function solve(): number {
  const input = parseInput();

  let cardCount = 0;
  const queue: number[] = [];

  for (let i = 0; i < input.length; i++) {
    const { winningNums, playedNums } = input[i];

    // an empty array will just = 0
    const curCardMultiplier = +queue.splice(0, 1)[0] + 1;
    cardCount += curCardMultiplier;

    const count = getWinningMatchCount(playedNums, winningNums);
    for (let j = 0; j < count; j++) {
      if (queue.length === 0 || queue.length - 1 < j) {
        queue.push(0);
      }
      // the amount of times this card has been used will be the multiplier for the following cardstpirs
      queue[j] += curCardMultiplier;
    }
  }

  return cardCount;
}

console.log(solve());
