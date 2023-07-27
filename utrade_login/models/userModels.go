package models

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Name     string `gorm:"unique"`
	Password string `json:"password"`
}

type UserStockSym struct {
	UserID   int
	StockSym string
}
