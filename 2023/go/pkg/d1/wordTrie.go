package d1

import (
	"log"
	"strconv"
	"strings"
)

type WordTrie struct {
	Value    *string            `json:"value"`
	Children map[rune]*WordTrie `json:"children"`
}

func getNewWordTrie() *WordTrie {
	return &WordTrie{
		Value:    nil,
		Children: map[rune]*WordTrie{},
	}
}

func (w *WordTrie) insertWord(word string, val int) {
	cur := w
	for _, char := range word {
		_, ok := cur.Children[char]
		if !ok {
			cur.Children[char] = getNewWordTrie()
		}

		cur = cur.Children[char]
	}
	res := strconv.Itoa(val)
	cur.Value = &res
}

func GetTrie() *WordTrie {
	res := getNewWordTrie()

	values := []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}

	for idx, val := range values {
		res.insertWord(val, idx+1)
	}

	res.insertWord("1", 1)
	res.insertWord("2", 2)
	res.insertWord("3", 3)
	res.insertWord("4", 4)
	res.insertWord("5", 5)
	res.insertWord("6", 6)
	res.insertWord("7", 7)
	res.insertWord("8", 8)
	res.insertWord("9", 9)

	return res
}

func (w *WordTrie) Print(spaces int) {
	for k, v := range w.Children {
		s := strings.Repeat(" ", spaces*2)
		log.Printf("%v %v\n", s, k)
		v.Print(spaces + 1)
	}
}

func (w *WordTrie) FindRune(char rune) *WordTrie {
	if val, ok := w.Children[char]; ok {
		return val
	}

	return nil
}
