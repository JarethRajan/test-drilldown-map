// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.


$.getJSON('/static/geojson/countries/my/my-all/selangor.json', function (mygeojson) {

  var data = [
    ['MY.SL.GO', 0],
    ['MY.SL.HL', 1],
    ['MY.SL.HS', 2],
    ['MY.SL.KE', 3],
    ['MY.SL.KL', 4],
    ['MY.SL.KS', 5],
    ['MY.SL.PE', 6],
    ['MY.SL.SB', 7],
    ['MY.SL.SP', 8]
  ];

  // Create the chart
  var mapchart1 = Highcharts.mapChart('container_selangor', {
    chart: {
            map: mygeojson
    },

    title: {
      text: 'District'
    },

    subtitle: {
      text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/my/my-all.js">Malaysia</a>'
    },

    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },

    colorAxis: {
      tickPixelInterval: 100
    },

    series: [{
      name: 'District with Value',
      data: data,
      keys: ['HASC_2', 'value'],
      joinBy: 'HASC_2',
      states: {
        hover: {
          color: '#a4edba'
        }
      },
      tooltip: {
        pointFormat: '{point.properties.NAME_1}.{point.properties.NAME_2}: {point.value}'
      }
    }]
  });

});
