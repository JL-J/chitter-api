class chitterAPI {
  constructor() {
    this.url = 'https://chitter-backend-api.herokuapp.com';
    this.sessionKey;
    this.sessionUserId;
  }

  renderPeeps() {
    $.get(`${this.url}/peeps`, function(responseData) {
      $(responseData).each(function() {
        $('#listPeeps').append(`<li class="peep" id="${this.id}">${this.body} <br>${this.created_at.substr(11,5)} ${this.created_at.substr(0,10)}, ${this.user.handle}</li>`)
      })
    })
  }

  signUpUser(handle, password) {
    var userData = {"user": {"handle":handle, "password":password}};
    var sessionData = {"session": {"handle":handle, "password":password}};

    this._createUser(userData).then(
      console.log("Finished signupuser function")
    )
  }

  _createUser(userData) {
    console.log("In first AJAX request")
    var userPromise = $.ajax({
      method: 'POST',
      url: `${this.url}/users`,
      headers: 'Content-Type: application/json',
      data: userData,
      error: function(error) {
        console.log(error.responseText)
      },
      success: this._createSession
    })
    return userPromise;
  }

  _createSession() {
    console.log("In second AJAX request")
    var sessionPromise = $.ajax({
      method: 'POST',
      url: `https://chitter-backend-api.herokuapp.com/sessions`, //can't use this as refers to /user url
      headers: 'Content-Type: application/json',
      data: sessionData, 
      // data: {"session": {"handle":this.data.handle, "password":this.data.password}},
      error: function(error) {
        console.log('Failed to create session ' + error)
      },
      success: function(sessionInfo){
        console.log('In success for create session. ' + sessionInfo);
        this.sessionUserId = sessionInfo.user_id;
        this.sessionKey = sessionInfo.session_key;
      }
    })
    return sessionPromise;
  }

}
