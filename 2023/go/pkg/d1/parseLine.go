package d1

import (
	"strconv"
)

func ParseLine(line string, trie *WordTrie) (int, error) {
	res := []string{}
	l := 0

	for l < len(line) {
		cur := trie
		for curIdx := l; curIdx < len(line); curIdx++ {
			cur = cur.FindRune(rune(line[curIdx]))
			if cur == nil {
				break
			}
			if cur.Value != nil {
				res = append(res, *cur.Value)
				break
			}
		}
		l += 1

	}
	temp, err := strconv.Atoi(res[0] + res[len(res)-1])

	if err != nil {
		return 0, err
	}

	return temp, nil
}
