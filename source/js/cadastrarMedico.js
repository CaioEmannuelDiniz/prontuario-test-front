document
  .getElementById("form-medico")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const medico = Object.fromEntries(formData.entries());

     medico.rg = (medico.rg || "").replace(/\D/g, "");

    // Transforma especialidades de string para array
    medico.especialidades = medico.especialidades
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    try {
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDUk0xMjM0NSIsInRpcG8iOiJUSVBPX01FRElDTyIsImlhdCI6MTc0ODU2NzAwMSwiZXhwIjoxNzQ4NjUzNDAxfQ.suWmAuRLMe54us1gB0FYN-mYoO__SRWqRwtv5VL1r3M";
      const response = await fetch("http://localhost:8080/medico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // se necessário
        },
        body: JSON.stringify(medico),
      });

      if (response.ok) {
        alert("Médico cadastrado com sucesso!");
        form.reset();
      } else {
        const err = await response.text();
        alert("Erro ao cadastrar médico: " + err);
      }
    } catch (error) {
      console.error("Erro de requisição:", error);
      alert("Erro ao enviar dados.");
    }
  });
