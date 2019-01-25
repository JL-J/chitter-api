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

  _createUser(userData) {
    $.ajax({
      method: 'POST',
      url: `${this.url}/users`,
      headers: 'Content-Type: application/json',
      data: userData
    })
  }

  _createSession(sessionData) {
    $.ajax({
      method: 'POST',
      url: `https://chitter-backend-api.herokuapp.com/sessions`, //can't use this as refers to /user url
      headers: 'Content-Type: application/json',
      data: sessionData
    }).done(function(sessionInfo) {
       var sessionUserId = sessionInfo.user_id
       var sessionKey = sessionInfo.session_key
    })
  }

  signUpUser(handle, password) {
    let userData = {"user": {"handle":handle, "password":password}};
    let sessionData = {"session": {"handle":handle, "password":password}};
    //this methods need to be attached to an instance of class. don't want a class any more
    _createUser(userData).then(function() {
      _createSession(sessionData)
    }).done(function(data){
      console.log(data)
    }).fail(function(error) {
      // can't get this any further .handle doesn't work, comes back as undefined
      console.log(error.responseText)
    })
  }

}
