package main

import (
	"encoding/json"
	"fmt"

	"github.com/vbruzzi/adventofcode/pkg/d1"
)

func main() {
	trie := d1.GetTrie()
	res, _ := json.Marshal(trie.Children)
	fmt.Printf("%v", len(res))
	// for _, line := range strings.Split(d1.GetInput(), "\n") {

	// }
}
