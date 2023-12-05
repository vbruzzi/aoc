package d1

import (
	"strconv"
	"strings"
)

type WordTrie struct {
	Value    string              `json:"value"`
	Children map[string]WordTrie `json:"children"`
}

func GetTrie() WordTrie {
	res := WordTrie{
		Value:    "",
		Children: map[string]WordTrie{},
	}

	values := []string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}

	for idx, val := range values {
		cur := res
		for _, char := range strings.Split(val, "") {
			cur = cur.Children[char]
		}
		cur.Value = strconv.Itoa(idx + 1)
	}

	return res
}
