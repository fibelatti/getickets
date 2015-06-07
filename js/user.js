/*
ToDo
	-Validade Login
	-Load User Profile and Bands
	-Forgot Password Field/Button
*/

var baseUserData = {
    "users":
      {
        "fibelatti": {
            "name":"Filipe Belatti",
            "city":"São Paulo",
            "email":null,
            "bands":[],
            "bandNames":[]
        },
        "absilva": {
            "name":"Alexandre Briskieviez",
            "city":"São Paulo",
            "email":null,
            "bands":[],
            "bandNames":[]
        },
        "abalmeida": {
            "name":"Alexandre Bernardo",
            "city":"São Paulo",
            "email":null,
            "bands":[],
            "bandNames":[]
        },
        "laercioag": {
            "name":"Laércio Guimarães",
            "city":"Teresina",
            "email":null,
            "bands":[],
            "bandNames":[]
        },
        "marimb": {
            "name":"Mariana Martins",
            "city":"São Paulo",
            "email":null,
            "bands":[],
            "bandNames":[]
        },
        "leo_alima": {
            "name":"Leonardo Alves",
            "city":"São Paulo",
            "email":null,
            "bands":[],
            "bandNames":[]
        },
        "renanrbr": {
            "name":"Renan Ribeiro",
            "city":"São Paulo",
            "email":null,
            "bands":[],
            "bandNames":[]
        }
      }
  };

var sessionUserData;
var loggedUsername;

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
  loadUserData();
  loggedUsername = $('#login-user').val();
  
  if (verifyUser()) {
    $('#modalLogin').modal('hide');
    $('#nav-username').text('Bem vindo, ' + sessionUserData.users[loggedUsername].name + '!');
    loadUserInfo();
  }
  
  return false;
}

function logout () {
  $('#nav-username').text('');
  $('#login-user').val('');
  $('#modalLogin').modal('show');
  loggedUsername = null;
}

function verifyUser () {
  return sessionUserData.users[loggedUsername] === undefined ? false : true;
}