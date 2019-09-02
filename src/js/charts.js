import * as revenue from './charts/revenue.js';
import * as productOrder from './charts/product_order.js';
import * as customers from './charts/customers.js';
import * as dailySales from './charts/daily_sales.js';
import * as monthSales from './charts/month_sales.js';
import * as departmentSales from './charts/department_sales.js';

$(window).on("resize", (event) => {
  setTimeout(reInitCharts(), 50);  
});

var reInitCharts = () => {
  revenue.init();
  productOrder.init();
  customers.init();
  dailySales.init();
  monthSales.init();
  departmentSales.init();
};
