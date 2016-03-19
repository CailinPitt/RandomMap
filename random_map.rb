#!/usr/bin/env ruby

require 'rubygems'
require 'chatterbot/dsl'
require 'static_map'

# remove this to get less output when running your bot
verbose
  
lat = rand(-90.000000000...90.000000000)
long = rand(-180.000000000...180.000000000)
# Get random latitude and longitude

image = StaticMap::Image.new({
size: '640x640',
sensor: false,
center: "#{lat.to_s} #{long.to_s}",
maptype: 'satellite',
zoom: 10,
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
