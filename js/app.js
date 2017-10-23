  var map;
        var self = this;
        // Create a new blank array for all the listing markers.
        var markers = [];

        function initMap() {
            // Constructor creates a new map - only center and zoom are required.
            map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 35.6894875,
                    lng: 139.6917064
                },
                zoom: 13,
                mapTypeControl: false
            });

            // These are the real estate listings that will be shown to the user.
            // Normally we'd have these in a database instead.
			
            var locations = [{
                    title: 'Akihabara',
                    location: {
                        lat: 35.7022051,
                        lng: 139.7741464
                    }
                },
                {
                    title: 'Shinguku',
                    location: {
                        lat: 35.6251216,
                        lng: 139.7754499
                    }
                },
                {
                    title: 'Gundam statu',
                    location: {
                        lat: 35.6617773,
                        lng: 139.7040506
                    }
                },
                {
                    title: 'Shibua',
                    location: {
                        lat: 35.7100627,
                        lng: 139.8107004
                    }
                },
                {
                    title: 'Sky Tree Tower',
                    location: {
                        lat: 35.685175,
                        lng: 139.7527995
                    }
                }
            ];



            //orrigianl marker color TO DO Change it color
            var defultIcon = makeMarkerIcon('FFFF24');
            var highLightedIcont = makeMarkerIcon('0091ff');

            var largeInfowindow = new google.maps.InfoWindow();
            // The following group uses the location array to create an array of markers on initialize.
            for (var i = 0; i < locations.length; i++) {
                // Get the position from the location array.
                this.position = locations[i].location;
                this.title = locations[i].title;
                // Create a marker per location, and put into markers array.
                this.marker = new google.maps.Marker({
                    position: position,
                    title: title,
                    Icon: defultIcon,
                    animation: google.maps.Animation.DROP,
                    id: i
                });
                // Push the marker to our array of markers.
                markers.push(marker);
                // Create an onclick event to open an infowindow at each marker.
                marker.addListener('click', function() {
                    populateInfoWindow(this, largeInfowindow);
                });
                marker.addListener('mouseover', function() {
                    this.setIcon(highLightedIcont);
                });
                marker.addListener('mouseout', function() {
                    this.setIcon(defultIcon);
                });
            }
            showListings();
            google.maps.event.addListener(marker, 'click', function() {

                infowindow.open(map, marker);
            });

          
        }
        // This function populates the infowindow when the marker is clicked. We'll only allow
        // one infowindow which will open at the marker that is clicked, and populate based
        // on that markers position.
        this.populateInfoWindow = function(marker, infowindow) {
            if (infowindow.marker != marker) {
                infowindow.setContent('');
                infowindow.marker = marker;
                // Foursquare API Client
                clientID = "UV5EPTNSWETEEJ3XRUTQL30YHK4C4QGNHAHMPQXAUJXMXSHM";
                clientSecret =
                    "PIQKCATWHPU5MUMKDACLZLJHDSBAAWFJ0FEDXITYB3B0XKJG";
                // URL for Foursquare API
                var apiUrl = 'https://api.foursquare.com/v2/venues/search?ll=' +
                   this. location.lat + ',' + this. location.lng + '&client_id=' + clientID +
                    '&client_secret=' + clientSecret + '&query=' + marker.title +
                    '&v=20170708' + '&m=foursquare';
                // Foursquare API
                $.getJSON(apiUrl).done(function(marker) {
                    var response = marker.response.venues[0];
                    self.street = response.location.formattedAddress[0];
                    self.city = response.location.formattedAddress[1];
                    self.zip = response.location.formattedAddress[3];
                    self.country = response.location.formattedAddress[4];
                    self.category = response.categories[0].shortName;

                    self.htmlContentFoursquare =
                        '<h5 class="iw_subtitle">(' + self.category +
                        ')</h5>' + '<div>' +
                        '<h6 class="iw_address_title"> Address: </h6>' +
                        '<p class="iw_address">' + self.street + '</p>' +
                        '<p class="iw_address">' + self.city + '</p>' +
                        '<p class="iw_address">' + self.zip + '</p>' +
                        '<p class="iw_address">' + self.country +
                        '</p>' + '</div>' + '</div>';

                    infowindow.setContent(self.htmlContent + self.htmlContentFoursquare);
                }).fail(function() {
                    // Send alert
                    alert(
                        "There was an issue loading the Foursquare API. Please refresh your page to try again."
                    );
                });

                
            }
        };


        // This function will loop through the markers array and display them all.
        function showListings() {
            var bounds = new google.maps.LatLngBounds();
            // Extend the boundaries of the map for each marker and display the marker
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
                bounds.extend(markers[i].position);
            }
            map.fitBounds(bounds);
        }

 
    
	 
        function makeMarkerIcon(markerColor) {
            var markerImage = new google.maps.MarkerImage(
                'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
                '|40|_|%E2%80%A2',
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34),
                new google.maps.Size(21, 34));
            return markerImage;
        };
		