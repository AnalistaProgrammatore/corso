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

/** FUNZIONE FILTRO PER DATA -> O(n) -> tempo di computazione lineare */
const filterByDate = (data, date) => data.find(element => element.data === date)

/** RECUPERO I DATI DEGLI ULTIMI TRE GIORNI */
const days = [24, 23, 22].map(day => {
  return `2020-03-${day}`
})

const lastThreeDaysData = days.map(day => filterByDate(data, day))

console.log(
  lastThreeDaysData
)