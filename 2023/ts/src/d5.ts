import { getInput, getTestInput } from "./input/d5";

function parseInput(): [string, string[]] {
  const [seeds, ...other] = getTestInput().split("\n\n");
  return [seeds, other];
}

// First layer (seeds) is the only level with unique formatting
function parseFirstLayer(input: string): number[][] {
  const [_, ...seedIdList] = input.split(" ");
  const res: number[][] = [];
  for (let i = 0; i < seedIdList.length; i += 2) {
    const element = +seedIdList[i];
    res.push([element, element + +seedIdList[i + 1]]);
  }
  return res;
}

function parseLayer(data: string): [[number, number], number][] {
  const [_, ...ranges] = data.split("\n");
  return ranges.map((line) => {
    const [dest, source, range] = line.split(" ").map((i) => +i);
    return [[source, source + range - 1], dest];
  });
}

// each item in a layer can be a single value or a range
// there's no reason to spread a range if it's never used, the result ends up being
// the same
function resolveLayer(
  layer: number[][],
  nextLayerData: [[number, number], number][]
) {
  const res = [];
  for (let i = 0; i < layer.length; i++) {
    const curItem = layer[i];
    let nextItem: [[number, number], number];
    if (curItem.length == 2) {
      nextItem = nextLayerData.find(
        ([range]) => curItem[0] >= range[0] && curItem[1] <= range[1]
      );
      if (!nextItem) {
        // if no match is found, just push the range again
      }
    } else {
      nextItem = nextLayerData.find(
        ([range]) => curItem[0] >= range[0] && curItem[0] <= range[1]
      );
    }
    if (nextItem) {
      res.push(nextItem[1] + curItem - nextItem[0][0]);
    } else {
      res.push(curItem);
    }
  }
  return res;
}

function solve(): number {
  const [seedString, data] = parseInput();

  let curLayer = parseFirstLayer(seedString);

  while (data.length > 0) {
    const nextLayerData = parseLayer(data.splice(0, 1)[0]);
    curLayer = nextLayer;
  }

  return curLayer.reduce((acc, cur) => (cur < acc ? cur : acc), curLayer[0]);
}

console.log(solve());
/**
 *
 *
 * 50 98 2
 * 52 50 48
 *
 * 50 + 0 50 + 1
 * 98 + 0 98 + 1
 *
 * 52 + 0 52 + 1 ... 52 + 47
 * 50 + 0 50 + 1 ... 50 + 47
 * source:source+range-1
 * destination:destination+range-1
 *
 * dest start -- source start -- range
 *
 */
