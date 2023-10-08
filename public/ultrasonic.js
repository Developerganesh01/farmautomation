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
  const sensorValues = [5,6,7,6,5,6,7] //mongo db
  for(let i = 0;i < 10;i++) label.push(i);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: label,
      datasets: [{
        label: 'ph value',
        data: sensorValues,
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
