$(document).ready(function() {

  const chitter = new chitterAPI();

  $('#getPeeps').click(function() {
    chitter.renderPeeps()
  })

  $('#signUpForm').submit(function(event) {
    event.preventDefault();
    let handle = $('#signUpHandle').val()
    let password = $('#signInPassword').val()
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

})
