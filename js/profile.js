function loadUserInfo () {
  $('#user-info-username').val(loggedUsername);
  $('#user-info-password').val(sessionUserData.users[loggedUsername].password);
  $('#user-info-name').val(sessionUserData.users[loggedUsername].name);
  $('#user-info-city').val(sessionUserData.users[loggedUsername].city);
  $('#user-info-email').val(sessionUserData.users[loggedUsername].email);
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

function saveUserProfile () {
  if (sessionUserData.users[loggedUsername] === undefined) sessionUserData.users[loggedUsername] = {};
  
  sessionUserData.users[loggedUsername].password = $('#user-info-password').val();
  sessionUserData.users[loggedUsername].name = $('#user-info-name').val();
  sessionUserData.users[loggedUsername].city = $('#user-info-city').val();
  sessionUserData.users[loggedUsername].email = $('#user-info-email').val();

  if (isNewUser == true) {
    sessionUserData.users[loggedUsername].bands = [];
    sessionUserData.users[loggedUsername].bandNames = [];
    
    $('#closeProfileModal').show();
    
    $('#nav-username').text('Bem vindo, ' + sessionUserData.users[loggedUsername].name + '!');
    loadUserInfo();
  }
  
  saveToCookie();

  $('#modalProfile').modal('hide');

  return false;
}

function clearFields () {
  $('#user-info-password').val('');
  $('#user-info-name').val('');
  $('#user-info-city').val('');
  $('#user-info-email').val('');
}