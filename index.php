<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Maps of monuments | Wiki Loves Monuments!</title>

        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:400,300,700&amp;subset=latin,latin-ext">
        <!--[if lte IE 8]><link rel="stylesheet" href="js/leaflet.ie.css" /><![endif]-->
        <!--[if lte IE 8]><link rel="stylesheet" href="js/leaflet.markercluster.def.ie.css" /><![endif]-->
        <link rel="stylesheet" href="style.css" />
        
        <script src="js/jquery-1.9.1.min.js"></script>
        <script src="js/leaflet.js"></script>
        <script src="js/leaflet.markercluster.js"></script>
	<script src="js/leaflet.hash.js"></script>
        <script src="js/script.js"></script>
        <script src="js/wiki.js"></script>
	
    </head>
    <body>
        <div id="zoom-in-info" class="leaflet-bar">Zoom in to load monuments</div>
        <div id="loading"><img src="img/loading.gif" /><span>Loading data...</span></div>
		<div id="top">
			<div class="fb"><iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FWikiLubiZabytki&amp;width=450&amp;height=35&amp;colorscheme=light&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;send=false" scrolling="no" frameborder="0" allowTransparency="true"></iframe></div>
			<a href="http://wikizabytki.pl/mapa"><img class="logo" src="img/logo.png" /></a>
			<header><a href="#">wiki loves monuments</a> map</header>
			<article>Lorem ipsum</article>
		</div>
        <div id="map"></div>
		<div id="bottom">
			<footer>
				<div class="wikimedia">© 2013 <a href="http://pl.wikimedia.org/wiki">Stowarzyszenie Wikimedia Polska</a></div>
				<div class="osm">Map by <a href="http://openstreetmap.org">OpenStreetMap</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a> license. Rendering <a href="www.geog.uni-heidelberg.de">University of Heidelberg</a></div>
			</footer>
		</div>
    </body>
</html>