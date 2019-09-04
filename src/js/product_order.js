google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(init);

export function init() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Product Order');
  data.addColumn('number', 'Amounts');
  data.addRows([
    ['Finished', 23043],
    ['Pending', 12435],
    ['Reject', 4503] 
  ]);

  /*var total = 0;
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    total = total + data.getValue(i, 1);
  }

  for (var i = 0; i < data.getNumberOfRows(); i++) {
    var label = data.getValue(i, 0);
    var val = data.getValue(i, 1);
    data.setFormattedValue(i, 0, val + '\n' + label);
  }*/

  var options = {
    width: '100%',
    height: '100%',
    chartArea:{ top: "20%", width:"100%", height:"60%" },

    title: 'Product Order',
    titlePosition: 'none',

    fontSize: 16,
    colors: '#2c3e50',

    pieSliceText: 'none',
    pieStartAngle: 200,
    
    tooltip: {textStyle: {color: '#aaaaaa', fontSize: 14}},
    legend: {position: 'bottom', textStyle: {color: '#aaaaaa', fontSize: 14}},
    slices: {
      0: { color: '#486afa' },
      1: { color: '#f8e367' },
      2: { color: '#f05757' }
    }
  };

  draw(data, options);
}

var draw = (data, options) => {
  var chart = new google.visualization.PieChart(document.getElementById('chart__product-order'));
  chart.draw(data, options);
}