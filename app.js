const state = {
  xp: 0,
  level: 1,
  evidence: [],
  completed: new Set(),
  currentView: "briefing"
};

const evidenceCatalog = {
  timeline: { icon: "◷", title: "Linha do tempo", description: "O acesso ao OMEGA_CORE ocorreu às 23:47:12, durante uma sessão de manutenção." },
  session: { icon: "⌘", title: "Sessão R-774", description: "A sessão estava ativa durante o incidente, mas isso não comprova quem a controlava." },
  backup: { icon: "▤", title: "Cópia de segurança", description: "Maya preservou dados sobre alterações não documentadas no módulo de previsão." }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function showScreen(id) {
  $$(".screen").forEach(screen => screen.classList.remove("active"));
  $(id).classList.add("active");
}

function showView(view) {
  state.currentView = view;
  $$(".game-view").forEach(el => el.classList.remove("active-view"));
  $(`#view-${view}`).classList.add("active-view");
  $$(".nav-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.view === view));
  updateCaseSummary();
}

function startGame() {
  showScreen("#screen-game");
  showView("briefing");
  toast("Investigação iniciada. Boa sorte, detetive.");
}

function addXP(amount, reason = "") {
  state.xp += amount;
  while (state.xp >= 500) {
    state.xp -= 500;
    state.level++;
    toast(`Nível ${String(state.level).padStart(2, "0")} desbloqueado!`);
  }
  updateStats();
  if (reason) toast(`+${amount} XP — ${reason}`);
}

function updateStats() {
  $("#xp-text").textContent = `${state.xp} / 500`;
  $("#xp-bar").style.width = `${(state.xp / 500) * 100}%`;
  $("#level-text").textContent = String(state.level).padStart(2, "0");
  $("#summary-xp").textContent = state.xp;
  $("#summary-level").textContent = state.level;
  $("#evidence-count").textContent = state.evidence.length;
  $("#evidence-total").textContent = `${state.evidence.length} COLETADAS`;
  $("#summary-evidence").textContent = state.evidence.length;
}

function collectEvidence(key) {
  if (state.evidence.includes(key)) return;
  state.evidence.push(key);
  renderEvidence();
  updateStats();
}

function renderEvidence() {
  const list = $("#evidence-list");
  if (!state.evidence.length) {
    list.innerHTML = `<div class="empty-state">Nenhuma evidência coletada ainda.<br />Consulte o terminal para começar.</div>`;
    return;
  }
  list.innerHTML = state.evidence.map(key => {
    const item = evidenceCatalog[key];
    return `<article class="evidence-card panel"><div class="evidence-icon">${item.icon}</div><h3>${item.title}</h3><p>${item.description}</p><span class="tag">CONFIRMADA</span></article>`;
  }).join("");
}

function terminalPrint(text, type = "") {
  const output = $("#terminal-output");
  const p = document.createElement("p");
  p.className = type;
  p.textContent = text;
  output.appendChild(p);
  output.scrollTop = output.scrollHeight;
}

function runCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();
  if (!command) return;
  terminalPrint(`guest@nexus:~$ ${rawCommand}`, "muted");

  const commands = {
    help: () => {
      terminalPrint("Comandos disponíveis:", "success");
      terminalPrint("logs       — consultar a linha do tempo");
      terminalPrint("suspects   — listar pessoas de interesse");
      terminalPrint("evidence   — consultar evidências coletadas");
      terminalPrint("status     — consultar seu progresso");
      terminalPrint("clear      — limpar o terminal");
    },
    logs: () => {
      terminalPrint("23:30:55 — ALEX: sessão de desenvolvimento iniciada.");
      terminalPrint("23:42:08 — MAYA: consulta de dados iniciada.");
      terminalPrint("23:46:51 — RAVI: manutenção de rede iniciada.");
      terminalPrint("23:47:12 — OMEGA: arquivo OMEGA_CORE acessado.", "warning");
      terminalPrint("23:48:03 — OMEGA: integridade do arquivo comprometida.", "danger");
      terminalPrint("23:50:17 — HELENA: alerta recebido.");
      if (!state.completed.has("logs")) {
        state.completed.add("logs");
        collectEvidence("timeline");
        addXP(75, "Linha do tempo analisada");
      }
    },
    suspects: () => {
      terminalPrint("PESSOAS DE INTERESSE: ALEX / MAYA / RAVI / HELENA", "success");
      terminalPrint("Use o painel 'Suspeitos' para consultar os perfis.");
    },
    evidence: () => {
      if (!state.evidence.length) terminalPrint("Nenhuma evidência registrada.", "warning");
      else state.evidence.forEach(key => terminalPrint(`${evidenceCatalog[key].title}: ${evidenceCatalog[key].description}`));
    },
    status: () => {
      terminalPrint(`Nível: ${state.level} | XP: ${state.xp}/500 | Evidências: ${state.evidence.length}`, "success");
    },
    clear: () => { $("#terminal-output").innerHTML = ""; }
  };

  if (commands[command]) commands[command]();
  else terminalPrint(`Comando não reconhecido: ${command}. Digite "help".`, "danger");
  updateStats();
}

function updateCaseSummary() {
  const next = state.evidence.length === 0
    ? "Acesse o terminal e consulte os registros."
    : state.evidence.length === 1
      ? "Resolva o enigma da chave do terminal."
      : "Continue analisando as evidências e os depoimentos.";
  $("#case-next").textContent = next;
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2800);
}

$("#btn-start").addEventListener("click", startGame);
$("#btn-how").addEventListener("click", () => showScreen("#screen-how"));
$("#btn-back-menu").addEventListener("click", () => showScreen("#screen-menu"));
$("#btn-go-terminal").addEventListener("click", () => showView("terminal"));
$("#btn-case-action").addEventListener("click", () => showView("terminal"));

$$(".nav-btn").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view)));
$$(".chip").forEach(btn => btn.addEventListener("click", () => {
  if (btn.dataset.command === "clear") $("#terminal-output").innerHTML = "";
  else runCommand(btn.dataset.command);
}));

$("#terminal-form").addEventListener("submit", (event) => {
  event.preventDefault();
  runCommand($("#terminal-input").value);
  $("#terminal-input").value = "";
});

$("#riddle-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = $("#riddle-input").value.trim().toUpperCase();
  const feedback = $("#riddle-feedback");
  if (answer === "CASE") {
    if (!state.completed.has("riddle")) {
      state.completed.add("riddle");
      collectEvidence("session");
      addXP(50, "Enigma resolvido");
      feedback.textContent = "✓ Correto! A palavra é CASE. O acesso ao terminal foi liberado.";
      feedback.className = "feedback success";
    } else {
      feedback.textContent = "Esse enigma já foi concluído.";
      feedback.className = "feedback muted";
    }
  } else {
    feedback.textContent = "✕ Chave incorreta. Converta os números usando A=1, B=2... Z=26.";
    feedback.className = "feedback danger";
  }
});

$("#btn-reset").addEventListener("click", () => {
  if (!confirm("Deseja reiniciar todo o progresso do caso?")) return;
  state.xp = 0;
  state.level = 1;
  state.evidence = [];
  state.completed.clear();
  $("#terminal-output").innerHTML = `<p class="success">NEXUS SHELL v2.087</p><p>Digite <b>help</b> para consultar os comandos disponíveis.</p>`;
  $("#riddle-input").value = "";
  $("#riddle-feedback").textContent = "";
  renderEvidence();
  updateStats();
  showView("briefing");
  toast("Progresso reiniciado.");
});

renderEvidence();
updateStats();
