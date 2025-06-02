document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("pacientes-container");

  function getImagemPorSexo(sexo) {
    if (sexo.toLowerCase() === "feminino") {
      return "https://img.icons8.com/?size=100&id=61038&format=png&color=000000";
    } else {
      return "https://img.icons8.com/?size=100&id=60655&format=png&color=000000";
    }
  }

  function criarCardPaciente(paciente) {
    const card = document.createElement("div");
    card.classList.add("container_main_card");

    const dataFormatada = new Date(paciente.dataNascimento).toLocaleDateString(
      "pt-BR"
    );

    card.innerHTML = `
      <div class="container_main_card_img">
        <img height="80" width="80" src="${getImagemPorSexo(
          paciente.genero
        )}" alt="Ícone de paciente">
      </div>
      <a href="">
        <div class="container_main_card_infos">
            <div class="container_main_card_info">
            <div class="container_main_card_nome">${paciente.nomeCompleto}</div>
            <div class="container_main_card_data_nascimento">${dataFormatada}</div>
        </div>
        <div class="container_main_card_sexo">${paciente.genero}</div>
      </div>
      </a>
    `;

    container.appendChild(card);
  }

  async function carregarPacientes() {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDUk0xMjM0NSIsInRpcG8iOiJUSVBPX01FRElDTyIsImlhdCI6MTc0ODU2NzAwMSwiZXhwIjoxNzQ4NjUzNDAxfQ.suWmAuRLMe54us1gB0FYN-mYoO__SRWqRwtv5VL1r3M";
      const response = await fetch("http://localhost:8080/paciente/pacientes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // se necessário
        },
      }); // Altere para o seu endpoint real
      if (!response.ok) {
        throw new Error("Erro ao buscar pacientes");
      }
      const pacientes = await response.json();
      pacientes.forEach((paciente) => criarCardPaciente(paciente));
    } catch (erro) {
      console.error("Erro ao carregar pacientes:", erro);
    }
  }

  carregarPacientes();
});
