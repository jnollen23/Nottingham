var ctx = document.getElementById('myChart');

var data = {
  labels: ["stock1", "stock2", "stock3", "stock4", "stock5"],
  datasets: [
    {
      label: "TeamA Score",
      data: [10, 50, 25, 70, 40],
      backgroundColor: "blue",
      borderColor: "lightblue",
      fill: false,
      lineTension: 0,
      radius: 5
    },
    {
      label: "TeamB Score",
      data: [20, 35, 40, 60, 50],
      backgroundColor: "green",
      borderColor: "lightgreen",
      fill: false,
      lineTension: 0,
      radius: 5
    }
  ]
};

//options
var options = {
  responsive: true,
  title: {
    display: true,
    position: "top",
    text: "Line Graph",
    fontSize: 18,
    fontColor: "#111"
  },
  legend: {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#333",
      fontSize: 16
    }
  }
};

//create Chart class object
var chart = new Chart(ctx, {
  type: "line",
  data: data,
  options: options
});


//chart 2
var ctx2 = document.getElementById('myChart2');

var data = {
  labels: ["stock1", "stock2", "stock3", "stock4", "stock5"],
  datasets: [
    {
      label: "Total Investments",
      data: [10, 50, 25, 70, 40],
      backgroundColor: "blue",
      borderColor: "lightblue",
      fill: false,
      lineTension: 0,
      radius: 5
    },
    {
      label: "TeamB Score",
      data: [20, 35, 40, 60, 50],
      backgroundColor: "green",
      borderColor: "lightgreen",
      fill: false,
      lineTension: 0,
      radius: 5
    }
  ]
};

//options
var options = {
  responsive: true,
  title: {
    display: true,
    position: "top",
    text: "Line Graph",
    fontSize: 18,
    fontColor: "#111"
  },
  legend: {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#333",
      fontSize: 16
    }
  }
};

//create Chart class object
var chart2 = new Chart(ctx2, {
  type: "pie",
  data: data,
  options: options
});
