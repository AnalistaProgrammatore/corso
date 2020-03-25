/* LEGGO IL CONTENUTO DEL FILE DATA.JSON */
const fs = require('fs')
const path = require('path')
let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './data.json')).toString())
/* TRASFORMO LA STRUTTURA ORIGINALE MODIFICANDO IL CAMPO DATA TOGLIENDO L'ORA */
data = data.map(element => {
  return {
    ...element,
    data: element.data.substring(0, 10)
  }
})


/** RIDUCO L'ARRAY DATA AD UN OGGETTO DIZIONARIO CON CHIAVE DATA -> METODO PROLISSO */
let dataDictionary = data.reduce((acc, cur) => {
  const { stato, ...rest } = cur
  acc[rest.data] = rest
  return acc
}, {})

/** RIDUCO L'ARRAY DATA AD UN OGGETTO DIZIONARIO CON CHIAVE DATA -> METODO SINTETICO + FUNZIONALE */
dataDictionary = data.reduce((acc, {stato, ...rest }) => ({
  ...acc,
  [rest.data]: rest
}), {})


/** FUNZIONE FILTRO PER DATA -> O(1) -> tempo di computazione costante -> HASH TABLE */
const fastFilterByDate = (data, date) => data[date]

/** RECUPERO I DATI DEGLI ULTIMI TRE GIORNI */
const days = [24, 23, 22].map(day => {
  return `2020-03-${day}`
})

const lastThreeDaysData = days.map(day => fastFilterByDate(dataDictionary, day))

console.log(
  lastThreeDaysData
)
