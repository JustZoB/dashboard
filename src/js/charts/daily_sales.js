google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

export default function init() {
  const data = google.visualization.arrayToDataTable([
    ['Daily Sales', 'USA', 'Canada', 'Mexico'],
    ['1', new Date(2016, 10, 22, 4, 0), new Date(2016, 10, 22, 6, 0), new Date(2016, 10, 22, 4, 0)],
    ['2', new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 8, 0), new Date(2016, 10, 22, 4, 0)],
    ['3', new Date(2016, 10, 22, 6, 0), new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 12, 0)],
    ['4', new Date(2016, 10, 22, 9, 30), new Date(2016, 10, 22, 8, 0), new Date(2016, 10, 22, 7, 0)],
    ['5', new Date(2016, 10, 22, 11, 30), new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 8, 30)],
    ['6', new Date(2016, 10, 22, 4, 0), new Date(2016, 10, 22, 12, 0), new Date(2016, 10, 22, 4, 0)],
  ]);
  
  const options = {
    width: '100%',
    height: '100%',
    chartArea:{
      left: '22%',
      top: '22%',
      width:'71%',
      height:'65%',
    },

    title: 'Daily Sales',
    titlePosition: 'none',
    
    fontSize: 16,
    lineWidth: 0,

    vAxis: {
      textStyle: {
        color: '#a1a1a1',
      }, 
      minorGridlines: {
        count: 0,
      }, 
      gridlines: {
        count: 5,
      }
    },
    hAxis: {
      textPosition: 'none',
      minValue: [4, 0],
    },
    legend: {
      position: 'none',
      textStyle: {
        color: '#a1a1a1',
        fontSize: 14,
      },
    },
    
    areaOpacity: 0.7,
    series: {
      0: { color: '#5ad5a8'},
      1: { color: '#a4e4dd'},
      2: { color: '#84b0dd'},
    },
  };
  draw(data, options);
}

const draw = (data, options) => {
  const chart = new google.visualization.AreaChart(document.getElementById('chart__daily-sales'));
  chart.draw(data, options); 
}
