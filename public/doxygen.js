let doxygenValues=[1,2,3,4,5,9];
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  const ctx = document.getElementById('myChart');

  const label = []
  for(let i = 0;i < 10;i++) label.push(i);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: [{
        label: 'doxygen value',
        data: deoxygenValues,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });