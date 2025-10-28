const SpotsZ1 = 23;
const SpotsZ2 = 18;
const SpotsZ3 = 18;
const SpotsZ4 = 18;
const SpotsZ5 = 18;
const SpotsZ6 = 18;
const SpotsZ7 = 18;
const SpotsZ8 = 12;
const SpotsZ9 = 12;
const SpotsZ10 = 12;


const parkingHistory = []; // Verlauf: [{time: Date, free: number}]
//const TOTAL_PARKING_SPOTS = 150;



/* =====================================================
START
===================================================== */

updateParkingData();
//setInterval(updateParkingData, 2000);

/* =====================================================
 PARKPLATZSIMULATION
===================================================== */

//  Aktualisiert die Parkplatzbelegung zufällig
function updateParkingData() {
    for (let z = 1; z <= 10; z++) {
        const totalSpots = eval(`SpotsZ${z}`);
        for (let i = 1; i <= totalSpots; i++) {
            const spot = document.getElementById(`z${z}p${i}`);
            if (!spot) continue;

            const occupied = Math.random() > 0.6; // Zufällige Belegung
            spot.setAttribute('fill', occupied ? '#e53935' : '#4caf50'); // Rot = belegt, Grün = frei
        }
    }

    updateStats();
    updateFreeSpotsCounter();
}

// Zählt freie Plätze und aktualisiert Verlauf + Anzeige
function updateFreeSpotsCounter() {
    let totalFree = 0;

    for (let z = 1; z <= 10; z++) {
        const totalSpots = eval(`SpotsZ${z}`);
        for (let i = 1; i <= totalSpots; i++) {
            const spot = document.getElementById(`z${z}p${i}`);
            if (!spot) continue;

            if (spot.getAttribute('fill') === '#4caf50') totalFree++;
        }
    }

    //  Text des Zählers aktualisieren
    document.getElementById('free-spots').textContent = `  ${totalFree}`;

    //  Verlauf speichern
    parkingHistory.push({ time: new Date(), free: totalFree });

    //  Nur Daten der letzten 24 Stunden behalten
    const cutoff = new Date(Date.now() - 24*60*60*1000);
    while (parkingHistory.length && parkingHistory[0].time < cutoff) {
        parkingHistory.shift();
    }

    drawParkingChart();
}

/* =====================================================
DIAGRAMMZEICHNUNG
===================================================== */

// Zeichnet das Belegungsdiagramm
function drawParkingChart() {
    const canvas = document.getElementById('parking-chart');
    if (!canvas) return; // Falls das Template kein Diagramm enthält
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const chartWidth = canvas.width - 60;  // Rand links für Y-Achse
    const chartHeight = canvas.height - 40; // Rand unten für X-Achse
    const paddingLeft = 50;
    const paddingTop = 10;

    if (parkingHistory.length === 0) return;

    //  Bestimme maximale Zahl freier Plätze
    const maxFree = Math.max(...parkingHistory.map(p => p.free));

    //  Unterteile die letzten 24 Stunden in Zeitintervalle
    const intervalMs = 30 * 60 * 1000; // 30 Minuten
    const now = Date.now();
    const startTime = now - 24 * 60 * 60 * 1000;

    const intervals = [];
    for (let t = startTime; t <= now; t += intervalMs) {
        intervals.push({ time: t, free: 0, count: 0 });
    }

    //  Werte eintragen
    parkingHistory.forEach(p => {
        const idx = Math.floor((p.time - startTime) / intervalMs);
        if (intervals[idx]) {
            intervals[idx].free += p.free;
            intervals[idx].count++;
        }
    });

    // Mittelwerte berechnen
    intervals.forEach(i => {
        if (i.count > 0) i.free = i.free / i.count;
    });

    //  Säulen zeichnen
    const barWidth = chartWidth / intervals.length;

    intervals.forEach((i, idx) => {
        const x = paddingLeft + idx * barWidth;
        const y = paddingTop + chartHeight - (i.free / maxFree) * chartHeight;
        const height = (i.free / maxFree) * chartHeight;

        ctx.fillStyle = '#4caf50';
        ctx.fillRect(x, y, barWidth - 1, height); // -1 = kleiner Spalt zwischen Balken
    });

    //  Y-Achse zeichnen
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(paddingLeft, paddingTop);
    ctx.lineTo(paddingLeft, paddingTop + chartHeight);
    ctx.stroke();

    //  X-Achse zeichnen
    const chartBottomY = paddingTop + chartHeight;
    const chartRightX = paddingLeft + chartWidth;

    ctx.strokeStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(paddingLeft, chartBottomY);
    ctx.lineTo(chartRightX, chartBottomY);
    ctx.stroke();

    //  Y-Achsen-Beschriftung
    ctx.fillStyle = '#000';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 0; i <= 5; i++) {
        const y = paddingTop + chartHeight - (i / 5) * chartHeight;
        const value = Math.round(maxFree * i / 5);
        ctx.fillText(value, paddingLeft - 5, y);
    }

    //  X-Achsen-Beschriftung (Stunden)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#333';

    const labelInterval = 6; // alle 6 Intervalle = 3 Stunden

    intervals.forEach((i, idx) => {
        if (idx % labelInterval === 0) {
            const x = paddingLeft + idx * barWidth + barWidth / 2;
            const date = new Date(i.time);
            // Nur Stunden (HH)
            const label = `${String(date.getHours()).padStart(2,'0')}`;
            ctx.fillText(label, x, paddingTop + chartHeight + 5);
        }
    });
}



/* =====================================================
STATISTIK
===================================================== */


//  Statistik aktualisieren
function updateStats() {
    if (parkingHistory.length === 0) return;

    const frees = parkingHistory.map(p => p.free);

    const max = Math.max(...frees);
    const min = Math.min(...frees);
    const avg = Math.round(frees.reduce((a, b) => a + b) / frees.length);

    //  Belegte Plätze berechnen (gesamt minus freie)
    document.getElementById("max-occupied").textContent = (SpotsZ1 + SpotsZ2 + SpotsZ3 + SpotsZ4 + SpotsZ5 + SpotsZ6+ SpotsZ7 + SpotsZ8 + SpotsZ9 + SpotsZ10 - min);
    document.getElementById("min-occupied").textContent = (SpotsZ1 + SpotsZ2 + SpotsZ3 + SpotsZ4 + SpotsZ5 + SpotsZ6+ SpotsZ7 + SpotsZ8 + SpotsZ9 + SpotsZ10 - max);
    document.getElementById("avg-occupied").textContent = (SpotsZ1 + SpotsZ2 + SpotsZ3 + SpotsZ4 + SpotsZ5 + SpotsZ6+ SpotsZ7 + SpotsZ8 + SpotsZ9 + SpotsZ10 - avg);
}


