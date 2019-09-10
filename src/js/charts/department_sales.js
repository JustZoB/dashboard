const google = window.google;

google.charts.load('current', {'packages':['corechart', 'bar']});
google.charts.setOnLoadCallback(init);

export default function init() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Department Sales');
  data.addColumn('number', 'Percent');
  
  data.addRows([
    ['Clothing', 20],
    ['Electronics', 48],
    ['Kitchen Utility', 70],
    ['Cardening', 34],
    ['Food', 28],
  ]);

  var total = 0;
  for (let i = 0; i < data.getNumberOfRows(); i++) {
    total = total + data.getValue(i, 1);
  }

  for (let i = 0; i < data.getNumberOfRows(); i++) {
    const label = data.getValue(i, 0);
    const val = data.getValue(i, 1);
    const percentual = Math.round(((val / total) * 100));
    data.setFormattedValue(i, 0, ' ' + percentual + '% ' + label);
  }

  const options = {
    width: '100%',
    height: '100%',
    chartArea:{
      left: '5%',
      top: '10%',
      width:'80%',
      height:'90%',
    },

    title: 'Department Sales',
    titlePosition: 'none',
    
    fontSize: 16,
    colors: '#2c3e50',

    pieSliceText: 'none',
    pieHole: 0.75,
    
    legend: {
      textStyle: {
        color: '#aaaaaa',
        fontSize: 16,
      }, 
      alignment: 'center',
    },
    tooltip: {
      textStyle: {
        color: '#aaaaaa',
        fontSize: 14,
      },
    },
    slices: {
      0: { color: '#f8e367' },
      1: { color: '#e18197' },
      2: { color: '#8abe6e' },
      3: { color: '#93ccce' },
      4: { color: '#7ababc' },
    },
  };

  draw(data, options);
}

const draw = (data, options) => {
  const chart = new google.visualization.PieChart(document.getElementById('chart__department-sales'));
  chart.draw(data, options);
}
