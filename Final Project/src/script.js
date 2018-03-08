// console.log("testing");

$(document).ready(function(){
  var element = document.getElementById('foursquare-map');
  var options = {
    center: new google.maps.LatLng(43.6532, -79.3832),
    zoom: 10,
  }//object literal but something else
  var map = new google.maps.Map(element, options) //executing map constructor; accessing Google Maps API properties within properties or something; new is an object literal
  //writing properties element and options
  $.ajax({ //d oes not matter which order
    type: 'GET',
    dataType: 'jsonp',
    cache: false,
    url: 'https://api.foursquare.com/v2/venues/search?client_id=UYXWDL4J1XESVFDVL4IQS4FKZJVLMCOF0SKNRRWRBBSC0LPE&client_secret=IFYVZGRK3EVI4DF1JEND5ZHC1K15NP5GAZ3NKXPOVCELZQSL&v=20180212&intent=browse&near=Toronto&query=craft-brewery&categoryId=50327c8591d4c4b30a586d5d,5370f356bcbc57f1066c94c2,56aa371ce4b08b9a8d57356c,4bf58dd8d48988d117941735',

    success: function(response){
      console.log(response);

    response.response.venues.forEach(function(venue){ //venue is a variable name that can be changed
        var latLng = new google.maps.LatLng(venue.location.lat, venue.location.lng)

        var marker = new google.maps.Marker({ //pass an object literal
          map: map,
          position: latLng,
          icon: 'images/pitcher-icon.png',
        })

        var infowindow = new google.maps.InfoWindow({
          content: venue.name +'<br>'+ venue.location.address+'<br>'+venue.contact.formattedPhone+'<br>',

        })

        google.maps.event.addListener(infowindow, 'closeclick', function() {
          map.panTo(marker.position);
          // map.setZoom(5);
        })


        google.maps.event.addListener(marker, 'click', function ClickHandler() {
          map.setCenter(marker.position)
          map.setZoom(13)
          infowindow.open(map, marker)
        })

      })
        } //venue provided by the foursquare api
  })


  var lat = "";
  var lng = "";
  var appendeddatahtml = "";
	var phone = "";
	var rating = "";
	var icon = "";
	var address = "";
  var photos ="";


//DISPLAY CRAFT BREWERIES
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    console.log("Geolocation is not supported by this browser.");
}

function showPosition(position) {
  showLocation_lat = position.coords.latitude;
  showLocation_long = position.coords.longitude;
  console.log(showLocation_lat);
  console.log(showLocation_long);
  getBeer();
}

// $("#one").click(function() {
//
//   result = result.sort(function(a, b){
//   return b.venue.rating - a.venue.rating;
//   getBeer(); }) // end of result
// }); // end of click


function getBeer() {
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    cache: false,
    url: "https://api.foursquare.com/v2/venues/explore?client_id=UYXWDL4J1XESVFDVL4IQS4FKZJVLMCOF0SKNRRWRBBSC0LPE&client_secret=IFYVZGRK3EVI4DF1JEND5ZHC1K15NP5GAZ3NKXPOVCELZQSL&v=20180212&intent=checkin&ll="+showLocation_lat+","+showLocation_long+"&query=craft-brewery&categoryId=50327c8591d4c4b30a586d5d&venuePhotos=1",

    success: function(response){
      console.log(response);
      $("#craftbeer").show();
      var result = response.response.groups[0].items;
      $("#craftbeer").html("");

    //   result_rating = result_distance.sort(function(a, b){
    // return b.venue.rating - a.venue.rating;
// });
    console.log(result);

//when clicked distance result = result_
//when clicked rating result = result_sorted


// append data for each venue
				$.each( result, function() {

					if (this.venue.contact.formattedPhone) {
						phone = "Phone:"+this.venue.contact.formattedPhone;
					} else {
						phone = "";
					}

					if (this.venue.location.address) {
						address = '<p class="subinfo">'+this.venue.location.address+'<br>';
					} else {
						address = "";
					}

					if (this.venue.rating) {
						rating = '<span class="rating">'+this.venue.rating+'</span>';
					}
          var suffix = this.venue.photos.groups[0].items[0].suffix;
          var imgPrefix = "https://igx.4sqi.net/img/general/300x250";



          appendeddatahtml = '<div class="craftbeer element"><h2><span>'+this.venue.name+'<img src="'+icon+'"> '+rating+'</span></h2>'+address+phone+'</p><p><strong>Total Checkins:</strong> '+this.venue.stats.checkinsCount+'</p>'+'<img src="'+ imgPrefix + this.venue.photos.groups[0].items[0].suffix +
      '"/>'+'</div>';
        $("#craftbeer").append(appendeddatahtml);



      }); //end of each
}
        }) //end of ajax



} // end of beer

// $("#two").click(function() {
//           result = result.sort(function(a, b){
//           return b.venue.rating - a.venue.rating;
//           getBeer();    }) // end of result
//         }); // end of click


});
