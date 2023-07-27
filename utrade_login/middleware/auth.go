package middleware

import (
	"fmt"
	"net/http"
	"os"
	"time"
	"utrade_login/intializers"
	"utrade_login/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func Auth(c *gin.Context) {
	fmt.Print("safnksnc xcv v kjbvz  kvnjb ")
	tokenString, err := c.Cookie("Authorization")
	fmt.Println(tokenString)
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		var user models.User
		db := intializers.ConnectToDb()
		db.First(&user, claims["Sub"])
		fmt.Println(claims["Sub"])
		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		data := map[string]interface{}{
			"user":   user.Name,
			"userID": user.ID,
		}
		c.Set("data", data)
		var all models.UserStockSym
		var symbol []string
		db.Model(&all).Where("user_id = ?", user.ID).Pluck("stock_sym", &symbol)
		fmt.Print("this is the id of data", user.ID)
		c.JSON(http.StatusOK, gin.H{"name": user.Name, "id": user.ID, "symbol": symbol})
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
}
