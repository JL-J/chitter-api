class chitterAPI {
  constructor() {
    this.url = 'https://chitter-backend-api.herokuapp.com';
  }

  renderPeeps() {
    $.get(`${this.url}/peeps`, function(responseData) {
      $(responseData).each(function() {
        $('#listPeeps').append(`<li class="peep" id="${this.id}">${this.body} <br>${this.created_at.substr(11,5)} ${this.created_at.substr(0,10)}, ${this.user.handle}</li>`)
      })
    })
  }

  signUpUser(handle, password) {
    let data = {"user": {"handle":handle, "password":password}};
    $.ajax({
      method: 'POST',
      url: `${this.url}/users`,
      headers: 'Content-Type: application/json',
      data: data
    }).done(function(data){
      console.log(data)
    }).fail(function(error) {
      // can't get this any further .handle doesn't work, comes back as undefined
      console.log(error.responseText)
    })
  }

}
