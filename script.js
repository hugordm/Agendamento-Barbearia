const horariosDisponiveis = [
  "09:30", "10:00", "10:30", "11:30",
  "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00"
];

const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || {};

const diaSelect = document.getElementById("dia");
const horariosContainer = document.getElementById("horarios");

function salvarAgendamentos() {
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
}

function criarBotoesHorarios(dia) {
  horariosContainer.innerHTML = ""; // limpa os botões anteriores

  horariosDisponiveis.forEach((horario) => {
    const botao = document.createElement("button");
    const nomeAgendado = agendamentos[dia]?.[horario];

    if (nomeAgendado) {
      botao.textContent = `${horario} - ${nomeAgendado} (Remover)`;
      botao.classList.add("agendado");
      botao.addEventListener("click", () => {
        if (confirm(`Remover agendamento de ${nomeAgendado} às ${horario}?`)) {
          delete agendamentos[dia][horario];
          if (Object.keys(agendamentos[dia]).length === 0) {
            delete agendamentos[dia];
          }
          salvarAgendamentos();
          criarBotoesHorarios(dia);
        }
      });
    } else {
      botao.textContent = horario;
      botao.addEventListener("click", () => {
        const nome = prompt(`Digite o nome do cliente para ${horario}:`);
        if (nome) {
          if (!agendamentos[dia]) {
            agendamentos[dia] = {};
          }
          agendamentos[dia][horario] = nome;
          salvarAgendamentos();
          criarBotoesHorarios(dia);
        }
      });
    }

    horariosContainer.appendChild(botao);
  });
}

diaSelect.addEventListener("change", () => {
  const diaSelecionado = diaSelect.value;
  criarBotoesHorarios(diaSelecionado);
});

criarBotoesHorarios(diaSelect.value);
