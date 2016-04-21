#!/usr/bin/env ruby

require 'rubygems'
require 'chatterbot/dsl'
require 'static_map'

# remove this to get less output when running your bot
verbose
  
continent = rand(0..6)
# Pick which continent to get aerial view of

lat = 0 #North-South
long = 0 #East-West
message = "Somewhere near"
# Initialize latitude and longitude

if continent == 0
	lat = rand(30.208889...72.0)
	long = rand(-118.733056...-55.620833)
	message = message + " North America"
	# Get random latitude and longitude in North America
elsif continent == 1
	lat = rand(-53.896389...12.458611)
	long = rand(-81.328611...-60.793056)
	message = message + " South America"
	# Get random latitude and longitude in South America
elsif continent == 2
	lat = rand(-32.981944...30.346983)
	long = rand(10.4467...32.25)
	message = message + " Africa"
	# Get random latitude and longitude in Africa
elsif continent == 3
	lat = rand(40.0042...57.133889)
	long = rand(-8.500556...35.618056)
	message = message + " Europe"
	# Get random latitude and longitude in Europe
elsif continent == 4
	lat = rand(20.2661...60.7333)
	long = rand(70.0...118.0)
	message = message + " Asia"
	# Get random latitude and longitude in Asia
	# Still isn't restricted to Asia 100% of time
elsif continent == 5
	lat = rand(-43.643611...-18.6833)
	long = rand(113.155...153.6389)
	message = message + " Australia"
	# Get random latitude and longitude in Australia
else
	lat = rand(-90.000000000...-70.000000000)
	long = rand(-140.000000000...50.0)
	message = message + " Antarctica"
	# Get random latitude and longitude of somewhere in the world (including Antartica)
	
	# I made this case
end
puts "#{lat} #{long}"
puts continent
image = StaticMap::Image.new({
size: '640x640',
sensor: false,
center: "#{lat.to_s} #{long.to_s}",
maptype: 'satellite',
zoom: 15,
title: 'A map',
alt: 'Alt text for img html',
path: './map.png'
})


image.save 
# save map to disk with path option

search "a" do |tweet|
	client.update_with_media message + "\nLatitude: " + lat.to_s + "\nLongitude: " + long.to_s, File.open('./map.png'), in_reply_to_status_id:tweet.id
	exit
	# Searches for a tweet that contains letter 'a' in order to send map tweet. Dumb way to trigger tweet event, will change.
end
