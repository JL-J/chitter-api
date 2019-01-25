$(document).ready(function() {

  const chitter = new chitterAPI();

  $('#getPeeps').click(function() {
    chitter.renderPeeps()
  })

  $('#signUpForm').submit(function(event) {
    event.preventDefault();
    let handle = $('#handle').val()
    let password = $('#password').val()
    if (handle == "" || password == "") {
      alert("Fields can not be blank")
    } else {
      chitter.signUpUser(handle, password)
    }
  })

})
