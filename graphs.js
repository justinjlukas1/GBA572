function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['Region', 'Work Order'],
    //americas
    ['019', 4],
    //asia
    ['142', 7],
    //europe
    ['150', 9],
    //africa
    ['002', 9]
  ]);

  var options = {
      //need to change region to 'world', using americas country code for testing
      region: '019',
      displayMode: 'regions',
  };

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

function countVMSDataRequest() {
  var count = $.ajax({
      url: "vmsDataRequest.php",
      dataType: "int",
      async: false
      }).responseText;

      return count;
}
/*
function countInstallRequest() {
  int count = $.ajax({
      url: "countInstall.php",
      dataType: "int",
      async: false
      }).responseText;

      return count;
}

function countUpgradeRequest() {
  int count = $.ajax({
      url: "countUpgrade.php",
      dataType: "int",
      async: false
      }).responseText;

      return count;
}
*/

function drawBarChart() {
  var data = google.visualization.arrayToDataTable([
    ['Location', 'New', 'Customer Waiting', 'In-Work', 'Total'],
    ['Americas', 5, 26, 19, 50],
    ['EMEA', 8, 11, 11, 30],
    ['AsiaPac', 0, 15, 2, 17],
    ['NetScout IT', 2, 0, 18, 20]
  ]);

  var options = {
    chart: {
      title: 'WIP Breakdown',
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
