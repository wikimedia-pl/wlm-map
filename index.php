<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta charset="utf-8">
        <title>Mapa zabytków | Wiki Lubi Zabytki!</title>
        <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.css" />
        <!--[if lte IE 8]><link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.ie.css" /><![endif]-->
        <link rel="stylesheet" href="js/leaflet.markercluster.css" />
        <link rel="stylesheet" href="js/leaflet.markercluster.def.css" />
        <!--[if lte IE 8]><link rel="stylesheet" href="js/leaflet.markercluster.def.ie.css" /><![endif]-->
        <script src="http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.js"></script>
        <script src="js/leaflet.markercluster.js"></script>
	<script src="js/leaflet.hash.js"></script>
        <link href="http://fonts.googleapis.com/css?family=Roboto:400,300,700&amp;subset=latin,latin-ext" rel="stylesheet" type="text/css">
        <script src="js/script.js"></script>
        <script src="js/wiki.js"></script>
	<link rel="stylesheet" href="style.css" />
    </head>
    <body>
        <div id="zoom-in-info" class="leaflet-bar">Przybliż mapę aby zobaczyć naniesione zabytki</div>
        <div id="loading"><img src="img/loading.gif" /><span>Wczytywanie danych...</span></div>
		<div id="top">
			<div class="fb"><iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FWikiLubiZabytki&amp;width=450&amp;height=35&amp;colorscheme=light&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;send=false" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div>
			<a href="http://wikizabytki.pl/mapa"><img class="logo" src="img/logo.png" /></a>
			<header>mapa <a href="http://wikizabytki.pl/">wiki lubi zabytki</a></header>
			<article>Przybliż mapę aby zobaczyć naniesione zabytki.</article>
		</div>
        <div id="map"></div>
		<div id="bottom">
			<footer>
				<div class="wikimedia">© 2013 <a href="http://pl.wikimedia.org/wiki">Stowarzyszenie Wikimedia Polska</a></div>
				<div class="osm">Mapa autorstwa <a href="http://openstreetmap.org">OpenStreetMap</a> na licencji <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>. Rendering <a href="www.geog.uni-heidelberg.de">University of Heidelberg</a>, <a href="http://osm.org.pl" target="_blank">OpenStreetMap Polska</a>/<a href="http://trail.pl" target="_blank">TRAIL.PL</a>/<a href="http://centuria.pl" target="_blank">centuria.pl</a></div>
			</footer>
		</div>
    </body>
</html>