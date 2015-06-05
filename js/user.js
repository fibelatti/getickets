/*
ToDo
	-Validade Login
	-Load User Profile and Bands
	-Forgot Password Field/Button
*/

var userData;
var loggedUsername;

function loadUserData () {
  if ($.cookie("user-data") !== undefined) {
    var cookieData = JSON.parse($.cookie("user-data"));

    userData = cookieData;
  } else {
    userData = {
        "name":"Filipe Belatti",
        "age":"",
        "city":"São Paulo",
        "email":"fibelatti@gmail.com",
        "username":"fibelatti",
        "genderTags":"rock,metal",
        "bands":["53RsXctnNmj9oKXvcbvzI2","3ZztVuWxHzNpl0THurTFCv","74XFHRwlV6OrjEM0A2NCMF"],
        "bandNames":["Alexisonfire","Architects","Paramore"]
    };
  }
  
  console.log(userData);
}

function saveToCookie () {
  $.cookie("user-data", JSON.stringify(userData), { expires: 365 });
}

function getFromCookie () {
  userData = JSON.parse($.cookie("user-data"));
  console.log(userData);
}

function login () {
  $('#nav-username').text('Bem vindo, ' + $('#login-user').val() + '!');
  loggedUsername = $('#login-user').val();
}