function loadUserInfo () {
  $('#user-info-username').val(loggedUsername);
  $('#user-info-password').val(sessionUserData.users[loggedUsername].password);
  $('#user-info-name').val(sessionUserData.users[loggedUsername].name);
  $('#user-info-state').val(sessionUserData.users[loggedUsername].state);
  
  setUpCities();
  
  $('#user-info-city').val(sessionUserData.users[loggedUsername].city);
  $('#user-info-email').val(sessionUserData.users[loggedUsername].email);
}

function saveUserProfile () {
if (sessionUserData.users[loggedUsername] === undefined) sessionUserData.users[loggedUsername] = {};
  
  sessionUserData.users[loggedUsername].password = $('#user-info-password').val();
  sessionUserData.users[loggedUsername].name = $('#user-info-name').val();
  sessionUserData.users[loggedUsername].state = $('#user-info-state').val();
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

function setUpCities () {
  var statesElement = $('#user-info-state');
  var citiesElement = $('#user-info-city');

  citiesElement.empty();
  
  var result = $.grep(jsonEstados.estados, function(e) { return e.sigla == statesElement.val(); });
  
  for (var i = 0; i < result[0].cidades.length; i++) {
    citiesElement.append('<option value="' + result[0].cidades[i] + '">' + result[0].cidades[i] + '</option>');
  }
}

function setUpStates () {
  var statesElement = $('#user-info-state');
  
  for (var i = 0; i < jsonEstados.estados.length; i++) {
    statesElement.append('<option value="' + jsonEstados.estados[i].sigla + '">' + jsonEstados.estados[i].nome + '</option>');
  }
}

function clearFields () {
  $('#user-info-password').val('');
  $('#user-info-name').val('');
  $('#user-info-state').val('');
  $('#user-info-city').val('');
  $('#user-info-email').val('');
}