$(document).ready(function() {

  // var chitterAPI = new chitterAPI

  $('#getPeeps').on('click', function() {
    var url = 'https://chitter-backend-api.herokuapp.com/peeps';
    $.get(url, function(data) {
      $('#listPeeps').text(data.map(peep => peep.body));
    })
  });

})
