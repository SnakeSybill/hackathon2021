const btnLogin = document.getElementById("btn-login");
const btnCadastrar = document.getElementById("btn-signup");
const campoEmail = document.getElementById("login-email");
const campoSenha = document.getElementById("login-senha");
const loader = document.getElementById("loader");
const card = document.getElementById("card-div");

/* EVENTOS */
btnLogin.addEventListener("click", (event) => {
  event.preventDefault();

  campoEmail.setAttribute("disabled", true);
  campoSenha.setAttribute("disabled", true);
});

btnCadastrar.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "./signup.html";
});

/* END EVENTOS */

function entrar() {
  // implementar validação do form e chamada de login

  toogleLoader();
  toogleButtons();

  // Mock do resultado do login
  const loginSuccessMock = true;

  setTimeout(() => {
    if (loginSuccessMock) {
      window.location.href = "./../oportunidades.html";
    } else {
      toogleLoader();
      toogleButtons();
      campoEmail.removeAttribute("disabled", false);
      campoSenha.removeAttribute("disabled", false);
    }
  }, 2000);
}

function toogleLoader() {
  if ($("#loader").is(":visible")) $("#loader").hide();
  else $("#loader").show();
}

function toogleButtons() {
  if ($("#btn-login").is(":visible")) {
    $("#btn-login").hide();
    $("#btn-signup").hide();
  } else {
    $("#btn-login").show();
    $("#btn-signup").show();
  }
}
