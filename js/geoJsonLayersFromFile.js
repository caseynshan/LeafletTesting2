define(["jquery","toggleLayers",],
     function($,toggleLayers) {

     	var geoJsonLayer;
         function creategeoJsonLayerFromFile(geoJson,styleOn) {
            geoJsonLayer  = L.geoJson(geoJson, {
                // onEachFeature: popup,
                 style: styleOn
             });
             return geoJsonLayer;
         }

         
         function creategeoJsonLayerFromFileCircle(geoJson,styleOn) {
            geoJsonLayer  = L.geoJson(geoJson, {                          
                 pointToLayer: function(feature, latlng) {
                     return L.circleMarker(latlng, styleOn);
                 }
             });
             return geoJsonLayer;
         }


         function hookupgeoJsonLayerFromFileToggle(geoJsonLayerName, styleOn, styleOff,geoJsonLayer) {
            //var contriesGeoJsonSwitcher = document.getElementById(geoJsonLayerName);
             geoJsonLayerName.onclick = function() {
                 var enable = geoJsonLayerName.className !== 'active';

                 geoJsonLayer.eachLayer(function(layer) {

                     if (enable) {
                    
                         layer.setStyle(styleOn);
                     } else {
                   
                         layer.setStyle(styleOff);
                     }

                 });
                 this.className = enable ? 'active' : '';
                 return false;
             };
         }     


         return {
             creategeoJsonLayerFromFile: creategeoJsonLayerFromFile,
             hookupgeoJsonLayerFromFileToggle: hookupgeoJsonLayerFromFileToggle,
             creategeoJsonLayerFromFileCircle:creategeoJsonLayerFromFileCircle

         }
         

     });
