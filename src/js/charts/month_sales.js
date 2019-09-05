google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(init);

export default function init() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Month');
  data.addColumn('number', 'Day time');
  data.addColumn('number', 'Night time');

  data.addRows([
    ['April', 50, 10],
    ['May', 87, 60],
    ['June', 40, 25],
    ['July', 28, 13],
    ['August', 35, 15],
    ['September', 30, 15],
    ['October', 26, 10],
    ['November', 65, 30],
    ['December', 36, 7],
  ]);

  const options = {
    width: '100%',
    height: '100%',
    chartArea:{
      left: '14%',
      top: '20%',
      width:'75%',
      height:'70%',
    },

    title: 'Monthly Sales (In Millions)',
    titlePosition: 'none',

    fontSize: 16,
    colors: '#2c3e50',

    isStacked: true,
    bar: {
      groupWidth: '40%',
    },

    vAxis: { 
      logScale: true,
      viewWindow: {
        min: 20,
      }, 
      textStyle: {
        color: '#a1a1a1', 
        fontSize: 14,
      }, 
      ticks: [20, 30, 50, 100, 200],
      gridlines: {
        count: 0, 
        color: '#edebeb',
      },
    },
    hAxis: {
      textPosition: 'none',
      gridlines: {
        count: 0,
      }, 
      minorGridlines: {
        count: 0,
      },
    },
    legend: {
      position: 'none',
    },

    series: {
      0: { color: '#accbea' },
      1: { color: '#9ab6d3' },
    },
  };

  draw(data, options);
}

const draw = (data, options) => {
  const chart = new google.visualization.ColumnChart(document.getElementById('chart__monthly-sales'));
  chart.draw(data, options);
}
