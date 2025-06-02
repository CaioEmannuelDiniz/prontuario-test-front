document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('prontuarios-container');

  // Função para criar um card de prontuário
  function criarCard(prontuario) {
    const card = document.createElement('div');
    card.classList.add('prontuario-card');

    card.innerHTML = `
      <h3>${prontuario.pacienteNome}</h3>
      <p><strong>Data:</strong> ${new Date(prontuario.data).toLocaleDateString()}</p>
      <p><strong>Diagnóstico:</strong> ${prontuario.diagnostico}</p>
      <p><strong>Prescrição:</strong> ${prontuario.prescricao}</p>
      <div class="card-footer">
        <span>Status: ${prontuario.status}</span>
      </div>
    `;

    container.appendChild(card);
  }

  // Função para buscar os prontuários do servidor
  async function buscarProntuarios() {
    try {
      const response = await fetch('http://localhost:8080/api/prontuarios');
      if (!response.ok) {
        throw new Error('Erro ao buscar prontuários');
      }
      const prontuarios = await response.json();
      prontuarios.forEach(prontuario => {
        criarCard(prontuario);
      });
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  // Chama a função para buscar os prontuários ao carregar a página
  buscarProntuarios();
});
