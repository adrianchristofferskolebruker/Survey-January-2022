// Henter elementer
let quizEl = document.querySelector("#quiz");
let resultatEl = document.querySelector("#resultat");


// Array med spørsmål
var quiz = [
    { sporsmaal: "Jorden er flat.",
        alternativer: ["uenig", "enig"],
        antallEnige: 0,
        id: "q1"},
    { sporsmaal: "Universet er uendelig",
        alternativer: ["uenig", "enig"],
        antallEnige: 0,
        id: "q2"},
    { sporsmaal: "The big bang theory",
        alternativer: ["uenig", "enig"],
        antallEnige: 0,
        id: "q3"},
    { sporsmaal: "Evolusjonsteorien",
        alternativer: ["uenig", "enig"],
        antallEnige: 0,
        id: "q4"}
];


//liste over "enig"-knapper
let enigRadioknapper = [];


// Skriver spørsmålene til nettsiden
for (let i = 0; i < quiz.length; i++) {
    // Lager et <div>-element til hvert spørsmål
    let sporsmaalEl = document.createElement("div");
    // Gir <div>-elementet klassen checkboxradio
    sporsmaalEl.className = "checkboxradio";
    // Lager et <h3>-elementet til spørsmålet
    let h3El = document.createElement("h3");
    // Legger til spørsmålet i <h3>-elementet
    h3El.innerHTML = quiz[i].sporsmaal;
    // Legger til <h3>-elementet i <div>-elementet
    sporsmaalEl.appendChild(h3El);

    // Lager elementer for hvert av alternativene
    for (let j = 0; j < quiz[i].alternativer.length; j++) {
        // Lager en <label>
        let labelEl = document.createElement("label");
        // Lager en radioknapp
        let radioEl = document.createElement("input");
        radioEl.type = "radio";
        radioEl.name = i;

        // Legger til knappen i <label>-elementet
        labelEl.appendChild(radioEl);

        // Legger til svaralternativ
        labelEl.innerHTML += quiz[i].alternativer[j];

        // Legger til <label>-elementet i <div>-elementet
        sporsmaalEl.appendChild(labelEl);
    }

    // Legger til <div>-elementet i quiz-elementet
    quizEl.appendChild(sporsmaalEl);
}





// Legger til en knapp til slutt
let knappEl = document.createElement("button");
knappEl.innerHTML = "svar";

// Legger til lytter på knappen
knappEl.addEventListener("click", finnPoeng);

// Legger til knappen på nettsiden
quizEl.appendChild(knappEl);


//funksjon som beregner antall ganger noen har trykket på "svar"
function finnPoeng (){

    if (localStorage.antallSvar) {
        localStorage.antallSvar = Number(localStorage.antallSvar) + 1;
    } else {
        localStorage.antallSvar = 1;
    }



    // Henter alle radioknapper på siden
    alleRadioEl = document.querySelectorAll("input[type='radio']");


    // Går gjennom alle radioknappene
    let q = 0;
    for (var i = 1;  i < alleRadioEl.length; i += 2) {
        // Hvis en radioknapp er haket av
        if (alleRadioEl[i].checked) {
            // Undersøk om alternativet er riktig
                if (localStorage.getItem(quiz[q].id)) {
                    localStorage.setItem(quiz[q].id, Number(localStorage.getItem(quiz[q].id)) + 1);
                } else {
                    localStorage.setItem(quiz[q].id, Number("1"));
                }
        }
        q++;
    }
}


let antallBrukere = document.createElement("p");
resultatEl.appendChild(antallBrukere);

// Funksjon som skriver ut diagram
function visResultat() {

    var xValues = [];
    var yValues = [];

    for (let i = 0; i < quiz.length; i++) {
        xValues.push(quiz[i].sporsmaal);
        yValues.push(localStorage.getItem(quiz[i].id) / localStorage.antallSvar * 100);
    }

    console.log(yValues);

    var barColors = ["red", "green", "blue", "orange"];

    antallBrukere.innerHTML = "Antall besvarelser: " + localStorage.antallSvar;

    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return value + "%";                        }
                    }
                }]
            },
            title: {
                display: true,
                text: "Antall enige"
            }
        }
    });
}


/*let svarEl = document.querySelector("#resultat");
svarEl.addEventListener("click", skrivAntall);

let antallTrykk = 0;

function skrivAntall() {
antallTrykk++;
.innerHTML = "Antall brukere som har svart på spørreundersøkelsen er:.";
}*/

