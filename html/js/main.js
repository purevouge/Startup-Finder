$(".intro .btn").click(function() {
	$('.intro').addClass('animated zoomOut sndBck');
	$('.map').addClass('animated slideInUp visible');
});

// map 
var map;
var markers = [];
var infowindow = new google.maps.InfoWindow();
google.maps.event.addDomListener(window, 'load', init);

function init() {
	// map options
	var mapOptions = {
    	center: new google.maps.LatLng(37.4224497,-122.08403290000001),
        zoom: 10,
        zoomControl: false,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        scaleControl: false,
        scrollwheel: true,
        panControl: true,
        streetViewControl: false,
        draggable : true,
        overviewMapControl: true,
        overviewMapControlOptions: { opened: false},
       	mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}],
    }
			
    var mapElement = document.getElementById('startup-finder');
    map = new google.maps.Map(mapElement, mapOptions);
	getMarkersDetails();
}
// get data from csv
function getMarkersDetails(){
	d3.csv("data/data.csv", function(data){
		var dataEnter = d3.select("body").selectAll("article").data(data).enter();	
		dataEnter.append("span").html(function(d){
			var companyName = JSON.stringify(d["Company Name"]).replace(/"/g, "");
			var founder = JSON.stringify(d["Founder"]).replace(/"/g, "");
			var city = JSON.stringify(d["City"]).replace(/"/g, "");
			var country = JSON.stringify(d["Country"]).replace(/"/g, "");
			var postalCode = JSON.stringify(d["Postal Code"]).replace(/"/g, "");
			var street = JSON.stringify(d[" Street"]).replace(/"/g, "");
			var photo = JSON.stringify(d["Photo"]).replace(/"/g, "");
			var homePage = JSON.stringify(d["Home Page"]).replace(/"/g, "");
			var latitude = JSON.stringify(d["Garage Latitude"]).replace(/"/g, "");
			var longitude = JSON.stringify(d["Garage Longitude"]).replace(/"/g, "");
	
			addMarker(latitude, longitude, companyName, founder, city, country, postalCode, street, photo, homePage);
			/*alert(companyName);*/
		});
	});		
}
// add map markers
function addMarker(latitude, longitude, companyName, founder, city, country, postalCode, street, photo, homePage){					
	var	description = "<b>" + companyName + "</b><br>" + founder + "<br>" + '<img src=\"' + photo + '\"><br>' + street + "<br>" + city + " - " + postalCode + "<br>" + country + "<br> <a href=" + homePage + "target='_blank' title='companyName'>" + homePage + "</a>";
	var	web = homePage;
	var	mainIcon = 'img/icons/solid-pin-normal.png';
	var	selectedIcon = 'img/icons/solid-pin-active.png';
	if (web.substring(0, 7) != "http://") {link = "http://" + web;} else {link = web;}
	var marker = new google.maps.Marker({
		icon: mainIcon,
		position: new google.maps.LatLng(latitude, longitude),
		map: map,
		title: companyName,
		desc: description,
		web: web,
		selected: false
	});			 
	markers.push(marker);	 
	var markerIndex =  parseInt(markers.length) - 1; 
	google.maps.event.addListener(markers[markerIndex], 'click', function() {
		//open info window
		infowindow.setContent(description);
		infowindow.open(map, marker);
		for(i=0; i < markers.length; i++){
			if(markers[i].selected){
				markers[i].selected = false;
				markers[i].setIcon(mainIcon);
				break;
			}
		}
		markers[markerIndex].selected = true;
		markers[markerIndex].setIcon(selectedIcon);
	});
}
