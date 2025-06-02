document.addEventListener("DOMContentLoaded", async () => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDUk0xMTExMTEiLCJ0aXBvIjoiVElQT19NRURJQ08iLCJpYXQiOjE3NDg2MjcyMzIsImV4cCI6MTc0ODcxMzYzMn0.0eKMqJp9Kca95j0JEYFMB2KSmFFpUdT8H5U4EDgSglM'; // Substitua pelo seu token, se necessário

  try {
    const response = await fetch('http://localhost:8080/paciente/pacientes', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Remova essa linha se não usar autenticação
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao carregar pacientes');
    }

    const pacientes = await response.json();
    const select = document.getElementById("paciente_existente");

    pacientes.forEach(paciente => {
      const option = document.createElement("option");
      option.value = paciente.id;
      option.innerHTML= paciente.nomeCompleto;
      select.appendChild(option);
    });

  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    alert("Erro ao carregar lista de pacientes.");
  }
});
