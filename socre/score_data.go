package socre

import "score-handling/database"

func add_Score(Name string, Score int, Time string) error {
	db := database.Config()
	stm := "INSERT INTO score(name,score,rank ,time) VALUES(?,?,?,?)"
	_, err := db.Exec(stm, Name, Score,   Time)
	if err != nil {
		return err
	}
	return nil
}
