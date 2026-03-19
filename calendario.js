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
  const currentYear = now.getFullYear() // tora il numero intero dell'anno corrente // Es. 2026
  //   ho bisogno di creare una Date es. -> new Date(2026,3,1) yyyy-mm-dd -> 1 aprile 2026
  const firstDayNexMonth = new Date(currentYear, indexMonth + 1, 1) // le date sono scritte all'americana (mannaggia a loro)
}
