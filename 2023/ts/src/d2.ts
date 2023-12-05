import getInput, { getTestInput } from "./input/d2";

function parseGame(game: string): number {
  const [, gameData] = game.split(": ");
  const cur = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const round of gameData.split("; ")) {
    const cubes = round.split(", ");
    for (const cube of cubes) {
      const [quantity, color] = cube.split(" ");
      const q = +quantity;
      if (cur[color] < q) {
        cur[color] = q;
      }
    }
  }
  return Object.values(cur).reduce((a, c) => a * c, 1);
}

function solve(): number {
  return getInput()
    .split("\n")
    .reduce((acc, cur) => {
      return acc + parseGame(cur);
    }, 0);
}

console.log(solve());
