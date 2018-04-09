function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// Load the Visualization API and the controls package.
google.charts.load('current', {'packages':['corechart', 'controls']});
// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawDashboard);
// Callback that creates and populates a data table,
// instantiates a dashboard, a range slider and a pie chart,
// passes in the data and draws it.
function drawDashboard() {
  // Create our data table.
  var data = google.visualization.arrayToDataTable([
    ['Name', 'Donuts eaten'],
          ['Michael' , 5],
          ['Elisa', 7],
          ['Robert', 3],
          ['John', 2],
          ['Jessica', 6],
          ['Aaron', 1],
          ['Margareth', 8]
    // ['Name', 'Gender', 'Age', 'Donuts eaten'],
    // ['Michael' , 'Male', 12, 5],
    // ['Elisa', 'Female', 20, 7],
    // ['Robert', 'Male', 7, 3],
    // ['John', 'Male', 54, 2],
    // ['Jessica', 'Female', 22, 6],
    // ['Aaron', 'Male', 3, 1],
    // ['Margareth', 'Female', 42, 8]

  ]);

  // Create a dashboard.
  var dashboard = new google.visualization.Dashboard(
      document.getElementById('dashboard_div'));
  // Create a range slider, passing some options
  var donutRangeSlider = new google.visualization.ControlWrapper({
    'controlType': 'NumberRangeFilter',
    'containerId': 'filter_div',
    'options': {
      'filterColumnLabel': 'Donuts eaten'
    }
  });
  // Create a pie chart, passing some options
  var pieChart = new google.visualization.ChartWrapper({
    'chartType': 'PieChart',
    'containerId': 'chart_div',
    'options': {
      'width': 300,
      'height': 300,
      'pieSliceText': 'value',
      'legend': 'right'
    },
    // 'view': {'columns': [0, 3]}
  });
  // Establish dependencies, declaring that 'filter' drives 'pieChart',
  // so that the pie chart will only display entries that are let through
  // given the chosen slider range.
  dashboard.bind(donutRangeSlider, pieChart);
  // Draw the dashboard.
  dashboard.draw(data);
}

function drawChart() {
  var data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Work', 8],
  ['Eat', 2],
  ['TV', 4],
  ['Gym', 2],
  ['Sleep', 8]
]);
  // Optional; add a title and set the width and height of the chart
  var options = {'title':'My Average Day', 'width':550, 'height':400};
  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}


function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['Country', 'Popularity'],
    ['Germany', 200],
    ['United States', 300],
    ['Brazil', 400],
    ['Canada', 500],
    ['France', 600],
    ['RU', 700]
  ]);

  var options = {};

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  chart.draw(data, options);
}

function drawUser() {
  var jsonData = $.ajax({
      url: "getData.php",
      dataType: "json",
      async: false
      }).responseText;

  // Create our data table out of JSON data loaded from server.
  var data = new google.visualization.DataTable(jsonData);

  // Instantiate and draw our table, passing in some options.
  var table = new google.visualization.Table(document.getElementById('table_div'));
  table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});

}

/*
function countVMSDataRequest() {
  int count = $.ajax({
      url: "vmsDataRequest.php",
      dataType: "int",
      async: false
      }).responseText;

  // Create our data table out of JSON data loaded from server.
  var data = new google.visualization.DataTable(jsonData);

  // Instantiate and draw our table, passing in some options.
  var table = new google.visualization.Table(document.getElementById('table_div'));
  table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});

}

function countInstallRequest() {
  int count = $.ajax({
      url: "countInstall.php",
      dataType: "int",
      async: false
      }).responseText;

  // Create our data table out of JSON data loaded from server.
  var data = new google.visualization.DataTable(jsonData);

  // Instantiate and draw our table, passing in some options.
  var table = new google.visualization.Table(document.getElementById('table_div'));
  table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});

}

function countUpgradeRequest() {
  int count = $.ajax({
      url: "countUpgrade.php",
      dataType: "int",
      async: false
      }).responseText;

  // Create our data table out of JSON data loaded from server.
  var data = new google.visualization.DataTable(jsonData);

  // Instantiate and draw our table, passing in some options.
  var table = new google.visualization.Table(document.getElementById('table_div'));
  table.draw(data, {showRowNumber: false, width: '100%', height: '100%'});

}
*/

function drawLineChart() {
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'x');
  data.addColumn('number', 'values');
  data.addColumn({id:'i0', type:'number', role:'interval'});
  data.addColumn({id:'i1', type:'number', role:'interval'});
  data.addColumn({id:'i2', type:'number', role:'interval'});
  data.addColumn({id:'i2', type:'number', role:'interval'});
  data.addColumn({id:'i2', type:'number', role:'interval'});
  data.addColumn({id:'i2', type:'number', role:'interval'});

  data.addRows([
      [1, 100, 90, 110, 85, 96, 104, 120],
      [2, 120, 95, 130, 90, 113, 124, 140],
      [3, 130, 105, 140, 100, 117, 133, 139],
      [4, 90, 85, 95, 85, 88, 92, 95],
      [5, 70, 74, 63, 67, 69, 70, 72],
      [6, 30, 39, 22, 21, 28, 34, 40],
      [7, 80, 77, 83, 70, 77, 85, 90],
      [8, 100, 90, 110, 85, 95, 102, 110]]);

  // The intervals data as narrow lines (useful for showing raw source data)
  var options_lines = {
      title: 'Line intervals, default',
      curveType: 'function',
      lineWidth: 4,
      intervals: { 'style':'line' },
      legend: 'none'
  };

  var chart_lines = new google.visualization.LineChart(document.getElementById('chart_lines'));
  chart_lines.draw(data, options_lines);
}

function drawBarChart() {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses', 'Profit'],
    ['2014', 1000, 400, 200],
    ['2015', 1170, 460, 250],
    ['2016', 660, 1120, 300],
    ['2017', 1030, 540, 350]
  ]);

  var options = {
    chart: {
      title: 'Company Performance',
      subtitle: 'Sales, Expenses, and Profit: 2014-2017',
    },
    bars: 'vertical' // Required for Material Bar Charts.
  };

  var chart = new google.charts.Bar(document.getElementById('barchart_material'));

  chart.draw(data, google.charts.Bar.convertOptions(options));
  google.visualization.events.addListener(chart, 'select', selectHandler);

function selectHandler(e) {
  alert(getFormattedValue());

}
}
