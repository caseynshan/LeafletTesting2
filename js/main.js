 require.config({
     paths: {
         jquery: 'jquery-2.1.1.min'
     }
 });



 define("toggleLayers", [], function() {
     function toggleLayerbyOpacity(layerToToggle) {
         var enable = this.className !== 'active';
         layerToToggle.setOpacity(enable ? 0.3 : 0);
         this.className = enable ? 'active' : '';
         return false;
     }

     return {
         toggleLayerbyOpacity: toggleLayerbyOpacity
     }
 });



 define("app", ["jquery", "cssStylesToMove", "esriTiledLayers", "geoJsonLayersFromFile"],
     function($, cssStyles, esriTiledLayers, geoJsonLayersFromFile) {
         function buildUpMap() {

             //cssStyles.buildStyles();

             var mapDiv = document.getElementById('map');
             var map = L.map(mapDiv).setView([20, -90], 3);


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
             var countriesGeoJsonLayer = geoJsonLayersFromFile.creategeoJsonLayerFromFile(countries, cssStyles.countryStyleOn);
             countriesGeoJsonLayer.addTo(map);
             geoJsonLayersFromFile.hookupgeoJsonLayerFromFileToggle(contriesGeoJsonSwitcher, cssStyles.countryStyleOn, cssStyles.countryStyleOff, countriesGeoJsonLayer)


             var pwGeoJsonSwitcher = document.getElementById('pwGeoJson');
             var pwGeoJsonLayer = geoJsonLayersFromFile.creategeoJsonLayerFromFileCircle(pw, cssStyles.pwStyleOn).addTo(map);;
             geoJsonLayersFromFile.hookupgeoJsonLayerFromFileToggle(pwGeoJsonSwitcher, cssStyles.pwStyleOn, cssStyles.pwStyleOff, pwGeoJsonLayer)


             var yellowRestGeoJson = document.getElementById('yellowRestGeoJson');
             var yellowstoneBuildingLayer = geoJsonLayersFromFile.creategeoJsonLayerFromFileCircle(yellowstoneBuildings, cssStyles.yellowStoneStyleOn).addTo(map);
             geoJsonLayersFromFile.hookupgeoJsonLayerFromFileToggle(yellowRestGeoJson, cssStyles.yellowStoneStyleOn, cssStyles.yellowStoneStyleOff, yellowstoneBuildingLayer)



             //https://github.com/calvinmetcalf/leaflet-ajax
             // <script src="/js/leaflet-0.7.2/leaflet.ajax.min.js"></script>
             // var geojsonLayer = new L.GeoJSON.AJAX("foo.geojson");       
             // geojsonLayer.addTo(map);

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
                     geoJsonLayersFromFile.hookupgeoJsonLayerFromFileToggle(capitalCitiesGeoJsonSwitcher, cssStyles.capCitiesStyleOn, cssStyles.capCitiesStyleOff, capitalCitiesGeoJsonLayer)

                 })
                 .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                     alert("some error : " + errorThrown);
                 });



             function addSolrSpatialMarkerswithCluster() {

                     usWellsTeapot100.response.docs.forEach(function(docs) {
                         var coord = docs.bbox[0];
                         var lon = coord.substring(7, 17);
                         var lat = coord.substring(19, 26);
                         var coords = [];
                         coords.push(lat);
                         coords.push(lon);
                         var title = docs.api_s;
                         var solrLayer = L.marker(coords);
                         solrSpatialMarkers.addLayer(solrLayer);
                     });

                     map.addLayer(solrSpatialMarkers);

                 }
               
             var solrSpatialMarkers = L.markerClusterGroup();
             addSolrSpatialMarkerswithCluster();



            //  Only works in IE with following steps..
            //     #1 - add this to MainAlt NavigatorSearchProxy  -
            //                <system.webServer>
            //                <httpProtocol>
            //                  <customHeaders>
            //                    <add name="Access-Control-Allow-Origin" value="*" />
            //                  </customHeaders>
            //                </httpProtocol>
            //              </system.webServer>
            //     # 2  -login to Main Alt Navigator site
            //     # 3 - Open new IE Tab and open run 
                
            //  function addSolrSpatialMarkerswithClusterRest() {


            //      var jqxhr = $.ajax({
            //          url: "http://navigatorreleases.petroweb.com/MainAlt/NavigatorSearchProxy/ProxyHandler.ashx/US_Wells?q=chevron&fl=api_s,well_name_s,operator_s,bbox&security.info=true&rows=5000&wt=json",
            //          xhrFields: {
            //              withCredentials: true
            //          },
            //          success: function(data) {

            //             data.response.docs.forEach(function(docs) {
            //                 var coord = docs.bbox[0];
            //                 var lon = coord.substring(7, 17);
            //                 var lat = coord.substring(19, 26);
            //                 var coords = [];
            //                 coords.push(lat);
            //                 coords.push(lon);
            //                 var title = docs.api_s;
            //                 var solrLayer = L.marker(coords);
            //                 solrSpatialMarkersClusterRest.addLayer(solrLayer);
            //             });

            //             map.addLayer(solrSpatialMarkersClusterRest);

            //          }
            //      });
            //  }
            // var solrSpatialMarkersClusterRest = L.markerClusterGroup();
            //  addSolrSpatialMarkerswithClusterRest();



             

             function addSolrSpatialMarkersGeoJson() {

                 uswellsSolrSpatial.response.docs.forEach(function(docs) {
                     var coord = docs.bbox[0];
                     console.log(typeof coord);
                     var lon = coord.substring(7, 17);
                     var lat = coord.substring(19, 26)

                     console.log('lon:' + lon + '   lat:' + lat);

                     var coords = [];
                     coords.push(lat);
                     coords.push(lon);
                     var title = docs.api_s;
                     var solrLayer = L.circleMarker(coords);
                     solrSpatialMarkersCircle.addLayer(solrLayer);
                     map.addLayer(solrSpatialMarkersCircle);
                 });
             }
      



             document.getElementById('weldCountyWellsSolrSpatialSwitcher').onclick = function() {
                 var enable = this.className !== 'active';
                 if (enable === true) {
                     addSolrSpatialMarkersGeoJson();
                 } else {
                     solrSpatialMarkersCircle.clearLayers();

                 }
                 this.className = enable ? 'active' : '';
                 return false;
             };



             document.getElementById('teapotSolrClusterSwitcher').onclick = function() {
                 var enable = this.className !== 'active';
                 if (enable === true) {
                     addSolrSpatialMarkerswithCluster();
                 } else {
                     solrSpatialMarkers.clearLayers();

                 }
                 this.className = enable ? 'active' : '';
                 return false;
             };



             var precipitationWMS = L.tileLayer.wms('http://nowcoast.noaa.gov/wms/com.esri.wms.Esrimap/obs', {
                 format: 'image/png',
                 transparent: true,
                 layers: 'RAS_RIDGE_NEXRAD',
                 opacity: 0.75
             }).addTo(map);


             var geologyEsriDyanmic = L.esri.dynamicMapLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/Energy/Geology/MapServer', {
                 opacity: 0.75
             }).addTo(map);



             document.getElementById('openStreetMapBase').onclick = function() {
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

             //L.control.layers().addTo(map);

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