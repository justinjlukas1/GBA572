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
    }
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
