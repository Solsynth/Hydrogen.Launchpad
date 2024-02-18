package main

import (
	"code.smartsheep.studio/hydrogen/launchpad/pkg/server"
	"os"
	"os/signal"
	"syscall"

	launchpad "code.smartsheep.studio/hydrogen/launchpad/pkg"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"
)

func init() {
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stdout})
}

func main() {
	// Configure settings
	viper.AddConfigPath(".")
	viper.AddConfigPath("..")
	viper.SetConfigName("settings")
	viper.SetConfigType("toml")

	// Load settings
	if err := viper.ReadInConfig(); err != nil {
		log.Panic().Err(err).Msg("An error occurred when loading settings.")
	}
	// Server
	server.NewServer()
	go server.Listen()

	// Messages
	log.Info().Msgf("Launchpad v%s is started...", launchpad.AppVersion)

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Info().Msgf("Launchpad v%s is quitting...", launchpad.AppVersion)
}
