define(["jquery","toggleLayers"],
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
