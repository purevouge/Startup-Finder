// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
// initialize 
$(document).ready(function() {
	// wow animation
	new WOW().init();
});

// get data from csv
var companyName, founder, city, country, postalCode, street, photo, homePage, latitude, longitude=new Array();
var addcom = companyName + "<br>" + founder + "<br>" + photo + "<br>" + street + "," + city + "<br>" + postalCode + "," + country;
d3.csv("data/data.csv", function(data){
	var dataEnter = d3.select("body").selectAll("article").data(data).enter();	
	dataEnter.append("span").html(function(d){
	    companyName = JSON.stringify(d["Company Name"]).replace(/"/g, "");
		founder = JSON.stringify(d["Founder"]).replace(/"/g, "");
		city = JSON.stringify(d["City"]).replace(/"/g, "");
		country = JSON.stringify(d["Country"]).replace(/"/g, "");
		postalCode = JSON.stringify(d["Postal Code"]).replace(/"/g, "");
		street = JSON.stringify(d[" Street"]).replace(/"/g, "");
		photo = JSON.stringify(d["Photo"]).replace(/"/g, "");
		homePage = JSON.stringify(d["Home Page"]).replace(/"/g, "");
		latitude = JSON.stringify(d["Garage Latitude"]).replace(/"/g, "");
		longitude = JSON.stringify(d["Garage Longitude"]).replace(/"/g, "");
		alert(longitude);
		
		var val1 = d["Company Name"] + "," + d["Founder"] + "," + d["City"] + "," + d["Postal Code"] + "," + d[" Street"] + "," + d["Garage Latitude"] + "," + d["Garage Longitude"];
		return  val1;
});
// map 
    google.maps.event.addDomListener(window, 'load', init);
    var map;
    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(37.4224497,-122.08403290000001),
            zoom: 7,
            zoomControl: false,
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            scaleControl: false,
            scrollwheel: true,
            panControl: true,
            streetViewControl: false,
            draggable : true,
            overviewMapControl: true,
            overviewMapControlOptions: {
                opened: false,
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}],
        }
        var mapElement = document.getElementById('startup-finder');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
						[companyName, "<b>" + companyName + "</b><br>" + founder + "<br>" + '<img src=\"' + photo + '\"><br>' + street + "," + city + " - " + postalCode + "<br>" + country, 'undefined', 'undefined', homePage, latitude, longitude, 'https://mapbuildr.com/assets/img/markers/solid-pin-red.png'],
						
						['Apple', '<b>Apple Inc.</b><br><img src=\"http://mobilitylab.org/wp-content/uploads/2014/04/Apple.jpg\"><br>Steve Jobs & Steve Wozniak<br>1 Infinite Loop <br>CA 95014 - Cupertino<br>USA', 'undefined', 'undefined', 'apple.com', 37.3316936, -122.03021910000001, 'https://mapbuildr.com/assets/img/markers/solid-pin-red.png'],
						
						['Microsoft', '<b>Microsoft Inc.</b><br><img src=\"http://cdn.geekwire.com/wp-content/uploads/2015/09/mscampus-620x405.jpg\"><br>Bill Gates<br>One Microsoft Way <br>WA 98052-7329 - Redmond<br>USA', 'undefined', 'undefined', 'microsoft.com', 37.472189, -122.190191, 'https://mapbuildr.com/assets/img/markers/solid-pin-red.png']
        ];
        for (i = 0; i < locations.length; i++) {
			if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
			if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
			if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
           if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
           if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
            marker = new google.maps.Marker({
                icon: markericon,
                position: new google.maps.LatLng(locations[i][5], locations[i][6]),
                map: map,
                title: locations[i][0],
                desc: description,
                tel: telephone,
                email: email,
                web: web
            });
if (web.substring(0, 7) != "http://") {
link = "http://" + web;
} else {
link = web;
}
            bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
     }
 function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
      var infoWindowVisible = (function () {
              var currentlyVisible = false;
              return function (visible) {
                  if (visible !== undefined) {
                      currentlyVisible = visible;
                  }
                  return currentlyVisible;
               };
           }());
           iw = new google.maps.InfoWindow();
           google.maps.event.addListener(marker, 'click', function() {
               if (infoWindowVisible()) {
                   iw.close();
                   infoWindowVisible(false);
               } else {
                   var html= "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>"+title+"</h4><p>"+desc+"<p><a href='"+link+"'' >"+web+"<a></div>";
                   iw = new google.maps.InfoWindow({content:html});
                   iw.open(map,marker);
                   infoWindowVisible(true);
               }
        });
        google.maps.event.addListener(iw, 'closeclick', function () {
            infoWindowVisible(false);
        });
 }
}
});