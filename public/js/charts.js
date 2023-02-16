
// var ctx = document.getElementById('myChart');

// var data = {
//   labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
//   datasets: [
//     {
//       label: "Stock A",
//       data: [10, 50, 25, 70, 40],
//       backgroundColor: "#f32f2f",
//       borderColor: "#ff6f6f",
//       fill: false,
//       lineTension: 0,
//       radius: 5
//     },
//     {
//       label: "Stock B",
//       data: [20, 35, 40, 60, 50],
//       backgroundColor: "#ffe56f",
//       borderColor: "#ffd100",
//       fill: false,
//       lineTension: 0,
//       radius: 5
//     },
//     {
//       label: "Stock C",
//       data: [50, 60, 75, 80, 60],
//       backgroundColor: "#7aff6f",
//       borderColor: "#21ea11",
//       fill: false,
//       lineTension: 0,
//       radius: 5
//     },
//     {
//       label: "Stock D",
//       data: [90, 25, 45, 20, 10],
//       backgroundColor: "#6f89ff",
//       borderColor: "#1940f0",
//       fill: false,
//       lineTension: 0,
//       radius: 5
//     },
//     {
//       label: "Stock E",
//       data: [70, 20, 15, 40, 0],
//       backgroundColor: "#d36fff",
//       borderColor: "#a811eb",
//       fill: false,
//       lineTension: 0,
//       radius: 5
//     }
//   ]
// };

// //options
// var options = {
//   responsive: true,
//   title: {
//     display: true,
//     position: "top",
//     text: "Five Day Performance",
//     fontSize: 18,
//     fontColor: "#111"
//   },
//   legend: {
//     display: true,
//     position: "bottom",
//     labels: {
//       fontColor: "#333",
//       fontSize: 16
//     }
//   }
// };

// //create Chart class object
// var chart = new Chart(ctx, {
//   type: "line",
//   data: data,
//   options: options
// });


// //chart 2
// var ctx2 = document.getElementById('myChart2');

// var data2 = {
//   labels: ["stock1", "stock2", "stock3", "stock4", "stock5"],
//   datasets: [
//     {
//       label: "Total Investments",
//       data: [10, 50, 25, 70, 40],
//       backgroundColor: ["#ff6f6f", "#ffe56f", "#7aff6f", "#6f89ff", "#d36fff"],

//       fill: false,
//       lineTension: 0,
//       radius: 5
//     }

//   ]
// };

// //options
// var options2 = {
//   responsive: true,
//   title: {
//     display: true,
//     position: "top",
//     text: "Total Investments",
//     fontSize: 18,
//     fontColor: "#111"
//   },
//   legend: {
//     display: true,
//     position: "bottom",
//     labels: {
//       fontColor: "#333",
//       fontSize: 16
//     }
//   }
// };

// //create Chart class object
// var chart2 = new Chart(ctx2, {
//   type: "doughnut",
//   data: data2,
//   options: options2
// });
let chart;
let chart2;
function grabChars() {
  fetch("/api/chart/")
    .then(response => response.json())
    .then(data => {
      const ctx = document.getElementById('myChart');
      const ctx2 = document.getElementById('myChart2');
      chart = new Chart(ctx, {
        type: "line",
        data: data.data,
        options: data.options
      });
      
      chart2 = new Chart(ctx2, {
        type: "doughnut",
        data: data.data2,
        options: data.options2
      });
    });
}
