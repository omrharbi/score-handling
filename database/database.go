package database

import (
	"database/sql"
	"fmt"
	"os"
)

func Int_database() error {
	if _, err := os.Open("app.db"); os.IsNotExist(err) {
		fmt.Println("Creating new database file...")
		db, err := sql.Open("sqlite3", "app.db")
		if err != nil {
			return fmt.Errorf("error Open database: %v", err)
		}
		defer db.Close()
		file, err := os.ReadFile("database/database.sql")
 		if err != nil {
			return fmt.Errorf("error To Create Database: %v", err)
		}

		_, err = db.Exec(string(file))
		if err != nil {
			return fmt.Errorf("failed to execute SQL: %v", err)
		}
	}
	return nil
}

func Config() *sql.DB {
	db, err := sql.Open("sqlite3", "app.db")
	if err != nil {
		fmt.Println("Error To Connect Database: ", err)
	}
	err = db.Ping()
	if err != nil {
		fmt.Println("Error to Ping Database: ", err)
	}
	return db
}
