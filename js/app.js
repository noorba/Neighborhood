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



      var locations = [{


              title: 'Akihabara',
              lat: 35.7022051,
              lng: 139.7741464,

          },
          {
              title: 'Shinguku',

              lat: 35.6251216,
              lng: 139.7754499

          },
          {
              title: 'Gundam statu',

              lat: 35.6617773,
              lng: 139.7040506

          },
          {
              title: 'Shibua',

              lat: 35.7100627,
              lng: 139.8107004

          },
          {
              title: 'Sky Tree Tower',

              lat: 35.685175,
              lng: 139.7527995

          }
      ];




      //orrigianl marker color TO DO Change it color
      var defultIcon = makeMarkerIcon('FFFF24');
      var highLightedIcont = makeMarkerIcon('0091ff');

      var largeInfowindow = new google.maps.InfoWindow();
      // The following group uses the location array to create an array of markers on initialize.
      for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          this.title = locations[i].title;
          this.markerLat = locations[i].lat;
          this.markerLng = locations[i].lng;

          // Create a marker per location, and put into markers array.
          this.marker = new google.maps.Marker({
              position: {
                  lat: this.markerLat,
                  lng: this.markerLng
              },
              title: title,
              Icon: defultIcon,
              lat: this.markerLat,
              lng: this.markerLng,
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

          largeInfowindow.open(map, marker);
      });


  }
  // This function populates the infowindow when the marker is clicked.
  function populateInfoWindow(marker, infowindow) {
      if (infowindow.marker != marker) {
          infowindow.setContent('');
          infowindow.marker = marker;
          // Foursquare API Client
          clientID = "UV5EPTNSWETEEJ3XRUTQL30YHK4C4QGNHAHMPQXAUJXMXSHM";
          clientSecret =
              "PIQKCATWHPU5MUMKDACLZLJHDSBAAWFJ0FEDXITYB3B0XKJG";
          // URL for Foursquare API
          var Url = 'https://api.foursquare.com/v2/venues/search?ll=' +
              marker.lat + ',' + marker.lng + '&client_id=' + clientID +
              '&client_secret=' + clientSecret + '&query=' + marker.title +
              '&v=20170708' + '&m=foursquare';
          // Foursquare API
          $.getJSON(Url).done(function(marker) {
              var response = marker.response.venues[0];
              this.street = response.location.formattedAddress[0];
              this.city = response.location.formattedAddress[1];
              this.country = response.location.formattedAddress[4];
              this.category = response.categories[0].shortName;

              this.htmlContentFoursquare =
                  '<h5>(' + this.category +
                  ')</h5>' + '<div>' +
                  '<h6> Address: </h6>' +
                  '<p>' + this.street + '</p>' +
                  '<p>' + this.city + '</p>' +
                  '<p>' + this.country +
                  '</p>' + '</div>' + '</div>';

              infowindow.setContent(this.htmlContent + this.htmlContentFoursquare);
          }).fail(function() {
              // Send alert
              alert(
                  "There was an issue loading the Foursquare API. Please refresh your page to try again."
              );
          });
          // to open each infowindow in the rigt postion 
          infowindow.open(map, marker);

          infowindow.addListener('closeclick', function() {
              infowindow.marker = null;
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



  //change the marker style
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

  function AppViewModel() {

  };


  function startApp() {
      ko.applyBindings(new AppViewModel());
  };