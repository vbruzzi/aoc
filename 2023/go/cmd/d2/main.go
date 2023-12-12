package main

import (
	"log"
	"strconv"
	"strings"

	"github.com/vbruzzi/adventofcode/pkg/d2"
)

type Game struct {
	red   int
	green int
	blue  int
}

func (g *Game) getPower() int {
	return g.red * g.green * g.blue
}

func getNewGame() Game {
	return Game{
		red:   0,
		green: 0,
		blue:  0,
	}
}

func (g *Game) readPlay(play string) error {
	temp := strings.Split(play, " ")
	count, err := strconv.Atoi(temp[0])
	color := temp[1]

	if err != nil {
		return err
	}

	if color == "red" {
		if count > g.red {
			g.red = count
		}
	} else if color == "green" {
		if count > g.green {
			g.green = count
		}
	} else if color == "blue" {
		if count > g.blue {
			g.blue = count
		}
	}

	return nil
}

func (g *Game) readRound(round string) error {
	for _, play := range strings.Split(round, ", ") {
		err := g.readPlay(play)
		if err != nil {
			return err
		}
	}
	return nil
}

func parseLine(line string) (*Game, error) {
	clean_line := strings.Split(line, ": ")[1]
	game := getNewGame()
	for _, round := range strings.Split(clean_line, "; ") {
		err := game.readRound(round)
		if err != nil {
			return nil, err
		}
	}
	return &game, nil
}

func parseInput(input string) (int, error) {
	total := 0
	for _, line := range strings.Split(input, "\n") {
		game, err := parseLine(line)
		total += game.getPower()
		if err != nil {
			return 0, err
		}
	}
	return total, nil
}

func main() {
	input := d2.GetInput()
	log.Print(parseInput(input))
}
