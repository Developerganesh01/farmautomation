// public/sensor-plot.js
async function chart(data) {

    // Process the data and use Chart.js to plot the graph
    const sensorData= data;
    console.log(sensorData);
    const timestamps = sensorData.map(entry => new Date(entry.current_time));
    const values = sensorData.map(entry => entry.value);

    // Example: plot a simple line chart
    const ctx = document.getElementById('sensor-plot').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: timestamps,
            datasets: [{
                label: 'Sensor Data',
                data: values,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                x: [{
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'HH:mm',
                        },
                    },
                    position: 'bottom'
                }],
                y: [{
                    type: 'linear',
                    position: 'left'
                }]
            }
        }
    });
};
fetch(`/data/${sensor}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => chart(data))
    .catch(error => console.log(error));
