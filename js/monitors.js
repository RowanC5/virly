const container = document.getElementById("monitor-container");

const monitorBestanden = [
  "xiaomi-a22i.json"
  // Voeg hier extra bestanden toe zoals "lg-ultrafine-27.json", "samsung-odyssey-g5.json"
];

monitorBestanden.forEach(bestand => {
  fetch(`../data/electronica/monitors/${bestand}`)
    .then(res => res.json())
    .then(data => {
      const monitor = document.createElement("div");
      monitor.className = "monitor-kaart";
      monitor.innerHTML = `
        <h2>${data.merk} ${data.model}</h2>
        <p><strong>Prijs:</strong> €${data.gemiddeldePrijs}</p>
        <p><strong>Resolutie:</strong> ${data.resolutie}</p>
        <p><strong>Refresh rate:</strong> ${data.refreshRate}</p>
        <p><strong>Reactietijd:</strong> ${data.reactietijd}</p>
        <p><strong>Helderheid:</strong> ${data.helderheid}</p>
        <p><strong>Vorm:</strong> ${data.vorm}</p>
        <p><strong>HDMI:</strong> ${data.hdmiPoorten}</p>
        <p><strong>DisplayPort:</strong> ${data.displayPortPoorten}</p>
        <p><strong>Energielabel:</strong> ${data.energieLabel}</p>
        <p><strong>Verbruik:</strong> ${data.verbruikKwhPer1000h} kWh/1000h</p>
      `;
      container.appendChild(monitor);
    });
});