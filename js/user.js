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
            "age":"23",
            "city":"São Paulo",
            "email":"fibelatti@gmail.com",
            "genderTags": null,
            "bands":[],
            "bandNames":[]
        },
        "absilva": {
            "name":"Alexandre Briskieviez",
            "age":"21",
            "city":"São Paulo",
            "email":"alexandre_rnr@outlook.com",
            "genderTags": null,
            "bands":[],
            "bandNames":[]
        },
        "abalmeida": {
            "name":"Alexandre Bernardo",
            "age":"22",
            "city":"São Paulo",
            "email":"abalmeida7@gmail.com",
            "genderTags": null,
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
  $.cookie("getickets-user-data", JSON.stringify(sessionUserData), { expires: 365 });
}

function login () {
  $('#nav-username').text('Bem vindo, ' + $('#login-user').val() + '!');
  loggedUsername = $('#login-user').val();
}