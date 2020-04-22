class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

const arr = new PowerArray(1, 2, 3, 4, 5)

console.log(arr, arr.isEmpty())

const filteredArray = arr.filter(item => item < 0)
console.log(filteredArray, filteredArray.isEmpty())

class PowerString extends String {
  isEmpty() {
    return this.length === 0
  }
}

const str = new PowerString('ciao');
console.log(str, str.isEmpty())

const empty = new PowerString('')
console.log(empty, empty.isEmpty())