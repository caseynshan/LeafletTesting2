 define([],
     function() {


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

           var murderCaseyArcGISOnlineStyleOn = {
             radius: 8,
             fillColor: 'red',
             color: '#000',
             weight: 1,
             opacity: 1,
             fillOpacity: 0.8
         };

         var murderCaseyArcGISOnlineStyleOff = {
             radius: 8,
             fillColor: '#458B00',
             color: '#000',
             weight: 1,
             opacity: 0,
             fillOpacity: 0.0
         };
         return {


             countryStyleOn: countryStyleOn,
             countryStyleOff: countryStyleOff,
             pwStyleOn: pwStyleOn,
             pwStyleOff: pwStyleOff,
             yellowStoneStyleOn: yellowStoneStyleOn,
             yellowStoneStyleOff: yellowStoneStyleOff,
             capCitiesStyleOn: capCitiesStyleOn,
             capCitiesStyleOff: capCitiesStyleOff,
             damageAssesmentStyleOn: damageAssesmentStyleOn,
             damageAssesmentStyleOff: damageAssesmentStyleOff,
                murderCaseyArcGISOnlineStyleOn: murderCaseyArcGISOnlineStyleOn,
             murderCaseyArcGISOnlineStyleOff: murderCaseyArcGISOnlineStyleOff,
             buildStyles: function() {
                 alert("building styles");
             }
         }

     });
