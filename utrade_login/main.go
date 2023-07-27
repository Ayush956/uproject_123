package main

import (
	// "utrade_login/controllers"
	"utrade_login/intializers"
	"utrade_login/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	intializers.LoadEnvVariables()
	// intializers.ConnectToDb()
	// intializers.SyncDatabase()
}

func main() {

	r := gin.Default()
	// r.Use(cors.Default())
	// r.Use(cors.Default())
	// r.Use(middleware.Cors())
	config := cors.Config{
		AllowOrigins:     []string{"http://localhost:4200"}, // Replace with the allowed origin(s) of your Angular app
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type", "Cookie"}, // Include "Cookie" header
		ExposeHeaders:    []string{"Content-Length", "Authorization"},
		AllowCredentials: true, // This enables sending cookies with cross-origin requests
	}
	r.Use(cors.New(config))
	r.POST("/signup", intializers.SignUp)
	r.POST("/login", intializers.LogIn)
	r.POST("/add_sym", intializers.Add_Sym)
	r.POST("/del_sym", intializers.Del_Sym)
	r.GET("/validate", middleware.Auth)
	r.Run()

}
