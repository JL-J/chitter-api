$(document).ready(function() {

  const chitter = new chitterAPI();

  $('#getPeeps').click(function() {
    chitter.renderPeeps()
  })

  $('#signUpForm').submit(function() {
    var values = $(this).serializeArray()
    chitter.signUpUser(values)
  })

})
