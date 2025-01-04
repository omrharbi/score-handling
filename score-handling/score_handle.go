package scorehandling

import (
	"encoding/json"
	"fmt"
	"net/http"

	"score-handling/socre"
)

func Scorehandling(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusBadRequest)
		return
	} 
	sc := socre.Score{}
	err := json.NewDecoder(r.Body).Decode(&sc)
	if err != nil {
		fmt.Println("Error decoding JSON:", err)
		return
	}
	err = sc.AddScore()
	if err != nil {
		fmt.Println(err)
		return
	}
}
