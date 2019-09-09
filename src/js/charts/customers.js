const google = window.google;

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

export default function init() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'TIME');
  data.addColumn('number', 'DAY TIME');
  data.addColumn('number', 'NIGHT TIME');

  data.addRows([
    ['06:00 AM', 265, 255],
    ['09:00 AM', 285, 280],
    ['12:00 AM', 300, 300],
    ['03:00 PM', 310, 312],
    ['06:00 PM', 319, 322],
    ['09:00 AM', 330, 332],
    ['11:00 PM', 348, 340],
  ]);

  const options = {
    width: '100%',
    height: '100%',
    chartArea:{
      left: '6%',
      top: '35%',
      width:'88%',
      height:'47%',
    },

    title: 'Customers',
    titlePosition: 'none',

    fontSize: 16,
    colors: '#2c3e50',

    curveType: 'function',
    crosshair: {
      opacity: 0.2,
    },
    explorer: {
      zoomDelta: 3,
    },
    lineWidth: 4,
    
    vAxis: {
      textPosition: 'none',
      gridlines: {
        count: 3,
      },
      minorGridlines: {
        count: 0,
      },
    },
    hAxis: {
      textPosition: 'none',
    },
    legend: {
      position: 'top',
      textStyle: {
        color: '#2c3e50',
        fontSize: 14,
        bold: true,
      },
    },
    
    series: {
      0: { color: '#467cb2' },
      1: { color: '#accbea' },
    },
  };
  draw(data, options);
}

const draw = (data, options) => {
  const chart = new google.visualization.LineChart(document.getElementById('chart__customers'));
  chart.draw(data, options);
}
