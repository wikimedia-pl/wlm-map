var monument = {};
monument.array = new Array();

monument.elements = {};
monument.layer = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 90,
	/*removeOutsideVisibleBounds: true*/
}); //layer for elements

monument.obj = function(coord, name, city) {
    this.coord = coord;
    this.name = name;
    this.city = city;
};

monument.icon = L.icon({
    iconUrl: 'img/marker.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [31, 41],
    iconAnchor: [15, 41],
    popupAnchor: [0, -41]
});
monument.icon_nofoto = L.icon({
    iconUrl: 'img/marker_nofoto.png',
    shadowUrl: 'img/marker-shadow.png',
    iconSize: [31, 41],
    iconAnchor: [15, 41],
    popupAnchor: [0, -41]
});

var map;

$(document).ready(function() {
    var osmapa = L.tileLayer('//{s}.osm.trail.pl/osmapa.pl/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: 18,
        opacity: 0.8
    });
	
    var cloudmade = L.tileLayer('http://129.206.74.245:8001/tms_r.ashx?x={x}&y={y}&z={z} ', {
        attribution: '',
        maxZoom: 18,
        opacity: 1
    });
	
    map = L.map('map', {
        center: [51.937, 18.951],
        zoom: 6,
        layers: [cloudmade, monument.layer],
        minZoom: 3
    });
    map.on('dragend', function(e) {
        map.query();
    });
    map.on('zoomend', function(e) {
        map.query();
    });
    new L.Hash(map);
    L.control.layers({
            "Mapa" : cloudmade,
            "Osmapa" : osmapa
    }, {}).addTo(map);
    map.attributionControl.setPrefix('');
    /*map.locate({setView: true, maxZoom: 16});*/

    /*
     * map functions
     */
    map.fitZoom = function(array) {
        var counter = 0;
        for(var i in array) {
            if(counter === 0) {
                var minLat = array[i].coord.lat; var maxLat = array[i].coord.lat;
                var minLon = array[i].coord.lng; var maxLon = array[i].coord.lng;
            }
            if(array[i].coord.lat>maxLat) maxLat = array[i].coord.lat;
            if(array[i].coord.lat<minLat) minLat = array[i].coord.lat;
            if(array[i].coord.lng>maxLon) maxLon = array[i].coord.lng;
            if(array[i].coord.lng<minLon) minLon = array[i].coord.lng;
            ++counter;
        }
        
        if(counter === 1)   map.setView([minLat, minLon], 17);
        if(counter > 1)     map.fitBounds([[minLat, minLon], [maxLat, maxLon]]);
    };
    
    map.query = function() {
        if(map.getZoom() < 10 && params.page === undefined)
            $('#zoom-in-info').fadeIn();
        if(map.getZoom() > 9 && params.page === undefined) 
            actions.bbox(map.getBounds().toBBoxString());
        if(params.page !== undefined)
            actions.webscrap('http://pl.wikipedia.org/wiki/'+decodeURIComponent(params.page));
    };
    
    map.query();
});

/*
 * actions - getting markers
 */

var actions = {};

actions.webscrap = function(url) {
    $.ajax({
        url: "proxy.php?url=" + encodeURIComponent(url),
        type: 'GET',
        crossDomain: true,
        error: function(xhr, status, errorThrown) {
            alert("Błąd: " + errorThrown);
	},
        success: function(data) {
            $('#loading').text("Przetwarzanie...");
            data = $("#wikizabytki-tabela", $(data));

            $("tr", data).each(function() {
                var lat = $(".wikizabytki-koordynaty .geo-dec .latitude",  $(this)).text();
                var lon = $(".wikizabytki-koordynaty .geo-dec .longitude",  $(this)).text();
                var ref = $(".wikizabytki-numer",  $(this)).text();
                var city = $(".wikizabytki-adres",  $(this)).text();
                var name = $(".wikizabytki-nazwa",  $(this)).html();

                if(lat !== '' && lon !== '' && name !== '')
                    monument.elements[ref] = new monument.obj(new L.LatLng(lat, lon), name, city);
                    //monument.elements[ref].city = city;
            });

            for(var i in monument.elements) {
                var e = monument.elements[i];
                monument.layer.addLayer(L.marker(e.coord).bindPopup("<strong>"+e.city+"</strong>"+e.name+"<button>Prześlij zdjęcie</button>"));
            }
            $('#loading').css('visibility', 'hidden');
            map.fitZoom(monument.elements);
        }
    });
};

/** unused **/
actions.source = function(url) {
    $.ajax({
        url: "proxy.php?url=" + encodeURIComponent(url),
        type: 'GET',
        crossDomain: true,
        error: function(xhr, status, errorThrown) {
            alert("Błąd: " + errorThrown);
	},
        success: function(data) {
            var page = $.parseJSON(data).query.pages;
            var i;

            for(i in page)
                page = page[i].revisions[0]['*'];

            monument.array = page.split('{{Zabytki wiersz');

            for(i in monument.array) {
                var lat = monument.array[i].match(/szerokość *= *([0-9\.]*)/);
                var lon = monument.array[i].match(/długość *= *([0-9\.]*)/);
                var name = monument.array[i].match(/nazwa *= *(.*)/);

                if(lat !== null && lon !== null && name !== null)
                    monument.elements.push(new monument.obj(new L.LatLng(lat[1], lon[1]), name[1]));
            }

            for(i in monument.elements) {
                var e = monument.elements[i];
                monument.layer.addLayer(L.marker(e.coord).bindPopup(e.name));
            }
            map.fitZoom(monument.elements);
        }
    });
};

actions.bbox = function(bbox){
    $('#zoom-in-info').fadeOut();
    $('#loading').fadeIn();
    
    var link = "http://toolserver.org/~erfgoed/api/api.php?action=search&bbox="+bbox+"&format=json&limit=300&callback=parse";
	//http://toolserver.org/~erfgoed/api/api.php?action=search&bbox=19.27345275878906,52.649729197309426,19.79084014892578,52.78469999350529&format=json&limit=100&callback=parse
	//alert(link);
        //https://tools.wmflabs.org/heritage/api/api.php
	
    var script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'api-script';
        script.src = link;
    document.head.appendChild(script);
};

function parse(data){
    for(var i in data.monuments) {
        var e = data.monuments[i];
        if(monument.elements[e.id] === undefined) {
            var coord = new L.LatLng(e.lat, e.lon);
            monument.elements[e.id] = new monument.obj(coord, e.name, e.address);

            var uploadlink = "//commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=wlm-"+e.country+
                    "&id="+e.id+
                    "&descriptionlang="+e.lang+
                    "&description="+encodeURI(txtwiki.parseWikitext(e.name))+", "+encodeURI(txtwiki.parseWikitext(e.address))+
                    "&categories="+encodeURI("WLM 2013 United States unreviewed");

            if(e.image !== "") {
                monument.layer.addLayer(L.marker(coord, {icon: monument.icon})
                    .bindPopup("<h3>"+txtwiki.parseWikitext(e.name)+"</h3><h4>"+txtwiki.parseWikitext(e.address)+"</h4><a href='http://commons.wikimedia.org/wiki/File:"+e.image+"' target='_blank'><img class='thumbnail-loader' src='img/loading.gif' /><img id='thumbnail' src='http://commons.wikimedia.org/w/thumb.php?f="+encodeURI(e.image)+"&w=200' /></a><a class='button-upload' href='"+uploadlink+"'/>Upload</a>", {minWidth: 200})
                    .on('click', function(e) {
                        $("#thumbnail")
                            .one('load', function() {
                                    $(".thumbnail-loader").hide();
                                    $(this).hide();
                                    $(this).fadeIn();
                            })
                            /*.attr('src', "http://commons.wikimedia.org/w/thumb.php?f="+img+"&w=200")*/
                            .each(function() {
                                if(this.complete)
                                    $(this).trigger('load');
                            });
                    })
                );
            } else {
                monument.layer.addLayer(L.marker(coord, {icon: monument.icon_nofoto})
                    .bindPopup("<h3>"+txtwiki.parseWikitext(e.name)+"</h3>"+txtwiki.parseWikitext(e.address)+"<a class='button-upload' href='"+uploadlink+"'/>Upload</a>")
                );
            }
        }
    }
    $('#loading').fadeOut();
    var jsonp = document.getElementById('api-script');
    if(jsonp)
        jsonp.parentNode.removeChild(jsonp);
}


/**
 * Get params from URL
 * @source http://stackoverflow.com/a/979995
 **/
var params = function() {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i in vars) {
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined")
            query_string[pair[0]] = pair[1];
        else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]], pair[1] ];
            query_string[pair[0]] = arr;
        } else
            query_string[pair[0]].push(pair[1]);
    }
    return query_string;
}();