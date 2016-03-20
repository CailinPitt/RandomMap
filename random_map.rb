#!/usr/bin/env ruby

require 'rubygems'
require 'chatterbot/dsl'
require 'static_map'

# remove this to get less output when running your bot
verbose
  
continent = rand(0..6)
# Pick which continent to get aerial view of

lat = 0
long = 0
# Initialize latitude and longitude

if continent == 0
	lat = rand(7.208889...72.0)
	long = rand(-124.733056...-55.620833)
	# Get random latitude and longitude in North America
elsif continent == 1
	lat = rand(-53.896389...12.458611)
	long = rand(-81.328611...-34.793056)
	# Get random latitude and longitude in South America
elsif continent == 2
	lat = rand(-46.981944...37.346983)
	long = rand(17.4467...51.25)
	# Get random latitude and longitude in Africa
elsif continent == 3
	lat = rand(36.0042...71.133889)
	long = rand(-9.500556...66.618056)
	# Get random latitude and longitude in Europe
elsif continent == 4
	lat = rand(1.2661...77.7333)
	long = rand(-26.0640...169.763162)
	# Get random latitude and longitude in Asia
	# Still isn't restricted to Asia 100% of time
elsif continent == 5
	lat = rand(-43.643611...10.6833)
	long = rand(113.155...153.6389)
	# Get random latitude and longitude in Australia
else
	lat = rand(-90.000000000...90.000000000)
	long = rand(-180.000000000...180.000000000)
	# Get random latitude and longitude of somewhere in the world (including Antartica)
end
puts "#{lat} #{long}"
image = StaticMap::Image.new({
size: '640x640',
sensor: false,
center: "#{lat.to_s} #{long.to_s}",
maptype: 'satellite',
zoom: 12,
title: 'A map',
alt: 'Alt text for img html',
path: './map.png'
})


image.save 
# save map to disk with path option

search "a" do |tweet|
	client.update_with_media "Latitude: " + lat.to_s + "\nLongitude: " + long.to_s, File.open('./map.png'), in_reply_to_status_id:tweet.id
	exit
	# Searches for a tweet that contains letter 'a' in order to send map tweet. Dumb way to trigger tweet event, will change.
end
