class chitterAPI {
  constructor() {
    this.url = 'https://chitter-backend-api.herokuapp.com';
  }

  signUpUser(handle, password) {
    var self = this;
    var userData = {"handle":handle, "password":password};
    this._createUser(userData).done(function() {
      self._createSession(userData).done(function() {
        self._renderPeeps();
      });
    });
  }

  loginUser(handle, password) {
    var self = this;
    var userData = {"handle":handle, "password":password};
    this._createSession(userData).done(function() {
      self._renderPeeps();
    });
  }

  _renderPeeps() {
    $.get(`${this.url}/peeps`, function(responseData) {
      $(responseData).each(function() {
        $('#listPeeps').append(`<li class="peep" id="${this.id}">${this.body} <br>${this.created_at.substr(11,5)} ${this.created_at.substr(0,10)}, ${this.user.handle}</li>`)
      })
    })
  }

  postPeep(message) {
    var sessionKey = this._getCookie("sessionKey");
    var userId = Number(this._getCookie("userId"));
    var messageData = {"user_id":userId, "body":message};
    $.ajax({
       method: 'POST',
       url: `${this.url}/peeps`,
       headers: {
         'Authorization': 'Token token='+sessionKey,
         'Content-Type': 'application/json'
       },
       data: {"peep": messageData},
       error: function(error) {
         console.log(error)
       }
     })
   }

  _getCookie(key) {
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
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
        console.log(sessionInfo);
        document.cookie = `sessionKey=${sessionInfo.session_key}`
        document.cookie = `userId=${sessionInfo.user_id}`
      }
    })
    return sessionPromise;
  }

}
