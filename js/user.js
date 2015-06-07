var baseUserData = {
    "users":{}
  };

var sessionUserData;
var loggedUsername;
var isNewUser = false;

function loadUserData () {
  if ($.cookie("getickets-user-data") !== undefined) {
    var cookieData = JSON.parse($.cookie("getickets-user-data"));
    
    sessionUserData = cookieData;
  } else {
    sessionUserData = baseUserData;
  }
}

function saveToCookie () {
  $.cookie("getickets-user-data", JSON.stringify(sessionUserData), { expires: 1 });
}

function login () {
  loggedUsername = $('#login-user').val();
  var password = $('#login-pwd').val();
  
  if (verifyUser(loggedUsername, password)) {
    $('#modalLogin').modal('hide');
    $('#nav-username').text('Bem vindo, ' + sessionUserData.users[loggedUsername].name + '!');
    loadUserInfo();
  } else {
    shakeForm("#modalLogin");
  }
  
  return false;
}

function logout () {
  $('#nav-username').text('');
  $('#login-user').val('');
  $('#login-pwd').val('');
  $('#modalLogin').modal('show');
  loggedUsername = null;
  clearFields();
}

function verifyUser (username, password) {
  if (sessionUserData.users[username] !== undefined) {
    
    return sessionUserData.users[username].password == password ? true : false;
  }
  
  return false;
}

function verifyUsernameAvailability (username) {
  return sessionUserData.users[username] === undefined ? true : false;
}

function shakeForm(objId) {
   var l = 20;  
   for( var i = 0; i < 10; i++ )   
     $(objId).animate( { 'margin-left': "+=" + ( l = -l ) + 'px' }, 50);  
 }

function createUser () {
  loggedUsername = $('#login-user').val();
  
  if (verifyUsernameAvailability(loggedUsername)) {
    isNewUser = true;
    $('#modalLogin').modal('hide');
    $('#modalProfile').modal({
      keyboard: false,
      backdrop: 'static'
    });
    $('#modalProfile').modal('show');
    $('#user-info-username').val(loggedUsername);
    $('#closeProfileModal').hide();
  } else {
    var errorMsg = loggedUsername == "" ? "Usuário em branco" : "Usário já cadastrado";
    
    var alert = '<div id="modalAlert" class="alert alert-danger alert-dismissible" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' + errorMsg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
    
    $('#modalAlert').empty();
    $('#modalAlert').append(alert);
  }
}