package main

import (
	"log"
	"strconv"
	"strings"

	"github.com/vbruzzi/adventofcode/pkg/d3"
)

func splitLines(input string) []string {
	return strings.Split(input, "\n")
}

var nums = map[rune]int{
	'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
}

func getNumToRight(row string, idx int) string {
	cur := ""
	for i := idx; i < len(row); i++ {
		temp := rune(row[i])
		if _, ok := nums[temp]; ok {
			cur += string(temp)
		} else {
			break
		}
	}

	return cur
}

func getNumToLeft(row string, idx int) string {
	cur := ""

	for i := idx; i >= 0; i-- {
		temp := rune(row[i])
		if _, ok := nums[temp]; ok {
			cur = string(temp) + cur
		} else {
			break
		}
	}

	return cur
}

func getNumsFromRow(row string, idx int) []string {
	l := getNumToLeft(row, idx-1)
	r := getNumToRight(row, idx+1)
	// if the char in the middle is a num, we only return one big number
	if _, ok := nums[rune(row[idx])]; ok {
		return []string{l + string(row[idx]) + r}
	}

	res := []string{}

	if l != "" {
		res = append(res, l)
	}

	if r != "" {
		res = append(res, r)
	}

	return res
}

func main() {
	input := splitLines(d3.GetInput())
	gear := '*'
	total := 0

	for y, line := range input {
		for x, char := range line {
			if char != gear {
				continue
			}

			cur := []string{}

			// up
			if y > 0 {
				temp := getNumsFromRow(input[y-1], x)
				cur = append(cur, temp...)
			}

			// down
			if y < len(input)-1 {
				temp := getNumsFromRow(input[y+1], x)
				cur = append(cur, temp...)
			}

			// left
			if x > 0 {
				if temp := getNumToLeft(line, x-1); temp != "" {
					cur = append(cur, temp)
				}
			}

			// right
			if x < len(line)-1 {
				if temp := getNumToRight(line, x+1); temp != "" {
					cur = append(cur, temp)
				}
			}

			if len(cur) == 2 {
				a, err := strconv.Atoi(cur[0])
				if err != nil {
					log.Fatalf("%v", err)
				}
				b, err := strconv.Atoi(cur[1])
				if err != nil {
					log.Fatalf("%v", err)
				}

				total += a * b
			}
		}

	}
	log.Printf("%v", total)
}
