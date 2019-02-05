$(document).ready(function() {

  const chitter = new chitterAPI();

  $('#signUpForm').submit(function(event) {
    event.preventDefault();
    let handle = $('#signUpHandle').val()
    let password = $('#signUpPassword').val()
    if (handle == "" || password == "") {
      alert("Fields can not be blank")
    } else {
      chitter.signUpUser(handle, password)
    }
  })

  $('#signInForm').submit(function(event) {
    event.preventDefault();
    let handle = $('#signInHandle').val()
    let password = $('#signInPassword').val()
    if (handle == "" || password == "") {
      alert("Fields can not be blank")
    } else {
      chitter.loginUser(handle, password)
    }
  })

  $('#postPeepForm').submit(function(event) {
    event.preventDefault();
    let message = $('#peepMessage').val()
    if (message == "") {
      alert("Fields can not be blank")
    } else {
      chitter.postPeep(message)
    }
  })

})
