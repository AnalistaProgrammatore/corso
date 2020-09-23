(function() {
  const alertTemplate = (message, state = 'success') => {
    const color = state === 'success' ? 'alert-success' : 'alert-danger'
    return (
      `<div class="alert ${color}" role="alert">${message}</div>` 
    )
  }
  let signupFormEl
  let messageContainerEl
  document.addEventListener('DOMContentLoaded', () => {
    signupFormEl = document.getElementById('signupForm')
    messageContainerEl = document.getElementById('messageContainer')
    signupFormEl.addEventListener('submit', sendForm)
  })

  async function sendForm(e) {
    e.preventDefault()
    const inputs = signupFormEl.querySelectorAll('input, checkbox, select, textarea')
    const jsonForm = {}
    for(const input of inputs) {
      if(input.name) jsonForm[input.name] = input.value
    }
    // ADD SPINNER TO BUTTON
    const response = await fetch('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonForm)
    })
    // REMOVE SPINNER FROM BUTTON
    const data = await response.json()
    if(response.status !== 200) {
      return
    }
    
    messageContainerEl.innerHTML = alertTemplate('Registrato con successo')
    setTimeout(() => window.location.href = '/signin', 3000)
  }
}())