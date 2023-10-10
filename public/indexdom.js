// Client-side code (JavaScript)
//global variables to store the data of sensors
const fetchData = () => {
    fetch('/randomdata')
      .then((response) => response.json())
      .then((data) => {
        // Display the received data on the webpage
        document.querySelector('.phvalbox').textContent = data.randomValue;
        document.querySelector('.tdsvaluebox').textContent = data.ppm;
        document.querySelector('.temperaturevalbox').textContent = `${data.temp}c`;
        document.querySelector('.tdsvalbox').textContent = data.tdsValue;
        document.querySelector('.doxygenvalbox').textContent = data.temp3;
        document.querySelector('.ldrvalbox').textContent = data.temp2;
        document.querySelector('.ultrasonicvalbox').textContent = data.temp1;
        document.querySelector('.barometervalbox').textContent = data.temp4;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  
  // Trigger the data fetch 
  setInterval(fetchData,20000);
