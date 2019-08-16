google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawRevenue);

function drawRevenue() {
  var data = google.visualization.arrayToDataTable([
    ['Month', 'Amouts'],
    ['JUL', 20],
    ['AUG', 25],
    ['SEP', 21],
    ['OCT', 25],
    ['NOV', 19],
    ['DES', 26],
    ['JAN', 33]
  ]);

  var options = {
    height: 370,
    title: 'Revenue This year',
    titlePosition: 'none',
    fontSize: 16,
    fontName: 'Montserrat',
    vAxis: {textPosition: 'none', minValue: 0, gridlines: {count: 0}, minorGridlines: {count: 0}},
    hAxis: {textStyle: {color: '#286aab'}, textPosition: 'in'},
    legend: {position: 'none'},
    //annotations: {highContrast: true},
    lineWidth: 4,
    areaOpacity: 0.5,
    chartArea:{ left: 0, top: 90, width:"100%", height:"81%" },
    series: {
      0: { color: '#5a98d5'},
    }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart__revenue'));
  chart.draw(data, options); 
}


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawProductOrder);

function drawProductOrder() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Product Order');
  data.addColumn('number', 'Amounts');
  data.addRows([
    ['Finished', 23043],
    ['Pending', 12435],
    ['Reject', 4503] 
  ]);

  var total = 0;
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    total = total + data.getValue(i, 1);
  }

  for (var i = 0; i < data.getNumberOfRows(); i++) {
    var label = data.getValue(i, 0);
    var val = data.getValue(i, 1);
    var percentual = Math.round(((val / total) * 100));
    data.setFormattedValue(i, 0, val + '\n' + label);
  }

  var options = {
    title: 'Product Order',
    height: 370,
    titlePosition: 'none',
    chartArea:{ left: 20, top: 75, width:"90%", height:"55%" },
    pieSliceText: 'none',
    fontSize: 16,
    fontName: 'Montserrat',
    colors: '#2c3e50',
    legend: {position: 'bottom', textStyle: {color: '#aaaaaa', fontName: 'Montserrat', fontSize: 14}},
    tooltip: {textStyle: {color: '#aaaaaa', fontName: 'Montserrat', fontSize: 14}},
    slices: {
      0: { color: '#486afa' },
      1: { color: '#f8e367' },
      2: { color: '#f05757' }
    }
  };


  var chart = new google.visualization.PieChart(document.getElementById('chart__product-order'));
  chart.draw(data, options);
}



google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawCustomers);

function drawCustomers() {
  var data = new google.visualization.DataTable();
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
    ['11:00 PM', 348, 340]
  ]);

  var options = {
    title: 'Customers',
    titlePosition: 'none',
    curveType: 'function',
    crosshair: {opacity: 0.2},
    fontSize: 16,
    fontName: 'Montserrat',
    colors: '#2c3e50',
    explorer: {zoomDelta: 3},
    legend: {position: 'top', textStyle: {color: '#2c3e50', fontName: 'Montserrat', fontSize: 14, bold: true}},
    vAxis: {textPosition: 'none', gridlines: {count: 3},  minorGridlines: {count: 0}},
    hAxis: {textPosition: 'none'},
    lineWidth: 4,
    chartArea:{ left: 34, top: 150, width:"85%", height:"45%"},
    series: {
      0: { color: '#467cb2' },
      1: { color: '#accbea' },
    }
    //tooltip: {textStyle: {color: '#aaaaaa', fontName: 'Montserrat', fontSize: 14}},
    
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart__customers'));
  chart.draw(data, options);
}



google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawDailySales);

function drawDailySales() {
  var data = google.visualization.arrayToDataTable([
    ['Daily Sales', 'Green', 'Light-green', 'Blue'],
    ['1', new Date(2016, 10, 22, 4, 0), new Date(2016, 10, 22, 6, 0), new Date(2016, 10, 22, 4, 0)],
    ['2', new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 8, 0), new Date(2016, 10, 22, 4, 0)],
    ['3', new Date(2016, 10, 22, 6, 0), new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 12, 0)],
    ['4', new Date(2016, 10, 22, 9, 30), new Date(2016, 10, 22, 8, 0), new Date(2016, 10, 22, 7, 0)],
    ['5', new Date(2016, 10, 22, 11, 30), new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 8, 30)],
    ['6', new Date(2016, 10, 22, 4, 0), new Date(2016, 10, 22, 12, 0), new Date(2016, 10, 22, 4, 0)]
  ]);
  
  var options = {
    title: 'Daily Sales',
    titlePosition: 'none',
    fontSize: 16,
    fontName: 'Montserrat',
    vAxis: {textStyle: {color: '#a1a1a1'}},
    hAxis: {textPosition: 'none', minValue: [4, 0]},
    legend: {position: 'none', textStyle: {color: '#a1a1a1', fontSize: 14}},
    lineWidth: 0,
    areaOpacity: 0.7,
    chartArea:{ left: 120, top: 120, width:"70%", height:"64%" },
    series: {
      0: { color: '#5ad5a8'},
      1: { color: '#a4e4dd'},
      2: { color: '#84b0dd'},
    }
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart__daily-sales'));
  chart.draw(data, options); 
}





google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawMonthlySales);

function drawMonthlySales() {
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Header');
  data.addColumn('number', 'First');
  data.addColumn('number', 'Second');

  data.addRows([
    [1, 50, 20],
    [2, 90, 60],
    [3, 45, 30],
    [4, 26, 20],
    [5, 35, 15],
    [6, 30, 15],
    [7, 24, 20],
    [8, 60, 35],
    [9, 35, 8]
  ]);

  var options = {
    title: 'Monthly Sales (In Millions)',
    titlePosition: 'none',
    isStacked: true,
    vAxis: { textStyle: {color: '#a1a1a1'}, minValue: 20, ticks: [20, 30, 50, 100, 200], gridlines: {count: 0}},
    hAxis: { textPosition: 'none', gridlines: {count: 0}, minorGridlines: {count: 0}},
    legend: { position: 'none' },
    fontSize: 16,
    fontName: 'Montserrat',
    colors: '#2c3e50',
    chartArea:{ left: 70, top: 130, width:"70%", height:"64%" },
    bar: {groupWidth: "40%"},
    series: {
      0: { color: '#accbea' },
      1: { color: '#9ab6d3' },
    }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('chart__monthly-sales'));
  chart.draw(data, options);
}




google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawDepartmentSales);

function drawDepartmentSales() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Department Sales');
  data.addColumn('number', 'Percent');
  data.addRows([
    ['Clothing', 20],
    ['Electronics', 48],
    ['Kitchen Utility', 70],
    ['Cardening', 34],
    ['Food', 28] 
  ]);

  var total = 0;
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    total = total + data.getValue(i, 1);
  }

  for (var i = 0; i < data.getNumberOfRows(); i++) {
    var label = data.getValue(i, 0);
    var val = data.getValue(i, 1);
    var percentual = Math.round(((val / total) * 100));
    data.setFormattedValue(i, 0, ' (' + percentual + '%) ' + label);
  }

  var options = {
    title: 'Department Sales',
    titlePosition: 'none',
    chartArea:{ left: 33, top: 70, width:"85%", height:"75%" },
    pieSliceText: 'none',
    pieHole: 0.75,
    fontSize: 16,
    fontName: 'Montserrat',
    colors: '#2c3e50',
    legend: {textStyle: {color: '#aaaaaa', fontName: 'Montserrat', fontSize: 14}, alignment: 'center'},
    tooltip: {textStyle: {color: '#aaaaaa', fontName: 'Montserrat', fontSize: 14}},
    slices: {
      0: { color: '#f8e367' },
      1: { color: '#e18197' },
      2: { color: '#8abe6e' },
      3: { color: '#93ccce' },
      4: { color: '#7ababc' },
    }
  };


  var chart = new google.visualization.PieChart(document.getElementById('chart__department-sales'));
  chart.draw(data, options);
}