const google = window.google;

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

export default function init() {
  const data = google.visualization.arrayToDataTable([
    ['Month', 'Items', {'type': 'string','role': 'style'}],
    ['JUL', 1000, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['AUG', 1250, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['SEP', 1050, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['OCT', 1250, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['NOV', 950, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['DES', 1300, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['JAN', 1650, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
  ]);

  const options = {
    width: '100%',
    height: '100%',
    chartArea:{
      left: 0,
      top: '27%',
      width:'100%',
      height:'81%',
    },

    title: 'Revenue This year',
    titlePosition: 'none',

    fontSize: 16,
    pointSize: 17,
    pointsVisible: false,
    lineWidth: 4,
    
    vAxis: {
      textPosition: 'none',
      minValue: 0, 
      gridlines: {
        count: 0,
      }, 
      minorGridlines: {
        count: 0,
      }, 
      baselineColor: '#accbea',
    },
    hAxis: {
      textStyle: {
        color: '#286aab',
        bold: true,
      },
      textPosition: 'in',
    },
    legend: {
      position: 'none',
    },

    areaOpacity: 0.5,
    series: {
      0: { color: '#5a98d5' },
    },
  };

  draw(data, options);
}

const draw = (data, options) => {
  const chart = new google.visualization.AreaChart(document.getElementById('chart__revenue'));
  chart.draw(data, options); 

  google.visualization.events.addListener(chart, 'ready', readyHandler);
  const readyHandler = () => {
    chart.setSelection([{ 'row': 5,'column': 1 }]);
  }
}
