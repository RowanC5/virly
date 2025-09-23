const pakketten = [
  {
    verzekeraar: "DSW",
    pakket: "Student AV",
    maandprijs: 135,
    trustpilot: 4.2,
    studentOnly: true,
    linkBasis: "https://dsw.nl/basis",
    linkAV: "https://dsw.nl/student-av",
    dekking: {
      fysio: "9 behandelingen",
      anticonceptie: "Geen vergoeding",
      buitenland: "100%",
      vaccinaties: "100%",
      bril: "€100 per 2 jaar"
    }
  },
  {
    verzekeraar: "CZ",
    pakket: "Zorgbewust + AV Top",
    maandprijs: 149,
    trustpilot: 4.0,
    studentOnly: false,
    linkBasis: "https://cz.nl/basis",
    linkAV: "https://cz.nl/av-top",
    dekking: {
      fysio: "18 behandelingen",
      anticonceptie: "100%",
      buitenland: "100%",
      vaccinaties: "100%",
      bril: "€150 per 2 jaar"
    }
  },
  {
    verzekeraar: "VGZ",
    pakket: "Bewust + Aanvullend",
    maandprijs: 142,
    trustpilot: 3.9,
    studentOnly: false,
    linkBasis: "https://vgz.nl/basis",
    linkAV: "https://vgz.nl/aanvullend",
    dekking: {
      fysio: "12 behandelingen",
      anticonceptie: "Onvoldoende",
      buitenland: "100%",
      vaccinaties: "Geen vergoeding",
      bril: "Geen vergoeding"
    }
  }
];

document.getElementById("keuzeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  toonResultaten();
});

document.getElementById("sortering").addEventListener("change", function() {
  toonResultaten();
});

function toonResultaten() {
  const form = document.getElementById("keuzeForm");
  const voorkeuren = {
    fysio: form.fysio?.checked,
    anticonceptie: form.anticonceptie?.checked,
    buitenland: form.buitenland?.checked,
    vaccinaties: form.vaccinaties?.checked,
    bril: form.bril?.checked,
    student: form.student?.checked,
    budget: parseFloat(form.budget.value)
  };

  const sortering = document.getElementById("sortering").value;
  const container = document.getElementById("resultatenLijst");
  container.innerHTML = "";

  let resultaten = pakketten.filter(p => {
    if (voorkeuren.student && !p.studentOnly) return false;
    if (p.maandprijs > voorkeuren.budget) return false;
    return true;
  });

  if (sortering === "prijs") {
    resultaten.sort((a, b) => a.maandprijs - b.maandprijs);
  } else if (sortering === "naam") {
    resultaten.sort((a, b) => a.verzekeraar.localeCompare(b.verzekeraar));
  } // standaard = originele volgorde

  if (resultaten.length === 0) {
    container.innerHTML = "<p>Geen passende pakketten gevonden.</p>";
    return;
  }

  resultaten.forEach(p => {
    const kaart = document.createElement("div");
    kaart.className = "resultaat-kaart";

    kaart.innerHTML = `
      <div class="resultaat-header">
        <h3>${p.verzekeraar} – ${p.pakket}</h3>
        <span>€${p.maandprijs} / maand</span>
      </div>
      <div class="resultaat-details">
        <p><strong>Trustpilot:</strong> ${p.trustpilot}</p>
        <p><strong>Fysiotherapie:</strong> ${p.dekking.fysio}</p>
        <p><strong>Anticonceptie:</strong> ${p.dekking.anticonceptie}</p>
        <p><strong>Buitenland:</strong> ${p.dekking.buitenland}</p>
        <p><strong>Vaccinaties:</strong> ${p.dekking.vaccinaties}</p>
        <p><strong>Bril/lenzen:</strong> ${p.dekking.bril}</p>
        <p><a href="${p.linkBasis}" target="_blank">Basis</a> | <a href="${p.linkAV}" target="_blank">AV</a></p>
      </div>
    `;

    kaart.addEventListener("click", () => {
      kaart.classList.toggle("active");
    });

    container.appendChild(kaart);
  });
}