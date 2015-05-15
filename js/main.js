 require.config({
     paths: {
         jquery: 'jquery-2.1.1.min'
     }
 });



 define("toggleLayers",[],function () {
    	function toggleLayerbyOpacity(layerToToggle) {
         		 var enable = this.className !== 'active';
                 layerToToggle.setOpacity(enable ? 0.3 : 0);
                 this.className = enable ? 'active' : '';
                 return false;
         }

         return {
         	toggleLayerbyOpacity:toggleLayerbyOpacity
         }
 });


 define("createEsriTiled", ["jquery","toggleLayers"],
     function($,toggleLayers) {

     	var timeZonesEsriTiled;
         function createEsriTiledLayer() {
             timeZonesEsriTiled = L.esri.tiledMapLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer', {
                 'opacity': 0.3
             })
             return timeZonesEsriTiled;
         }

         function hookupEsriTiledToggle() {
             document.getElementById('timeZonesEsriTiled').onclick = function() {
                 toggleLayers.toggleLayerbyOpacity(timeZonesEsriTiled);
             };
         }     


         return {
             createEsriTiledLayer: createEsriTiledLayer,
             hookupEsriTiledToggle: hookupEsriTiledToggle

         }

     });




 define("app", ["jquery", "cssStylesToMove", "createEsriTiled"],
     function($, cssStyles, createEsriTiled) {
         function buildUpMap() {

             //cssStyles.buildStyles();

             var mapDiv = document.getElementById('map');
             var map = L.map(mapDiv).setView([35, -100], 4);

         


             var openStretMapBase = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                 attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             }).addTo(map);

    var tiledTimeZones = createEsriTiled.createEsriTiledLayer();
             tiledTimeZones.addTo(map);
             createEsriTiled.hookupEsriTiledToggle();


             var damageAssesmentEsriFeatureLayer = L.esri.featureLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/CommercialDamageAssessment/FeatureServer/0', {
                 pointToLayer: function(feature, latlng) {
                     return L.circleMarker(latlng, cssStyles.damageAssesmentStyleOn);
                 }
             }).addTo(map);


             var countriesGeoJson = L.geoJson(countries, {
                 onEachFeature: popup,
                 style: cssStyles.countryStyleOn
             }).addTo(map);

             // var pwGeoJson = L.geoJson(pw, {}).addTo(map);



             var pwGeoJson = L.geoJson(pw, {
                 onEachFeature: popup,
                 pointToLayer: function(feature, latlng) {
                     return L.circleMarker(latlng, cssStyles.pwStyleOn);
                 }
             }).addTo(map);



             var yellowstoneBuilding = yellowstoneBuildings;
             var yellowstoneBuildingGeoJson = L.geoJson(yellowstoneBuilding, {
                 pointToLayer: function(feature, latlng) {
                     return L.circleMarker(latlng, cssStyles.yellowStoneStyleOn);
                 }
             }).addTo(map);




             var capitalCitiesGeoJson;
             var jqxhr = $.ajax("http://gcaseycupp.github.io/LeafletTesting2/data/centralAmericaCapitalsNoVar.geo.json")
                 // var jqxhr = $.ajax( "http://gcaseycupp.github.io/LeafletTesting2/centralAmericaCapitalsNoVar.geo.json" )
                 .success(function(data) {
                     //  alert("in success");
                     var capitalCities = data;
                     capitalCitiesGeoJson = L.geoJson(capitalCities, {
                         pointToLayer: function(feature, latlng) {
                             return L.circleMarker(latlng, cssStyles.capCitiesStyleOn);
                         }
                     }).addTo(map);

                     //  var capitalCitiesGeoJson = L.geoJson(capitalCities, {  
                     //     style: capCitiesStyleOn                      
                     // }).addTo(map);

                 })
                 .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                     alert("some error : " + errorThrown);
                 })
                 .always(function() {
                     // alert( "complete" );
                 });



             var precipitationWMS = L.tileLayer.wms('http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs', {
                 format: 'image/png',
                 transparent: true,
                 layers: 'RAS_RIDGE_NEXRAD',
                 opacity: 0.75
             }).addTo(map);


             var geologyEsriDyanmic = L.esri.dynamicMapLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/Energy/Geology/MapServer', {
                 opacity: 0.75
             }).addTo(map);




             var contriesGeoJsonSwitcher = document.getElementById('countriesGeoJson');
             document.getElementById('countriesGeoJson').onclick = function() {
                 var enable = contriesGeoJsonSwitcher.className !== 'active';

                 countriesGeoJson.eachLayer(function(layer) {

                     if (enable) {
                         layer.setStyle(cssStyles.countryStyleOn);
                     } else {
                         layer.setStyle(cssStyles.countryStyleOff);
                     }

                 });
                 this.className = enable ? 'active' : '';
                 return false;
             };



             var yellowRestGeoJsonElement = document.getElementById('yellowRestGeoJson');
             document.getElementById('yellowRestGeoJson').onclick = function() {
                 var enable = yellowRestGeoJsonElement.className !== 'active';

                 yellowstoneBuildingGeoJson.eachLayer(function(layer) {

                     if (enable) {
                         layer.setStyle(cssStyles.yellowStoneStyleOn);
                     } else {
                         layer.setStyle(cssStyles.yellowStoneStyleOff);
                     }

                 });
                 this.className = enable ? 'active' : '';
                 return false;
             };




             var capitalCitiesGeoJsonElement = document.getElementById('capitalCitiesGeoJson');
             document.getElementById('capitalCitiesGeoJson').onclick = function() {
                 var enable = capitalCitiesGeoJsonElement.className !== 'active';

                 capitalCitiesGeoJson.eachLayer(function(layer) {

                     if (enable) {
                         layer.setStyle(cssStyles.capCitiesStyleOn);
                     } else {
                         layer.setStyle(cssStyles.capCitiesStyleOff);
                     }

                 });

                 this.className = enable ? 'active' : '';
                 return false;
             };



             var pwGeoJsonSwitcher = document.getElementById('pwGeoJson');
             document.getElementById('pwGeoJson').onclick = function() {
                 var enable = pwGeoJsonSwitcher.className !== 'active';
                 //countriesGeoJson.setOpacity(enable ? 1 : 0);

                 pwGeoJson.eachLayer(function(layer) {

                     if (enable) {
                         layer.setStyle(cssStyles.pwStyleOn);
                     } else {
                         layer.setStyle(cssStyles.pwStyleOff);
                     }

                 });

                 this.className = enable ? 'active' : '';
                 return false;
             };



             document.getElementById('openStretMapBase').onclick = function() {
                 var enable = this.className !== 'active';
                 openStretMapBase.setOpacity(enable ? 1 : 0);
                 this.className = enable ? 'active' : '';
                 return false;
             };


             document.getElementById('precipitationWMS').onclick = function() {
                 var enable = this.className !== 'active';
                 precipitationWMS.setOpacity(enable ? 1 : 0);
                 this.className = enable ? 'active' : '';
                 return false;
             };


             document.getElementById('geologyEsriDyanmic').onclick = function() {
                 var enable = this.className !== 'active';
                 geologyEsriDyanmic.setOpacity(enable ? 1 : 0);
                 this.className = enable ? 'active' : '';
                 return false;
             };



             // document.getElementById('damageAssesmentEsriFeature').onclick = function() {
             //     var enable = this.className !== 'active';
             //     damageAssesmentEsriFeatureLayer.setOpacity(enable ? 1 : 0);
             //     this.className = enable ? 'active' : '';
             //     return false;
             // };


             var damageAssesmentEsriFeatureElement = document.getElementById('damageAssesmentEsriFeature');
             document.getElementById('damageAssesmentEsriFeature').onclick = function() {
                 var enable = damageAssesmentEsriFeatureElement.className !== 'active';



                 // damageAssesmentEsriFeatureLayer.eachLayer(function(layer) {

                 if (enable) {
                     damageAssesmentEsriFeatureLayer.setStyle(cssStyles.damageAssesmentStyleOn);
                 } else {
                     damageAssesmentEsriFeatureLayer.setStyle(cssStyles.damageAssesmentStyleOff);
                 }

                 // });
                 this.className = enable ? 'active' : '';
                 return false;
             };




             function popup(feature, layer) {
                 if (feature.properties && feature.properties.name) {
                     layer.bindPopup(feature.properties.name);
                 }
             }




         }

         return {
             init: function() {
                 buildUpMap();
             }
         }
     });

 require(["app"], function(app) {

     app.init();

 });