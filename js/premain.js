 'use strict';

    window.onload = function() {
        var map = L.map('map').setView([35, -100], 4);




        try {



            var countryStyleOn = {
                'color': '#000',
                'weight': 1,
                'opacity': 0.9
            };

            var countryStyleOff = {
                'color': '#000',
                'weight': 1,
                'opacity': 0.0
            };


            var pwStyleOn = {
                radius: 12,
                fillColor: '#458B00',
                color: '#ffffff',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };

            var pwStyleOff = {
                radius: 12,
                fillColor: '#458B00',
                color: '#000',
                weight: 1,
                opacity: 0,
                fillOpacity: 0.0
            };


            var yellowStoneStyleOn = {
                radius: 6,
                fillColor: '#ff0000',
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };

            var yellowStoneStyleOff = {
                radius: 6,
                fillColor: '#ff0000',
                color: '#000',
                weight: 1,
                opacity: 0,
                fillOpacity: 0.0
            };

            var capCitiesStyleOn = {
                radius: 8,
                fillColor: '#ffff00',
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };

            var capCitiesStyleOff = {
                radius: 8,
                fillColor: '#458B00',
                color: '#000',
                weight: 1,
                opacity: 0,
                fillOpacity: 0.0
            };

            var damageAssesmentStyleOn = {
                radius: 8,
                fillColor: '#ffa500',
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };

            var damageAssesmentStyleOff = {
                radius: 8,
                fillColor: '#458B00',
                color: '#000',
                weight: 1,
                opacity: 0,
                fillOpacity: 0.0
            };




            var openStretMapBase = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            var timeZonesEsriTiled = L.esri.tiledMapLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer', {
                'opacity': 0.3
            }).addTo(map);


            var damageAssesmentEsriFeatureLayer = L.esri.featureLayer('http://sampleserver6.arcgisonline.com/arcgis/rest/services/CommercialDamageAssessment/FeatureServer/0', {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, damageAssesmentStyleOn);
                }
            }).addTo(map);


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




            var capitalCitiesGeoJson;
            var jqxhr = $.ajax("http://gcaseycupp.github.io/LeafletTesting2/data/centralAmericaCapitalsNoVar.geo.json")
                // var jqxhr = $.ajax( "http://gcaseycupp.github.io/LeafletTesting2/centralAmericaCapitalsNoVar.geo.json" )
                .success(function(data) {
                    //  alert("in success");
                    var capitalCities = data;
                    capitalCitiesGeoJson = L.geoJson(capitalCities, {
                        pointToLayer: function(feature, latlng) {
                            return L.circleMarker(latlng, capCitiesStyleOn);
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

        } catch (ex) {
            window.alert(ex);
        }

        // Layer switcher

        var contriesGeoJsonSwitcher = document.getElementById('countriesGeoJson');
        document.getElementById('countriesGeoJson').onclick = function() {
            var enable = contriesGeoJsonSwitcher.className !== 'active';

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



        var yellowRestGeoJsonElement = document.getElementById('yellowRestGeoJson');
        document.getElementById('yellowRestGeoJson').onclick = function() {
            var enable = yellowRestGeoJsonElement.className !== 'active';

            yellowstoneBuildingGeoJson.eachLayer(function(layer) {

                if (enable) {
                    layer.setStyle(yellowStoneStyleOn);
                } else {
                    layer.setStyle(yellowStoneStyleOff);
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
                    layer.setStyle(capCitiesStyleOn);
                } else {
                    layer.setStyle(capCitiesStyleOff);
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
            timeZonesEsriTiled.setOpacity(enable ? 0.3 : 0);
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
                damageAssesmentEsriFeatureLayer.setStyle(damageAssesmentStyleOn);
            } else {
                damageAssesmentEsriFeatureLayer.setStyle(damageAssesmentStyleOff);
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




        //var map = L.map('map').setView([51.505, -0.09], 13);
    };