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


 








 define("app", ["jquery", "cssStylesToMove", "esriTiledLayers","geoJsonLayersFromFile"],
     function($, cssStyles, esriTiledLayers,geoJsonLayersFromFile) {
         function buildUpMap() {

             //cssStyles.buildStyles();

             var mapDiv = document.getElementById('map');
             var map = L.map(mapDiv).setView([35, -100], 4);

         


             var openStretMapBase = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                 attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
             }).addTo(map);

            var tiledTimeZones = esriTiledLayers.createEsriTiledLayer();
             tiledTimeZones.addTo(map);
             esriTiledLayers.hookupEsriTiledToggle();




             var damageAssesmentEsriFeatureLayer = L.esri.featureLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/CommercialDamageAssessment/FeatureServer/0', {
                 pointToLayer: function(feature, latlng) {
                     return L.circleMarker(latlng, cssStyles.damageAssesmentStyleOn);
                 }
             }).addTo(map);


            var contriesGeoJsonSwitcher = document.getElementById('countriesGeoJson');
            var countriesGeoJsonLayer  = geoJsonLayersFromFile.creategeoJsonLayerFromFile(countries,cssStyles.countryStyleOn);
            countriesGeoJsonLayer.addTo(map);            
            geoJsonLayersFromFile.hookupgeoJsonLayerFromFileToggle(contriesGeoJsonSwitcher,cssStyles.countryStyleOn,cssStyles.countryStyleOff,countriesGeoJsonLayer)


            var pwGeoJsonSwitcher = document.getElementById('pwGeoJson');
            var pwGeoJsonLayer  = geoJsonLayersFromFile.creategeoJsonLayerFromFileCircle(pw,cssStyles.pwStyleOn).addTo(map);;          
            geoJsonLayersFromFile.hookupgeoJsonLayerFromFileToggle(pwGeoJsonSwitcher,cssStyles.pwStyleOn,cssStyles.pwStyleOff,pwGeoJsonLayer)

            
            var yellowRestGeoJson = document.getElementById('yellowRestGeoJson');
            var yellowstoneBuildingLayer  = geoJsonLayersFromFile.creategeoJsonLayerFromFileCircle(yellowstoneBuildings,cssStyles.yellowStoneStyleOn).addTo(map);
            geoJsonLayersFromFile.hookupgeoJsonLayerFromFileToggle(yellowRestGeoJson,cssStyles.yellowStoneStyleOn,cssStyles.yellowStoneStyleOff,yellowstoneBuildingLayer)
                       


             var capitalCitiesGeoJsonLayer;
             var jqxhr = $.ajax("http://gcaseycupp.github.io/LeafletTesting2/data/centralAmericaCapitalsNoVar.geo.json")
                 // var jqxhr = $.ajax( "http://gcaseycupp.github.io/LeafletTesting2/centralAmericaCapitalsNoVar.geo.json" )
                 .success(function(data) {
                     //  alert("in success");
                     var capitalCities = data;
                     capitalCitiesGeoJsonLayer = L.geoJson(capitalCities, {
                         pointToLayer: function(feature, latlng) {
                             return L.circleMarker(latlng, cssStyles.capCitiesStyleOn);
                         }
                     }).addTo(map);

                      var capitalCitiesGeoJsonSwitcher = document.getElementById('capitalCitiesGeoJson');
                      geoJsonLayersFromFile.hookupgeoJsonLayerFromFileToggle(capitalCitiesGeoJsonSwitcher,cssStyles.capCitiesStyleOn,cssStyles.capCitiesStyleOff,capitalCitiesGeoJsonLayer)

                 })
                 .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                     alert("some error : " + errorThrown);
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