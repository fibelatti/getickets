function loadUserInfo () {
  $('#user-info-name').val(sessionUserData.users[loggedUsername].name);
  $('#user-info-city').val(sessionUserData.users[loggedUsername].city);
  $('#user-info-username').val(loggedUsername);
}

function setUpCities () {
  var data;
  
  $.getJSON("../includes/estados-cidades.json", function(json) {
    console.log(json); // this will show the info it in firebug console
    data = json;
  });

  /*
  $("#user-info-city").select2({
    data: data
  });
  */
}