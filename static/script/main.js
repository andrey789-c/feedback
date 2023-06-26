const form = document.querySelector('#form')
const nameInput = document.querySelector('#name')
const phone = document.querySelector('#phone')
const email = document.querySelector('#email')
const message = document.querySelector('#message')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if(nameInput.value.length == 0) {
    nameInput.classList.add('empty')
    return false
  }
  if(phone.value.length < 8) {
    phone.classList.add('empty')
    return false
  }
  if(!email.value.match(emailReg)) {
    email.classList.add('empty')
    return false
  }

  const newFeedback = {
    name: nameInput.value, 
    email: email.value, 
    phone: phone.value, 
    message: message.value
  }

  try {
    const data = await fetch('/feedback', {
      body: JSON.stringify(newFeedback),
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    })
    
    alert('Данные успешно отправились!')

    nameInput.value = ''
    phone.value = '+7'
    email.value = ''
    message.value = ''
  } catch (error) {
    console.log(e)
  }
  // formData.append('field1', document.getElementById('input1').value); // Замените 'input1' на ID вашего первого input
  // formData.append('field2', document.getElementById('input2').value);
})

nameInput.addEventListener('input', () => nameInput.classList.remove('empty'))
phone.addEventListener('input', formatPhoneNumber);
email.addEventListener('input', () => email.classList.remove('empty'))

function formatPhoneNumber() {
  phone.classList.remove('empty')
  let phoneNumber = phone.value.replace(/\D/g, '');
  if (phoneNumber.startsWith('8')) {
    phoneNumber = '+7' + phoneNumber.slice(1);
  }

  let formattedNumber = '';

  if (phoneNumber.length >= 1) {
    formattedNumber = '+7 (' + phoneNumber.substring(1, 4);
  }
  if (phoneNumber.length >= 4) {
    formattedNumber += ') ' + phoneNumber.substring(4, 7);
  }
  if (phoneNumber.length >= 7) {
    formattedNumber += '-' + phoneNumber.substring(7, 9);
  }
  if (phoneNumber.length >= 9) {
    formattedNumber += '-' + phoneNumber.substring(9, 11);
  }

  

  phone.value = formattedNumber;
}

phone.addEventListener('keydown', function (event) {
  if (event.key === 'Backspace') {
      phone.value = phone.value.slice(0, phone.selectionStart - 1) + phone.value.slice(phone.selectionStart);
      event.preventDefault();
  }
});
