document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form_register_patient");
  const pesoInput = document.getElementById("peso");
  const alturaInput = document.getElementById("altura");
  const imcInput = document.getElementById("imc");

  // Função para transformar string separada por vírgulas em array limpo
  function strToArray(str) {
    return str
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  // Cálculo do IMC
  function calcularIMC() {
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);

    if (!isNaN(peso) && !isNaN(altura) && altura > 0) {
      const alturaMetros = altura;
      const imc = peso / (alturaMetros * alturaMetros);
      imcInput.value = imc.toFixed(2);
    } else {
      imcInput.value = "";
    }
  }

  pesoInput.addEventListener("input", calcularIMC);
  alturaInput.addEventListener("input", calcularIMC);

  // Envio do formulário
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    data.cpf = (data.cpf || "").replace(/\D/g, "");
    data.rg = (data.rg || "").replace(/\D/g, "");

    data.senha = data.cpf
    data.alergias = strToArray(formData.get("alergias") || "");
    data.doencas = strToArray(formData.get("doencas") || "");
    data.medicamentos = strToArray(formData.get("medicamentos") || "");
    data.historicoMedico = strToArray(
      formData.get("historico_cirurgias") || ""
    );

    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwMiIsInRpcG8iOiJUSVBPX1BBQ0lFTlRFIiwiaWF0IjoxNzQ4Mjc0NjY2LCJleHAiOjE3NDgzNjEwNjZ9.Gddjh79HcC_HScqbaPdzzNsdn00wDsFe2vZ9LZbesmY";

    try {
      const response = await fetch("http://127.0.0.1:8080/paciente/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Paciente cadastrado com sucesso!");
        form.reset();
        imcInput.value = "";
      } else {
        try {
          const error = await response.json();
          alert("Erro ao cadastrar: " + (error.message || "Tente novamente."));
        } catch {
          console.log("token", token);
          alert("Erro ao cadastrar. Verifique o token e as permissões.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão. Tente novamente mais tarde.");
    }
  });
});
