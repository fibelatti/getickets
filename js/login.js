/*
ToDo
	-Validade Login
	-Load User Profile and Bands
	-Forgot Password Field/Button
*/

$('#modal-ok').on('click', function () {
  $('#nav-username').text('Bem vindo, ' + $('#login-user').val() + '!');
});