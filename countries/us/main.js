
var data = Highcharts.geojson(Highcharts.maps['/static/geojson/countries/us/us-all']),
separators = Highcharts.geojson(Highcharts.maps['/static/geojson/countries/us/us-all'], 'mapline'),
// Some responsiveness
small = $('#container').width() < 400;

// Set drilldown pointers
$.getJSON('static/geojson/countries/us/us-all.geo.json', function (data) {
  this.drilldown = this.properties['hc-key'];
  this.value = data; // Non-random bogus data
});

// Instantiate the map
Highcharts.mapChart('container', {
  chart: {
    events: {
      drilldown: function (e) {
        if (!e.seriesOptions) {
          var chart = this,
          mapKey = '/static/geojson/countries/us' + e.point.drilldown + '-all',
          // Handle error, the timeout is cleared on success
          fail = setTimeout(function () {
            if (!Highcharts.maps[mapKey]) {
              chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);
              fail = setTimeout(function () {
                chart.hideLoading();
              }, 1000);
            }
          }, 3000);

          // Show the spinner
          chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

          // Load the drilldown map
          $.getScript( mapKey + '.js', function () {

            data = Highcharts.geojson(Highcharts.maps[mapKey]);

            // Get data
            $.getJSON('/static/geojson/countries/us/us-tx-all.geo.json', function(data2){

              var data = [
                {
                  "code": "us-tx-463",
                  "name": "Uvalde",
                  "value": "2"
                },
                {
                  "code": "us-tx-179",
                  "name": "Gray",
                  "value": "3"
                }
              ];

              this.drilldown = this.properties['hc-key', 'code'];
              this.value = data;

            });

            // Hide loading and add series
            chart.hideLoading();
            clearTimeout(fail);
            chart.addSeriesAsDrilldown(e.point, {
              name: e.point.name,
              joinBy: ['hc-key', 'code'],
              type: 'map',
              data: data,
              dataLabels: {
                enabled: true,
                format: '{point.name}'
              }
            });

          });
        }

        this.setTitle(null, { text: e.point.name });
      },
      drillup: function () {
        this.setTitle(null, { text: '' });
      }
    }
  },

  title: {
    text: 'Highcharts Map Drilldown'
  },

  subtitle: {
    text: '',
    floating: true,
    align: 'right',
    y: 50,
    style: {
      fontSize: '16px'
    }
  },

  legend: small ? {} : {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },

  colorAxis: {
    min: 0,
    minColor: '#E6E7E8',
    maxColor: '#005645'
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom'
    }
  },

  plotOptions: {
    map: {
      states: {
        hover: {
          color: '#EEDD66'
        }
      }
    }
  },

  series: [{
    data: data,
    name: 'USA',
    dataLabels: {
      enabled: true,
      format: '{point.properties.postal-code}'
    }
  }, {
    type: 'mapline',
    data: separators,
    color: 'silver',
    enableMouseTracking: false,
    animation: {
      duration: 500
    }
  }],

  drilldown: {
    activeDataLabelStyle: {
      color: '#FFFFFF',
      textDecoration: 'none',
      textOutline: '1px #000000'
    },
    drillUpButton: {
      relativeTo: 'spacingBox',
      position: {
        x: 0,
        y: 60
      }
    }
  }
});
