
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawDailySales);

function drawDailySales() {

    var data = google.visualization.arrayToDataTable([
      ['Daily Sales', 'First', 'Second', 'Third'],
      ['04:00 AM', [4, 0], [4, 0], [4, 0]],
      ['06:00 AM', [10, 0], [6, 0], [12, 0]],
      ['08:00 AM', [6, 0], [10, 0], [8, 0]],
      ['10:00 AM', [9, 30], [8, 0], [6, 30]],
      ['12:00 AM', [11, 30], [12, 0], [0, 0]]
    ]);

    /*data.addColumn('timeofday', 'Time of Day');
    [{v: [8, 0, 0], f: '8 am'}, 1, .25],
    [{v: [9, 0, 0], f: '9 am'}, 2, .5],
    [{v: [10, 0, 0], f:'10 am'}, 3, 1],
    [{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
    [{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
    [{v: [13, 0, 0], f: '1 pm'}, 6, 3],
    [{v: [14, 0, 0], f: '2 pm'}, 7, 4],
    [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
    [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
    [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
    format: 'h:mm a',
      viewWindow: {
        min: [7, 30, 0],
        max: [17, 30, 0]
      } */

    var options = {
        title: 'Daily Sales',
        fontSize: 16,
        fontName: 'Montserrat',
        colors: '#2c3e50',
        hAxis: {textPosition: 'none'},
        legend: {position: 'none'},
        //annotations: {strokeWidth: 0},
        series: {
          0: { color: '#5ad5a8'},
          1: { color: '#a4e4dd'},
          2: { color: '#84b0dd'},
        },
        //hAxis: {},
        //vAxis: {minValue: 0}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart__daily-sales'));
    chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawDepartmentSales);

function drawDepartmentSales() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Department Sales');
  data.addColumn('number', 'Percent');
  data.addRows([
    ['Clothing', 10],
    ['Electronics', 24],
    ['Kitchen Utility', 35],
    ['Cardening', 17],
    ['Food', 14] 
  ]);

  var options = {
    title: 'Department Sales',
    chartArea:{ left: 33, top: 73, width:"75%", height:"75%" },
    pieSliceText: 'none',
    pieHole: 0.75,
    fontSize: 16,
    fontName: 'Montserrat',
    colors: '#2c3e50',
    legend: {textStyle: {color: '#aaaaaa', fontName: 'Montserrat', fontSize: 14}},
    tooltip: {textStyle: {color: '#aaaaaa', fontName: 'Montserrat', fontSize: 14}},
    slices: {
      0: { color: '#f8e367' },
      1: { color: '#e18197' },
      2: { color: '#8abe6e' },
      3: { color: '#93ccce' },
      4: { color: '#7ababc' },
    }
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart_department-sales'));
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
    ['06:00 AM', 270, 260],
    ['09:00 AM', 285, 280],
    ['12:00 AM', 300, 300],
    ['03:00 PM', 310, 312],
    ['06:00 PM', 320, 325],
    ['09:00 AM', 340, 338], 
    ['11:00 PM', 365, 357]
  ]);

  var options = {
    title: 'Customers',
    curveType: 'function',
    crosshair: {opacity: 0.2},
    fontSize: 16,
    fontName: 'Montserrat',
    colors: '#2c3e50',
    explorer: {zoomDelta: 3},
    legend: {position: 'top', textStyle: {color: '#2c3e50', fontName: 'Montserrat', fontSize: 14}},
    hAxis: {textPosition: 'none'},
    vAxis: {textPosition: 'none'},
    lineWidth: 4,
    chartArea: {width: '90%', height: '40%'},
    series: {
      0: { color: '#467cb2' },
      1: { color: '#accbea' },
    }
    //hAxis: {format: 'none'}
    //chartArea:{ left: 33, top: 73, width:"75%", height:"75%" },
    //fontName: 'Montserrat',
    //colors: '#2c3e50',
    
    //tooltip: {textStyle: {color: '#aaaaaa', fontName: 'Montserrat', fontSize: 14}},
    
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart__customers'));
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
    isStacked: true,
    hAxis: { textPosition: 'none' },
    legend: { position: 'none' },
    vAxis: { minValue: 20 },
    series: {
      0: { color: '#accbea' },
      1: { color: '#9ab6d3' },
    }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('chart_monthly-sales'));
  chart.draw(data, options);
}