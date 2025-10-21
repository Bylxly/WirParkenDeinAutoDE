const SpotsZ1 = 23;
const SpotsZ2 = 18;
const SpotsZ3 = 18;
/**
fetch("daten.json")
  .then(response => response.json())
  .then(data => {
    console.log(data.name);
    data.punkte.forEach(p => {
      console.log(`x=${p.x}, y=${p.y}`);
    });
  })
  .catch(error => console.error("Fehler:", error));
*/

//aktualisieren der Belegung
function updateParkingData() {
  for (let z = 1; z <= 3; z++) {
    const totalSpots = eval(`SpotsZ${z}`);
    for (let i = 1; i <= totalSpots; i++) {
      const spot = document.getElementById(`z${z}p${i}`);
      const occupied = Math.random() > 0.6;
      spot.setAttribute('fill', occupied ? '#e53935' : '#4caf50');
    }
  }
}

//periodisches Update
updateParkingData();
setInterval(updateParkingData, 2000);
