// LIVE CODING CALENDARIO
// - riempiamo l'h1 del calendario con il nome corrente

// Come faccio a trovare il la data corrente
// Il broswer tramite JS interagisce con il Sistema Operativo prendere la data da li

// per farlo, creiamo un OGGETTO DI TIPO DATA
const now = new Date() // Stiamo utilizzando una funzione COSTRUTTORE per creare un OGGETTO di tipo DATA
now.getTime() // <- quanti millesecondi passati dal 1 gennaio 1970

// Dobbiamo creare un array di stringhe con i nomi dei mesi per poter dare un indice ai mesi da chiamare
const allMonthsIT = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
]

const appuntamenti = []

// adesso andiamo ad usare now per trovare il MESE IN CUI SIAMO
const currentMonthH1 = () => {
  const h1 = document.querySelector("h1") //prende il primo h1 nella pagina, quindi anche l'unico che ci sia
  const indexMonth = now.getMonth() // torna il mese corrente in forma di number i mesi partono da 0 ed arrivano ad 11
  const currentMonth = allMonthsIT[indexMonth]
  h1.innerText = currentMonth // Stampa il mese corrente nell'h1
}
currentMonthH1()

// ora h1 mostrerà SEMPRE il mese giusto
// - step successivo: dobbiamo creare la GRIGLIA del calendario
// problema: come facciamo a torvare ogni volta il numero giusto dei giorni del mese corrente(JS è stupido e non lo sa)
// il numero di giorni equivarrà al numero delle celle sul calendario
// per trovare sempre i giorni giusti, si chiama il primo giorno del mese successivo e si tolgono 24 ore
// in maniera che la funzione restituisca sempre l'ultimo giorno del mese attuale

const numDayOfMonth = () => {
  const indexMonth = now.getMonth() // troviamo il numero del mese attuale come prima
  const currentYear = now.getFullYear() // torna il numero intero dell'anno corrente // Es. 2026
  //   ho bisogno di creare una Date es. -> new Date(2026,3,1) yyyy-mm-dd -> 1 aprile 2026
  const lastDayOfMonth = new Date(currentYear, indexMonth + 1, 0 /*1*/) // le date sono scritte all'americana (mannaggia a loro)
  // ma se noi invece di chiedere il primo giorno del mese con 1 ci mettiamo lo 0, lui ritornerà l'ultimo giorno del mese corrente

  // ora posso estrapolare il numero dell'ultimo giorno in maniera da poter creare le celle del mese
  const numberOfDays = lastDayOfMonth.getDate() // restituisce il numero del giorno calcolato in lastDayOfMonth in forma di number
  return numberOfDays
}
const numOfCells = numDayOfMonth() // adesso ABBIAMO IL NUMERO DI CELLE DA CREARE grazie al numero dei giorni del mese corrente
// che abbiamo ottenuto grazie alla funzione

const createCellsCalendar = () => {
  // con questa funzione andremo ad appendere il numero delle celle alla sezione del calendario
  emptyCalendarHTML = document.getElementById("calendar") // prendo la sezione interessate dove creare le celle tramite l'id
  for (let i = 0; i < numOfCells; i++) {
    //andiamo a creare una cella
    const div = document.createElement("div") // creo un elemento div
    div.classList.add("day") // aggiungo la classe day all'elemento div
    const dayH3DateValue = document.createElement("h3") // creo l'h3 dove verra "stampato" il giorno della data
    dayH3DateValue.innerText = i + 1 // inserisco dentro questo h3 il numero corrente, basandomi sulla i più 1 perché la i parte da 0
    //adesso "appendo" l'h3 alla cella del div"
    div.appendChild(dayH3DateValue)

    // METTIAMO IL GIORNO CORRENTE IN EVIDENZA
    // SE la cella equivale al giorno corrente gli diamo la classe color-epic
    if (i + 1 === now.getDate()) {
      div.classList.add("color-epic")
    }

    div.addEventListener("click", function () {
      const preveoslySelected = document.querySelector(".day.selected")

      if (preveoslySelected !== null) {
        div.classList.remove("selected")
      }
      div.classList.add("selected")
      //appendo poi il div all'interno del calendario per ogni singolo giorno
    })
    emptyCalendarHTML.appendChild(div)
    // per oggni giorno vado a pushare un array vuoto all'interno del master array del calendario
    appuntamenti.push([])
  }
}

createCellsCalendar()

// COME CREARE UN APPUNTAMENTO
// un appuntamento sarà una STRINGA -> "12:30 - Commercialista"
// usiamo un array per avere le varie stringhe innestate ognuna in un array che si rifà al giorno

// ora gestiamo l'interazione con il FORM: il form predispone uno spazio per selezionare il g
// (che già si riempie correttamente), per selezionare l'ORA e per scrivere un nome per l'app
// quello che manca è interagire con il suo evento di submit e inserire la stringa dell'event
// nel cassettino giusto dell'armadio
const form = document.getElementById("meeting-form")
form.addEventListener("submit", function (e) {
  e.preventDefault() // fermiamo l'aggiornamento automatico della pagina
  // decidiamo cosa fare quando il form viene inviato
  // 1) raccoglierò i dati del form
  // prendo prima i riferimenti ai DUE campi input!
  const newMeetingTimeInput = document.getElementById("newMeetingTime") // input ora
  const newMeetingNameInput = document.getElementById("newMeetingName") // input nome
  // grazie a loro, posso recuperare il VALORE degli input -> proprietà .value
  const newMeetingTime = newMeetingTimeInput.value // es. "12:00"
  const newMeetingName = newMeetingNameInput.value // es. "Pranzo fuori"
  // 2) comporrò la stringa relativa all'evento, es. "12:00 - Pranzo"
  // const appointment = newMeetingTime + " - " + newMeetingName // forma classica
  const appointment = `${newMeetingTime} - ${newMeetingName}` // forma backticks
  // 3) pusho la stringa nell'arrayino corrispondente al giorno che ho cliccato
  console.log("ECCO L'APPUNTAMENTO", appointment)
  console.log("ora dobbiamo salvarlo nel cassettino giusto ... ")
  //come trovo il cassettino giusto? prima, quando ho cliccato la cella, mi sono trasportato in basso
  // a sx il numero corrispondente -> era il numero che appariva nella casella che ho cliccato
  //recuperiamo intanto questo valore
  const spanWithDay = document.getElementById("newMeetingDay") // questo è lo SPAN contenente il valore del giorno
  // ora, da questo span, recupero il suo contenuto testuale con innerText

  const meetingDay = spanWithDay.innerText // es. '31'
  // questo è l'indizio più importante per capire in quale cassettino pushare l'evento
  // solo che è una stringa, e rappresenta "l'etichetta" del giorno, non la posizione giusta nell'array
  // la posizione giusta nell'array è VALORE-1
  let meetingDayAsNumber = parseInt(meetingDay) // da "31" siamo arrivati a 31
  // ora sottratto.1 per trovare l'indice corretto della cassettiera
  meetingDayAsNumber-- // sottraggo 1
  // ora meetingDayAsNumber è l'indice corretto per l'array di array
  appointments[meetingDayAsNumber].push(appointment)

  // ora andiamo a colorare la cella nel calendario in cui abbiamo gli appuntamenti
  const dot = document.createElement("span") //creo lo span per inserire il punto
  dot.classList.add("dot")
  const selectedCell = document.querySelector(".selected")
  selectedCell.appendChild(dot)

  //riempiamo la sezione degli appuntamenti con gli eventi del giorni
  riempiListaAppuntamenti()

  // andiamo a mostrare la sezione degli appuntamenti
  mostraAppuntamenti()

  form.reset()
})

const riempiListaAppuntamenti = () => {
  //la funzione riempirà la lista che verra selezionata
  const list = document.getElementById("appointmentList")
  // andiamo a riempire
  // come faccio ad andare a scegliere l'array
}

// Infine dobbiamo mostrare la lista di appuntamenti giornalieri
// di defaul ha display:none come attributo css
const mostraAppuntamenti = () => {
  const divAppuntamenti = document.getElementById("appointments")
  divAppuntamenti.style.display = "block"
}
