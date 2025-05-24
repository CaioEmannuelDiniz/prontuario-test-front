// URLs da API (ajuste conforme necessário)
const API_URL_MEDICO = "http://localhost:8080/auth/medico";
const API_URL_PACIENTE = "http://localhost:8080/auth/paciente";

// Botões
const buttonLoginMedico = document.querySelector(
  ".container_medic .button_login"
);
const buttonLoginPaciente = document.querySelector(
  ".container_pacient .button_login"
);

buttonLoginMedico.addEventListener("click", async () => {
  const crm = document.querySelector(
    ".container_medic input[placeholder='CRM']"
  ).value;
  const senha = document.querySelector(
    ".container_medic input#senha_medic"
  ).value; // Corrigido para id único

  try {
    const response = await fetch(API_URL_MEDICO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crm, senha }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Login de médico bem-sucedido!");
      localStorage.setItem("token", result.token);
      // Redirecionar ou carregar nova página
    } else {
      alert("Erro no login do médico: " + result.message);
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    alert("Erro de comunicação com o servidor.");
  }
});

// Função para o login do paciente
buttonLoginPaciente.addEventListener("click", async () => {
  const cpf = document.querySelector(
    ".container_pacient input[placeholder='CPF']"
  ).value;
  const senha = document.querySelector(
    ".container_pacient input#senha_paciente"
  ).value;

  try {
    const response = await fetch(API_URL_PACIENTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, senha }),
    });

    if (response.ok) {
      const token = await response.text(); // <-- DEFINIDO AQUI
      alert("Login de paciente bem-sucedido!");
      localStorage.setItem("token", token);

      window.location.href = "http://localhost:8080/paciente/pacientes"; // redireciona
    } else {
      const errorMessage = await response.text();
      alert("Erro no login do paciente: " + errorMessage);
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    alert("Erro de comunicação com o servidor.");
  }
});

console.log("Login script carregado e funcionando");
