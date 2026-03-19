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
    //appendo poi il div all'interno del calendario per ogni singolo giorno
    emptyCalendarHTML.appendChild(div)
  }
}

createCellsCalendar()
