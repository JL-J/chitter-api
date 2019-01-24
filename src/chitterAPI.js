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

  signUpUser(values) {
    var password = values.filter((hash) => hash.name === "password").map((hash) => hash.value).toString();
    var handle = values.filter((hash) => hash.name === "handle").map((hash) => hash.value).toString();
    $.post(`${this.url}/users`, {"handle":, "password":})
  }

}
