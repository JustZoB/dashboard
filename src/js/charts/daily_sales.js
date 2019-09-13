const google = window.google;

google.charts.load('current', {'packages':['corechart', 'bar']});
google.charts.setOnLoadCallback(init);

export default function init() {
  const data = google.visualization.arrayToDataTable([
    ['Daily Sales', 'USA', 'Canada', 'Mexico'],
    ['Monday', new Date(2016, 10, 22, 4, 0), new Date(2016, 10, 22, 6, 0), new Date(2016, 10, 22, 4, 0)],
    ['Tuesday', new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 8, 0), new Date(2016, 10, 22, 4, 0)],
    ['Wednesday', new Date(2016, 10, 22, 6, 0), new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 12, 0)],
    ['Thursday', new Date(2016, 10, 22, 9, 30), new Date(2016, 10, 22, 8, 0), new Date(2016, 10, 22, 7, 0)],
    ['Friday', new Date(2016, 10, 22, 11, 30), new Date(2016, 10, 22, 10, 0), new Date(2016, 10, 22, 8, 30)],
    ['Saturday', new Date(2016, 10, 22, 4, 0), new Date(2016, 10, 22, 12, 0), new Date(2016, 10, 22, 4, 0)],
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


/*const daily_sales = document.getElementById('chart_daily-sales').getContext('2d');
const daily_sales_data = new Chart(daily_sales, {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [{
                label: "Canada",
                backgroundColor: "rgba(132, 176, 221, 0.7)",
                data: [
                    {
                        x: 1,
                        y: new Date("2016-10-22 4:0"),
                    },
                    {
                        x: 2,
                        y: new Date("2016-10-22 4:0"),
                    },
                    {
                        x: 3,
                        y: new Date("2016-10-22 12:0"),
                    },
                    {
                        x: 4,
                        y: new Date("2016-10-22 7:0"),
                    },
                    {
                        x: 5,
                        y: new Date("2016-10-22 8:30"),
                    },
                    {
                        x: 6,
                        y: new Date("2016-10-22 4:0"),
                    },
            ]
            }, {
                label: "USA",
                backgroundColor: "rgba(164, 228, 221, 0.7)",
                data: [
                    {
                        x: 1,
                        y: new Date("2016-10-22 6:0"),
                    },
                    {
                        x: 2,
                        y: new Date("2016-10-22 8:0"),
                    },
                    {
                        x: 3,
                        y: new Date("2016-10-22 10:0"),
                    },
                    {
                        x: 4,
                        y: new Date("2016-10-22 8:0"),
                    },
                    {
                        x: 5,
                        y: new Date("2016-10-22 10:0"),
                    },
                    {
                        x: 6,
                        y: new Date("2016-10-22 12:0"),
                    },
                ]
            }, {
                label: "Mexico",
                backgroundColor: "rgba(90, 213, 168, 0.7)",
                data: [
                    {
                        x: 1,
                        y: new Date("2016-10-22 4:0"),
                    },
                    {
                        x: 2,
                        y: new Date("2016-10-22 10:0"),
                    },
                    {
                        x: 3,
                        y: new Date("2016-10-22 6:0"),
                    },
                    {
                        x: 4,
                        y: new Date("2016-10-22 9:30"),
                    },
                    {
                        x: 5,
                        y: new Date("2016-10-22 11:30"),
                    },
                    {
                        x: 6,
                        y: new Date("2016-10-22 4:0"),
                    },
                ]
            },
        ]
    },
    options: {
        
        elements: {
            line: {
                tension: 0.000001
            }
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 100,
                bottom: 20
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                },
                ticks: {
                },
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Date",
                },
                
                gridLines: {
                },
                ticks: {
                    
                },
            }],
        },
        legend: {
            display: false,
        },
    },
});*/
