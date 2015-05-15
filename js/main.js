require.config({
	paths: {
		jquery: 'jquery-2.1.1.min'
		}
	});

require(["jquery"],
	function($) {

		window.alert('test');

		 'use strict';

    window.onload = function() {
        var map = L.map('map').setView([40, -110], 5);




        try {

           
                    
          


            var openStretMapBase = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            var timeZonesEsriTiled = L.esri.tiledMapLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer', {
                'opacity': 0.5
            }).addTo(map);


            var damageAssesmentEsriFeature = L.esri.featureLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/Energy/Infrastructure/FeatureServer/0').addTo(map);


            var countriesGeoJson = L.geoJson(countries, {
                onEachFeature: popup,
                style: countryStyleOn
            }).addTo(map);

            // var pwGeoJson = L.geoJson(pw, {}).addTo(map);



            var pwGeoJson = L.geoJson(pw, {
                onEachFeature: popup,
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, pwStyleOn);
                }
            }).addTo(map);

            var yellowstoneBuilding = yellowstoneBuildings;
            
            var yellowstoneBuildingGeoJson = L.geoJson(yellowstoneBuilding, {  
                 pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, yellowStoneStyleOn);
                }                  
            }).addTo(map);






            var jqxhr = $.ajax( "http://gcaseycupp.github.io/LeafletTesting2/data/centralAmericaCapitalsNoVar.geo.json" )
            // var jqxhr = $.ajax( "http://gcaseycupp.github.io/LeafletTesting2/centralAmericaCapitalsNoVar.geo.json" )
              .success(function(data) {
                      //  alert("in success");
                        var capitalCities=data;
                    
             var capitalCitiesGeoJson = L.geoJson(capitalCities, {  
                style: countryStyleOn                      
            }).addTo(map);
      
              })
              .fail(  function(XMLHttpRequest, textStatus, errorThrown) {
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

        } catch (ex) {
            window.alert(ex);
        }

        // Layer switcher

        var contriesGeoJsonSwitcher = document.getElementById('countriesGeoJson');
        document.getElementById('countriesGeoJson').onclick = function() {
            var enable = contriesGeoJsonSwitcher.className !== 'active';
            //countriesGeoJson.setOpacity(enable ? 1 : 0);

            countriesGeoJson.eachLayer(function(layer) {

                if (enable) {
                    layer.setStyle(countryStyleOn);
                } else {
                    layer.setStyle(countryStyleOff);
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
                    layer.setStyle(pwStyleOn);
                } else {
                    layer.setStyle(pwStyleOff);
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

        document.getElementById('timeZonesEsriTiled').onclick = function() {
            var enable = this.className !== 'active';
            timeZonesEsriTiled.setOpacity(enable ? 1 : 0);
            this.className = enable ? 'active' : '';
            return false;
        };

        document.getElementById('damageAssesmentEsriFeature').onclick = function() {
            var enable = this.className !== 'active';
            damageAssesmentEsriFeature.setOpacity(enable ? 1 : 0);
            this.className = enable ? 'active' : '';
            return false;
        };


        function popup(feature, layer) {
            if (feature.properties && feature.properties.name) {
                layer.bindPopup(feature.properties.name);
            }
        }




        //var map = L.map('map').setView([51.505, -0.09], 13);
    };
});


