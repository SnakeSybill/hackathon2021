const campoSenha = document.getElementById("signup-senha");
      const campoConfirmaSenha = document.getElementById("signup-confirma-senha");
      const card = document.getElementById("card-div");
      let newUser = {};
      let passoAtual = 0;

      /* Mostra só o primeiro bloco e esconde o restante*/
      $("#inputs-step-1").show();
      $("#inputs-step-2").hide();
      $("#inputs-step-3").hide();
      $("#inputs-step-4").hide();

      /* EVENTOS */

      $("#btn-continuar").click(function () {
        if (passoAtual < 3) {
          passoAtual++;

          if (passoAtual === 3) {
            montarObjeto();
          }

          $("li")[passoAtual].classList.add("active");
          /* Passa para o próximo bloco */
          $($(".step-input-div")[passoAtual - 1]).hide();
          $($(".step-input-div")[passoAtual]).show();
        }
      });

      $("#btn-voltar").click(function () {
        if (passoAtual === 0) window.location.href = "./login.html";
        else {
          $("li")[passoAtual].classList.remove("active");
          passoAtual--;
          /* Passa para o próximo bloco */
          $($(".step-input-div")[passoAtual + 1]).hide();
          $($(".step-input-div")[passoAtual]).show();
        }
      });
      /* END EVENTOS */

      function cadastrar() {
        if (passoAtual === 3) {
          campoSenha.setAttribute("disabled", true);
          campoConfirmaSenha.setAttribute("disabled", true);
          campoSenha.setAttribute("disabled", true);

          // implementar validação do form e chamada de login

          toogleLoader();
          toogleButtons();

          // Mock do resultado da validação do form
          const formValidationSuccessMock = true;

          setTimeout(() => {
            if (formValidationSuccessMock) {
              window.location.href = "./login.html";
            } else {
              toogleLoader();
              toogleButtons();
              campoSenha.removeAttribute("disabled", false);
              campoConfirmaSenha.removeAttribute("disabled", false);
              campoSenha.removeAttribute("disabled", false);
            }
          }, 2000);
        }
      }

      function toogleLoader() {
        if ($("#loader").is(":visible")) $("#loader").hide();
        else $("#loader").show();
      }

      function toogleButtons() {
        if ($("#btn-continuar").is(":visible")) {
          $("#btn-continuar").hide();
          $("#btn-voltar").hide();
        } else {
          $("#btn-continuar").show();
          $("#btn-voltar").show();
        }
      }

      function toogleSelectedDiv(el) {
        if (hasClass(el, "div-unselected")) {
          removeClass(el, "div-unselected");
          addClass(el, "div-selected");
        } else if (hasClass(el, "div-selected")) {
          addClass(el, "div-unselected");
          removeClass(el, "div-selected");
        }
      }

      function hasClass(el, className) {
        if (el.classList) return el.classList.contains(className);
        return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
      }

      function addClass(el, className) {
        if (el.classList) el.classList.add(className);
        else if (!hasClass(el, className)) el.className += " " + className;
      }

      function removeClass(el, className) {
        if (el.classList) el.classList.remove(className);
        else if (hasClass(el, className)) {
          var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
          el.className = el.className.replace(reg, " ");
        }
      }

      function montarObjeto() {
        let name = $("#signup-name").val();
        let birth = $("#signup-birth").val();
        let cpf = $("#signup-cpf").val();
        let phones = $(".phone-input")
          .map(function () {
            if (this.value != "") return this.value;
          })
          .get();
        let mail = $("#signup-email").val();
        let address = {
          street: $("#signup-street").val(),
          city: $("#signup-city").val(),
          state: $("#signup-state").val(),
          number: $("#signup-number").val(),
        };
        let interests = $(".div-selected")
          .map(function () {
            return this.innerHTML;
          })
          .get();
        let education_level = $("#signup-escolaridade option:selected").val();
        let resume = $("#signup-resume").val();
        let objective = $("#signup-objective").val();
        let languages = $("#signup-language").val();
        let complementary_activities = $("#signup-extra").val();

        newUser = {
          name,
          birth,
          cpf,
          phones,
          mail,
          address,
          interests,
          education_level,
          resume,
          objective,
          languages,
          complementary_activities,
        };
        console.log(newUser);

        $("#confirmation-text").html(`
        <h3>Confirmação</h3>
        <p><b>Nome:</b> ${name}</p>
        <p><b>Nascimento:</b> ${birth}</p>
        <p><b>CPF:</b> ${cpf}</p>
        <br />
        <p><b>E-mail:</b> ${mail}</p>
        <p><b>Celular:</b> ${phones[0]}</p>
        <p><b>Telefone Fixo:</b> ${phones[1] ? phones[1] : 'Nenhum'}</p>
        <p><b>Endereço:</b> ${address.street}, ${address.number} - ${address.city} - ${address.state}</p>
        <br />
        <p><b>Interesses:</b> ${interests.reduce((x, acc) => {return acc + " " + x})}</p>
        <br />

        <p><b>Escolaridade:</b> ${education_level}</p>
        <p><b>Idiomas:</b> ${languages}</p>
        <p><b>Extras:</b> ${complementary_activities}</p>
        <br />
        <p><b>Objetivo:</b> ${objective}</p>
        <br />
        <p><b>Resumo:</b> ${resume}</p>
        <br /><br />
        `)
      }