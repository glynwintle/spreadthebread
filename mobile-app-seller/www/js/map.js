
$(document).on('change', '#mode', function(e) {
    e.preventDefault();
    calculateRoute();
});

var directionDisplay,
    directionsService,
    map;

function initialize() 
{
  // Instantiate a directions service.
  directionsService = new google.maps.DirectionsService();

  // Create a map and center it on Canary Wharf.
  var manhattan = new google.maps.LatLng(51.503293, -0.018521);
  var mapOptions = {
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: manhattan
  }
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  // Create a renderer for directions and bind it to the map.
  var rendererOptions = {
    map: map
  }
  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)

  // Instantiate an info window to hold step text.
  stepDisplay = new google.maps.InfoWindow();  

}

function calculateRoute() 
{
	var selectedMode = $("#mode").val(),
	    start = "Canary Wharf, London",
            end = SANDWICH_DATA[0].postcode;
//="19 Rosefield Gardens, London"
	if(start == '' || end == '')
	{
	    // cannot calculate route
	    $("#results").hide();
	    return;
	}
	else
	{
	    var request = {
		origin:start, 
		destination:end,
		travelMode: google.maps.DirectionsTravelMode[selectedMode]
	    };

	    directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
		    directionsDisplay.setDirections(response); 
		    $("#results").show();
		    /*
		        var myRoute = response.routes[0].legs[0];
		        for (var i = 0; i < myRoute.steps.length; i++) {
		            alert(myRoute.steps[i].instructions);
		        }
		    */
		}
		else {
		    $("#results").hide();
		}
	    });

	}

}

$(document).on("pageshow", "#map_page", function() {
    initialize();

//e.preventDefault();
    calculateRoute();

});

