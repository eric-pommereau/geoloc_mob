
/*
 * http://www.w3schools.com/html/html5_geolocation.asp
 * 
 * Geolocation datas
 * accuracy: 3931
 * altitude: null
 * altitude
 * Accuracy: null
 * heading: null
 * latitude: 48.8640493
 * longitude: 2.3310526
 * speed: null
 */

/**
 * Gestion des états de l'application et des globales
 * 
 * @constructor
 */

function Application(arg) {
    var geolocState = 0;
    this.watchID = 0; 
    this.debug = debug; 
    this.map = null; 
    this.markersLayer = null;
    this.geolocMarker = null;
    
    /** Allume ou étient l'état de géoloc */
    this.toggleGeoloc = (function () { 
        geolocState == 0 ? geolocState = 1 : geolocState == 0;  
    });
    
    /** Retourne l'état de géoloc */
    this.getGeolocState = (function () {
        return geolocState;
    });
 }

var app = new Application();

$(document).ready(function() {
    // Clicking geolocation button 
    $("#btn-geoloc").on("click", function(evt) {
        if(app.getGeolocState() == 0) {
            app.watchID = watchPosition();
            $( "#popupBasic" ).empty().append("<p>geoloc activée</p>");
            $( "#popupBasic" ).popup( "open", { x: evt.pageX, y: evt.pageY } );
            evt.preventDefault();
        }else {
            $( "#popupBasic" ).empty().append("<p>geoloc désactivée</p>");
            $( "#popupBasic" ).popup( "open", { x: evt.pageX, y: evt.pageY } );
            evt.preventDefault();
            navigator.geolocation.clearWatch(app.watchID);
        }
        
        app.toggleGeoloc();
    });
    
    app.map = new OpenLayers.Map({
        div : "map",
        layers : [new OpenLayers.Layer.OSM("Simple OSM Map")]
    });
    
    app.markersLayer = new OpenLayers.Layer.Markers( "Markers" );
    
    app.map.addLayer(app.markersLayer);
    
    var size = new OpenLayers.Size(21,25);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon = new OpenLayers.Icon('res/marker.png', size, offset);

    var lonlt = getMapLonLat({lon:2.1771, lat:48.4956, epsg:"EPSG:4326"});
    
    // Le marker pour la géolocalisation
    app.geolocMarker = new OpenLayers.Marker(lonlt,icon);
    app.markersLayer.addMarker(app.geolocMarker);
    
    app.map.setCenter(new OpenLayers.LonLat(2.1771, 48.4956).transform(new OpenLayers.Projection("EPSG:4326"), app.map.getProjectionObject()), 12);
});

// **********************************************
// Geolocation
function watchGeoloc() {
    if (navigator.geolocation) {
        this.watchID = navigator.geolocation.watchPosition(showGeolocPosition, errorWatch, {});
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

function getLocation() {
    if (navigator.geolocation) {
        console.info("lancement de la géoloc");
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

function watchPosition() {
    if (navigator.geolocation) {
        return navigator.geolocation.watchPosition(showGeolocPosition, showGeolocWatchError, {});
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function errorWatch(code, message) {
    console.error(code, message);
}

/**
 * Affiche la position sur la liste et sur la carte
 */

function showGeolocPosition(pos) {
    
    if(app.debug == 1) {
        console.log(pos);
    }
    
    // La liste d'infos
    $('#lat').empty().append(pos.coords.latitude);
    $('#lon').empty().append(pos.coords.longitude);
    $('#accuracy').empty().append(pos.coords.accuracy);
    
    if(! pos.coords.altitude == null) $('#altitude').empty().append(pos.coords.altitude);
    app.markersLayer.removeMarker(app.geolocMarker);
    
    
    // la carte
    var lonLat = getMapLonLat({lon:pos.coords.longitude, lat:pos.coords.latitude, epsg:"EPSG:4326"});
    
    app.geolocMarker = new OpenLayers.Marker(lonLat, app.geolocMarker.icon.clone());
    app.markersLayer.addMarker(app.geolocMarker);
    app.map.setCenter(lonLat);
}

/*
 * Transformer les transformer dans la projection de la carte
 *  {longitude:2.1771, latitude:48.4956, epsg:"EPSG:4326"}
 */
function getMapLonLat(coords) {
    return new OpenLayers.LonLat
        (   
            coords.lon, 
            coords.lat).transform(
            new OpenLayers.Projection("EPSG:4326"), 
            app.map.getProjectionObject()
        );
}

function showGeolocWatchError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
    }
}