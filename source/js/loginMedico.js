document
  .querySelector(".form_persona")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const crm = document.getElementById("crm").value;
    const senha = document.getElementById("senha_medic").value;

    try {
      const response = await fetch("http://localhost:8080/auth/medico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ crm, senha }),
      });

      const data = await response.json();
      console.log("resposta " + data);
      localStorage.setItem("token",data.token);
      window.location.href = "/source/pages/cadastroPaciente.html"; 
    } catch (error) {
      console.log("resposta " + error);
    }
  });
