
let f = function(a) {
  console.log(this)
  return a
}

const obj = {
  name: 'Marco',
  fee: x => { console.log(this) },
  foo: function(x) {
    console.log(this)
  }
}

const obj2 = {
  phone: '9897987987',
  ref: obj,
  fee: obj.fee.bind(obj)
}

//obj2.ref.foo('Giovanni')
obj2.fee()