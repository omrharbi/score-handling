package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	database "score-handling/database"
	scorehandling "score-handling/score-handling"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	err := database.Int_database()
	if err != nil {
		fmt.Println(err.Error())
	}

	http.HandleFunc("/api/score", scorehandling.Scorehandling)
	fmt.Println("Start server localhost:8080")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "../frontend/index.html")
	})
	http.HandleFunc("/static/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
			return
		}

		suffix := r.URL.Path[len("/static/"):]

		if strings.Contains(suffix, ".css/") || strings.Contains(suffix, ".js/") || strings.Contains(suffix, ".jpg/") {
			http.Error(w, "Not Found", http.StatusNotFound)
			return
		}

		if strings.Contains(suffix, ".js") {
			http.ServeFile(w, r, "../frontend/static/"+suffix)
			return
		}
		// fmt.Println( strings.Contains(suffix, ".jpg"))
		// if strings.Contains(suffix, ".jpg") {
		// 	http.ServeFile(w, r, "../frontend/static/"+suffix)
		// 	return
		// }
 

		http.ServeFile(w, r, "../frontend/static/"+suffix)
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
