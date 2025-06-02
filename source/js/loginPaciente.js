document
  .querySelector(".form_persona")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("http://localhost:8080/auth/paciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, senha }),
      });

      const data = await response.json();
      localStorage.setItem("token", data.token); // <-- salva token
      window.location.href = "/source/pages/pesquisarProntuario.html"; // <-- redireciona
      console.log("Resposta do backend:", data);
    } catch (error) {
      console.error("Erro ao se comunicar com o backend:", error);
    }
  });
