const totalSpots = 5;

//aktualisieren der Belegung
function updateParkingData() {
  for (let i = 1; i <= totalSpots; i++) {
    const spot = document.getElementById(`P${i}`);
    const occupied = Math.random() > 0.6;
    spot.setAttribute('fill', occupied ? '#e53935' : '#4caf50');
  }
}

//periodisches Update
updateParkingData();
setInterval(updateParkingData, 2000);
