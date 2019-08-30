google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(initRevenue);

function initRevenue() {
  var data = google.visualization.arrayToDataTable([
    ['Month', 'Items', {'type': 'string','role': 'style'}],
    ['JUL', 1000, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['AUG', 1250, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['SEP', 1050, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['OCT', 1250, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['NOV', 950, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['DES', 1300, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}'],
    ['JAN', 1650, 'point {fill-color: #accbea; stroke-color: #5a98d5; stroke-width: 4;}']
  ]);

  var options = {
    width: '100%',
    height: '100%',
    chartArea:{ left: 0, top: "27%", width:"100%", height:"81%" },

    title: 'Revenue This year',
    titlePosition: 'none',

    fontSize: 16,
    pointSize: 17,
    pointsVisible: false,
    lineWidth: 4,
    
    vAxis: {textPosition: 'none', minValue: 0, gridlines: {count: 0}, minorGridlines: {count: 0}, baselineColor: '#accbea'},
    hAxis: {textStyle: {color: '#286aab', bold: true}, textPosition: 'in'},
    legend: {position: 'none'},

    areaOpacity: 0.5,
    series: {
      0: { color: '#5a98d5'},
    }
  };

  drawRevenue(data, options);
}
var drawRevenue = (data, options) => {
  var chart = new google.visualization.AreaChart(document.getElementById('chart__revenue'));
  chart.draw(data, options); 

  google.visualization.events.addListener(chart, 'ready', readyHandler);
  var readyHandler = (e) => {
    chart.setSelection([{"row":5,"column":1}]);
  }
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(initProductOrder);
function initProductOrder() {
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

  drawProductOrder(data, options);
}
var drawProductOrder = (data, options) => {
  var chart = new google.visualization.PieChart(document.getElementById('chart__product-order'));
  chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(initCustomers);
function initCustomers() {
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
    width: '100%',
    height: '100%',
    chartArea:{ left: "6%", top: "35%", width:"88%", height:"47%"},

    title: 'Customers',
    titlePosition: 'none',

    fontSize: 16,
    colors: '#2c3e50',

    curveType: 'function',
    crosshair: {opacity: 0.2},
    explorer: {zoomDelta: 3},
    lineWidth: 4,
    
    vAxis: {textPosition: 'none', gridlines: {count: 3},  minorGridlines: {count: 0}},
    hAxis: {textPosition: 'none'},
    legend: {position: 'top', textStyle: {color: '#2c3e50', fontSize: 14, bold: true}},
    
    series: {
      0: { color: '#467cb2' },
      1: { color: '#accbea' },
    }
  };
  drawCustomers(data, options);
}
var drawCustomers = (data, options) => {
  var chart = new google.visualization.LineChart(document.getElementById('chart__customers'));
  chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(initDailySales);
function initDailySales() {
  var data = google.visualization.arrayToDataTable([
    ['Daily Sales', 'USA', 'Canada', 'Mexico'],
    ['1', new Date(2016, 10, 22, 4, 0), new Date(2016, 10, 22, 6, 0), new Date(2016, 10, 22, 4, 0)],
    ['2', new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 8, 0), new Date(2016, 10, 22, 4, 0)],
    ['3', new Date(2016, 10, 22, 6, 0), new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 12, 0)],
    ['4', new Date(2016, 10, 22, 9, 30), new Date(2016, 10, 22, 8, 0), new Date(2016, 10, 22, 7, 0)],
    ['5', new Date(2016, 10, 22, 11, 30), new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 8, 30)],
    ['6', new Date(2016, 10, 22, 4, 0), new Date(2016, 10, 22, 12, 0), new Date(2016, 10, 22, 4, 0)]
  ]);
  
  var options = {
    width: '100%',
    height: '100%',
    chartArea:{ left: "22%", top: "22%", width:"71%", height:"65%" },

    title: 'Daily Sales',
    titlePosition: 'none',
    
    fontSize: 16,
    lineWidth: 0,

    vAxis: {textStyle: {color: '#a1a1a1'}, minorGridlines: {count: 0}, gridlines: {count: 5}},
    hAxis: {textPosition: 'none', minValue: [4, 0]},
    legend: {position: 'none', textStyle: {color: '#a1a1a1', fontSize: 14}},
    
    areaOpacity: 0.7,
    series: {
      0: { color: '#5ad5a8'},
      1: { color: '#a4e4dd'},
      2: { color: '#84b0dd'},
    }
  };
  drawDailySales(data, options);
}
var drawDailySales = (data, options) => {
  var chart = new google.visualization.AreaChart(document.getElementById('chart__daily-sales'));
  chart.draw(data, options); 
}

google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(initMonthlySales);
function initMonthlySales() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Month');
  data.addColumn('number', 'Day time');
  data.addColumn('number', 'Night time');

  data.addRows([
    ["April", 50, 10],
    ["May", 87, 60],
    ["June", 40, 25],
    ["July", 28, 13],
    ["August", 35, 15],
    ["September", 30, 15],
    ["October", 26, 10],
    ["November", 65, 30],
    ["December", 36, 7]
  ]);

  var options = {
    width: '100%',
    height: '100%',
    chartArea:{ left: "14%", top: "20%", width:"75%", height:"70%" },

    title: 'Monthly Sales (In Millions)',
    titlePosition: 'none',

    fontSize: 16,
    colors: '#2c3e50',

    isStacked: true,
    bar: {groupWidth: "40%"},

    vAxis: { 
      logScale: true, 
      viewWindow: {min: 20}, 
      textStyle: {color: '#a1a1a1', fontSize: 14}, 
      ticks: [20, 30, 50, 100, 200], 
      gridlines: {count: 0, color: '#edebeb'}
    },
    hAxis: { textPosition: 'none', gridlines: {count: 0}, minorGridlines: {count: 0}},
    legend: { position: 'none' },

    series: {
      0: { color: '#accbea' },
      1: { color: '#9ab6d3' },
    }
  };

  drawMonthlySales(data, options);
}
var drawMonthlySales = (data, options) => {
  var chart = new google.visualization.ColumnChart(document.getElementById('chart__monthly-sales'));
  chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(initDepartmentSales);
function initDepartmentSales() {
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
    data.setFormattedValue(i, 0, ' ' + percentual + '% ' + label);
  }

  var options = {
    width: '100%',
    height: '100%',
    chartArea:{ left: "5%", top: "10%", width:"80%", height:"90%" },

    title: 'Department Sales',
    titlePosition: 'none',
    
    fontSize: 16,
    colors: '#2c3e50',

    pieSliceText: 'none',
    pieHole: 0.75,
    
    legend: {textStyle: {color: '#aaaaaa', fontSize: 16}, alignment: 'center'},
    tooltip: {textStyle: {color: '#aaaaaa', fontSize: 14}},
    slices: {
      0: { color: '#f8e367' },
      1: { color: '#e18197' },
      2: { color: '#8abe6e' },
      3: { color: '#93ccce' },
      4: { color: '#7ababc' },
    }
  };
  drawDepartmentSales(data, options);
}
var drawDepartmentSales = (data, options) => {
  var chart = new google.visualization.PieChart(document.getElementById('chart__department-sales'));
  chart.draw(data, options);
}

$(window).on("resize", (event) => {
  setTimeout(reInitCharts(), 50);  
});

reInitCharts = () => {
  initRevenue();
  initProductOrder();
  initCustomers();
  initDailySales();
  initMonthlySales();
  initDepartmentSales();
};
