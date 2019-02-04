class chitterAPI {
  constructor() {
    this.url = 'https://chitter-backend-api.herokuapp.com';
  }

  _renderPeeps() {
    $.get(`${this.url}/peeps`, function(responseData) {
      $(responseData).each(function() {
        $('#listPeeps').append(`<li class="peep" id="${this.id}">${this.body} <br>${this.created_at.substr(11,5)} ${this.created_at.substr(0,10)}, ${this.user.handle}</li>`)
      })
    })
  }

  signUpUser(handle, password) {
    var self = this;
    var userData = {"handle":handle, "password":password};
    this._createUser(userData).done(function() {
      self._createSession(userData);
    });
  }

  loginUser(handle, password) {
    var self = this;
    var userData = {"handle":handle, "password":password};
    this._createSession(userData).done(function() {
      self._renderPeeps();
    });
  }

  _createUser(userData) {
   var userPromise =  $.ajax({
      method: 'POST',
      url: `${this.url}/users`,
      headers: 'Content-Type: application/json',
      data: {"user": userData},
      error: function(error) {
        console.log(error.responseText)
      },
    })
    return userPromise;
  }

  _createSession(userData) {
    var sessionPromise = $.ajax({
      method: 'POST',
      url: `https://chitter-backend-api.herokuapp.com/sessions`,
      headers: 'Content-Type: application/json',
      data: {"session": userData},
      error: function(error) {
        console.log(error)
      },
      success: function(sessionInfo){
        document.cookie = `sessionKey=${sessionInfo.session_key}`
        document.cookie = `userId=${sessionInfo.user_id}`
      }
    })
    return sessionPromise;
  }

}
