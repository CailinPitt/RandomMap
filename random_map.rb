#!/usr/bin/env ruby

require 'rubygems'
require 'static_map'
require 'twitter'
  
continent = rand(0..5)
# Pick which continent to get aerial view of

lat = 0 #North-South
long = 0 #East-West
message = "Somewhere near"
# Initialize latitude and longitude

if continent == 0

	lat = rand(30.208889...50.0)
	long = rand(-118.733056...-76.620833)
	message = message + " North America"
	# Get random latitude and longitude in North America
elsif continent == 1
	lat = rand(-13.896389...1.458611)
	long = rand(-75.328611...-39.793056)
	message = message + " South America"
	# Get random latitude and longitude in South America
elsif continent == 2
	lat = rand(-19.981944...21.346983)
	long = rand(14.4467...34.25)
	message = message + " Africa"
	# Get random latitude and longitude in Africa
elsif continent == 3
	lat = rand(43.0042...48.0)
	long = rand(2.500556...44.618056)
	message = message + " Europe"
	# Get random latitude and longitude in Europe
elsif continent == 4
	lat = rand(21.2661...49.7333)
	long = rand(70.0...106.0)
	message = message + " Asia"
	# Get random latitude and longitude in Asia
	# Still isn't restricted to Asia 100% of time
else
	lat = rand(-31.643611...-20.6833)
	long = rand(116.155...145.277736)
	message = message + " Australia"
	# Get random latitude and longitude in Australia
	
=begin
	lat = rand(-90.000000000...-70.000000000)
	long = rand(-140.000000000...50.0)
	message = message + " Antarctica"
=end
	# Get random latitude and longitude in Antarctica
	
	# Having issues getting this case to work 100%, so I'm removing it for now
end

image = StaticMap::Image.new({
size: '3000x3000',
sensor: false,
center: "#{lat.to_s} #{long.to_s}",
maptype: 'satellite',
zoom: 15,
title: 'A map',
alt: 'Alt text for img html',
path: './map.png'
})
# Setup Google Static map

image.save 
# save map to disk with path option

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = ENV["consumer_key_r"]
  config.consumer_secret     = ENV["consumer_secret_r"]
  config.access_token        = ENV["access_token_key_r"]
  config.access_token_secret = ENV["access_token_secret_r"]
end

#client.update_with_media(message + "\nLatitude: " + lat.to_s + "\nLongitude: " + long.to_s, File.open('./map.png'))

client.update_with_media(":)", lat: 37.7821120598956, long: -122.400612831116, display_coordinates: true, File.open('./map.png'))

