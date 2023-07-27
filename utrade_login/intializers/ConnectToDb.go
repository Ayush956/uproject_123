package intializers

import (
	"fmt"
	"net/http"
	"os"
	"time"
	"utrade_login/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectToDb() *gorm.DB {
	// https://github.com/go-gorm/postgres
	DB, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  "user=postgres password=Ayush@26 dbname=User port=5432 sslmode=prefer TimeZone=Asia/Shanghai",
		PreferSimpleProtocol: true, // disables implicit prepared statement usage
	}), &gorm.Config{})

	if err != nil {
		panic(" Failed to connect to DB")
	}

	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.UserStockSym{})
	return DB
}

func SignUp(c *gin.Context) {
	var body models.User
	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "fdfv",
		})

		return
	}

	// hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{
	// 		"error": "Failed to hash password",
	// 	})
	// 	fmt.Println("password")
	// 	return
	// }
	user := models.User{Name: body.Name, Password: body.Password}
	fmt.Println(&user)
	db := ConnectToDb()
	result := db.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
		fmt.Println("create")
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": "user created"})
}

func LogIn(c *gin.Context) {
	var body models.User
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
		return
	}

	db := ConnectToDb()
	var user models.User
	result := db.Where("Name = ?", body.Name).First(&user)
	if result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	// Check if the provided password matches the stored password
	if body.Password != user.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}
	var all models.UserStockSym
	var symbol []string
	db.Model(&all).Where("user_id = ?", user.ID).Pluck("stock_sym", &symbol)
	fmt.Println(user.ID)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"Sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create Token"})
		return
	}
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24, "/", "", false, false)

	c.JSON(http.StatusOK, gin.H{"data": symbol, "ID": user.ID, "Name": user.Name})
}

func Add_Sym(c *gin.Context) {
	var symbol models.UserStockSym
	if err := c.ShouldBindJSON(&symbol); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
		return
	}
	db := ConnectToDb()
	user := models.UserStockSym{UserID: symbol.UserID, StockSym: symbol.StockSym}
	if err := db.Where("user_id = ? AND stock_sym = ?", symbol.UserID, symbol.StockSym).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			// No record with the specified ID and symbol found
			result := db.Create(&user)
			if result.Error != nil {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Failed to create user",
				})
				fmt.Println("create")
				return
			}

			fmt.Println("Record not found.")
		} else {
			fmt.Println("Error:", err)
		}
	} else {
		// Record with the specified ID and symbol found
		fmt.Println("Record found:")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Data Already Exist"})
	}

}

func Del_Sym(c *gin.Context) {
	var symbol models.UserStockSym
	if err := c.ShouldBindJSON(&symbol); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data"})
		return
	}
	db := ConnectToDb()
	user := models.UserStockSym{UserID: symbol.UserID, StockSym: symbol.StockSym}

	result := db.Delete(&user, db.Where("user_id = ? AND stock_sym = ?", symbol.UserID, symbol.StockSym).First(&user))
	fmt.Println(&user)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Not Deleted",
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Deleted"})
	return

}
