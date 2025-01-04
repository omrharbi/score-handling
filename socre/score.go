package socre

import "fmt"

type Score struct {
	Name  string `json:"name"`
	Rank  string `json:"rank"`
	Score int    `json:"score"`
	Time  string `json:"time"`
}

func (s *Score) AddScore() error {
	err := add_Score(s.Name, s.Score, s.Time)
	if err != nil {
		return fmt.Errorf("error%v ", err)
	}
	return nil
}
