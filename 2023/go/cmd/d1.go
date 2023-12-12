package main

import (
	"log"
	"strings"

	"github.com/vbruzzi/adventofcode/pkg/d1"
)

func main() {
	trie := d1.GetTrie()

	total := 0

	for _, line := range strings.Split(d1.GetInput(), "\n") {
		cur, err := d1.ParseLine(line, trie)
		log.Print(cur)
		if err != nil {
			log.Fatalf("error parsing line %v", err)
		}
		total += cur
	}

	log.Printf("%v", total)
}
