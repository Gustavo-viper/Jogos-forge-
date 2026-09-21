const cases = [
{id:1,code:"CASE-001",title:"O Arquivo Fantasma",brief:"Um arquivo apagado reaparece em servidores diferentes. Descubra quem o restaurou e por quê.",difficulty:"Iniciante",suspects:[["Lia Moura","Analista de dados"],["Ravi Costa","Administrador de rede"],["Nina Vale","Jornalista independente"]],objectives:["Examinar o computador da vítima","Encontrar a origem do arquivo","Identificar o responsável pela restauração"],clues:[["Metadados","O arquivo foi restaurado às 03:17 a partir de uma estação interna."],["Log de acesso","A conta de Ravi acessou o diretório, mas não abriu o arquivo."],["Mensagem cifrada","'A verdade não foi apagada; apenas escondida.'"]],device:"O computador contém uma pasta oculta chamada /recovery/0317. Dentro dela há um log de restauração e uma mensagem cifrada.",interviews:[["Lia Moura","Eu estava revisando relatórios. Não toquei no servidor."],["Ravi Costa","Minha conta foi usada para verificar permissões. Isso não prova que fui eu."],["Nina Vale","Recebi uma cópia anônima do arquivo antes de ele desaparecer."]],prompt:"Quem deve ser investigado como responsável pela restauração?",options:["Lia Moura","Ravi Costa","Nina Vale"],correct:1},
{id:2,code:"CASE-002",title:"O Cofre de Vidro",brief:"Uma empresa perdeu o acesso a um cofre digital. Há três versões conflitantes sobre a senha.",difficulty:"Iniciante",suspects:[["Otávio Reis","Diretor financeiro"],["Maya Luz","Especialista em segurança"],["Caio Neri","Prestador externo"]],objectives:["Comparar os relatos dos suspeitos","Encontrar a pista na política de senhas","Determinar quem alterou a chave"],clues:[["Política interna","A senha deve conter uma palavra e o ano da última auditoria."],["Alerta de segurança","A alteração veio de um dispositivo externo."],["Contrato","Caio tinha acesso temporário, encerrado no dia anterior."]],device:"O cofre mostra três tentativas: uma interna, uma externa e uma alteração confirmada às 22:04.",interviews:[["Otávio Reis","Eu pedi apenas uma troca de senha durante o expediente."],["Maya Luz","A alteração noturna não corresponde ao meu turno."],["Caio Neri","Meu acesso terminou antes do incidente, mas ninguém revogou a sessão antiga."]],prompt:"Qual linha de investigação faz mais sentido?",options:["Otávio Reis","Maya Luz","Caio Neri"],correct:2},
{id:3,code:"CASE-003",title:"A Cidade Sem Sinal",brief:"Uma região ficou sem comunicação por 18 minutos. O apagão parece ter sido cuidadosamente cronometrado.",difficulty:"Intermediário",suspects:[["Davi Torres","Técnico de telecom"],["Sara Klein","Coordenadora de operações"],["Ícaro Luz","Pesquisador de radiofrequência"]],objectives:["Reconstruir a linha do tempo","Analisar o mapa de antenas","Relacionar o apagão a outro evento"],clues:[["Linha do tempo","O sinal caiu exatamente quando um comboio passou pela área."],["Mapa de antenas","Somente duas antenas foram desligadas manualmente."],["Registro de manutenção","Davi abriu uma ordem de serviço que não existia."]],device:"O mapa revela que o apagão cobriu apenas a rota do comboio, não toda a região.",interviews:[["Davi Torres","A ordem de serviço apareceu no sistema já assinada."],["Sara Klein","O comboio não deveria ter passado naquela janela."],["Ícaro Luz","A interferência foi seletiva demais para ser uma falha comum."]],prompt:"Quem deve explicar a ordem de serviço falsa?",options:["Davi Torres","Sara Klein","Ícaro Luz"],correct:0},
{id:4,code:"CASE-004",title:"O Perfil Duplicado",brief:"Uma identidade digital foi copiada para manipular contratos e enviar mensagens falsas.",difficulty:"Intermediário",suspects:[["Bia Ramos","Gerente de RH"],["Enzo Prado","Designer de produto"],["Helena Cruz","Consultora"],],objectives:["Comparar horários das mensagens","Examinar os anexos","Encontrar a origem do perfil falso"],clues:[["Cabeçalho de e-mail","As mensagens falsas foram enviadas por uma sessão antiga."],["Anexo","O documento contém uma assinatura digital reutilizada."],["Calendário","Helena estava em reunião presencial no horário do envio."]],device:"O perfil falso foi criado com uma imagem pública e um token de sessão não revogado.",interviews:[["Bia Ramos","A assinatura parecia legítima, mas o tom era estranho."],["Enzo Prado","Eu criei a identidade visual original, não o perfil falso."],["Helena Cruz","Minha sessão antiga ficou aberta no computador de um cliente."]],prompt:"Qual pista deve guiar a investigação?",options:["A assinatura visual","O token de sessão antigo","O calendário de Helena"],correct:1},
{id:5,code:"CASE-005",title:"O Código da Estação",brief:"Uma mensagem escondida em anúncios de transporte indica uma entrega clandestina.",difficulty:"Intermediário",suspects:[["Jonas Pires","Operador de estação"],["Mila Sato","Criptógrafa"],["Tomás Freire","Mensageiro"],],objectives:["Decifrar o padrão dos anúncios","Localizar a estação correta","Descobrir quem programou a mensagem"],clues:[["Sequência","Os horários formam a sequência 08-13-21-34."],["Mapa","Os números apontam para plataformas, não para horários."],["Bilhete","O bilhete foi impresso em uma máquina de uso restrito."]],device:"A sequência é um código de localização: 08, 13, 21 e 34 correspondem a pontos do mapa.",interviews:[["Jonas Pires","A máquina de impressão ficou bloqueada por senha."],["Mila Sato","O padrão é uma sequência, mas a chave está no mapa."],["Tomás Freire","Fui contratado para entregar um envelope, não sabia o conteúdo."]],prompt:"Quem tinha condições de programar os anúncios?",options:["Jonas Pires","Mila Sato","Tomás Freire"],correct:0},
{id:6,code:"CASE-006",title:"O Último Backup",brief:"Um backup de emergência foi substituído minutos antes de uma invasão. O culpado deixou contradições.",difficulty:"Avançado",suspects:[["Rosa Vidal","Líder de infraestrutura"],["Levi Martins","Auditor"],["Noah Barros","Engenheiro de plantão"],],objectives:["Comparar hashes dos backups","Identificar a janela de alteração","Confrontar os relatos"],clues:[["Hash","O backup oficial e o arquivo restaurado têm hashes diferentes."],["Janela de alteração","A substituição ocorreu durante uma manutenção autorizada."],["Registro de turno","Noah encerrou o plantão antes do horário registrado."]],device:"O sistema registra uma sessão de manutenção com duas assinaturas: uma real e outra copiada.",interviews:[["Rosa Vidal","Autorizei a manutenção, não a substituição do backup."],["Levi Martins","O relatório foi fechado antes de eu validar os hashes."],["Noah Barros","Meu turno acabou às 01:00, mas o sistema mostra 01:42."]],prompt:"Qual evidência deve ser priorizada?",options:["A autorização da manutenção","A divergência de hashes","O horário contraditório de Noah"],correct:1},
{id:7,code:"CASE-007",title:"Arquivos da Sombra",brief:"O último caso conecta os incidentes anteriores a uma operação que manipula identidades, redes e registros.",difficulty:"Final",suspects:[["O Curador","Identidade desconhecida"],["Ravi Costa","Nome recorrente nos logs"],["Helena Cruz","Ligação com sessões antigas"],],objectives:["Reunir evidências de pelo menos três casos","Identificar o padrão comum","Escolher o desfecho da campanha"],clues:[["Padrão comum","Todos os incidentes usaram acessos legítimos ou sessões esquecidas."],["Rede de conexões","As alterações ocorreram em janelas de baixa supervisão."],["Arquivo mestre","O nome 'Curador' aparece como operador de contingência."]],device:"O arquivo mestre só pode ser aberto após reunir três evidências de casos anteriores. Ele aponta para uma operação de captura de sessões.",interviews:[["O Curador","Vocês chamam de crime aquilo que o sistema permite."],["Ravi Costa","Minha conta apareceu em mais de um caso, mas nunca fui ouvido."],["Helena Cruz","Uma sessão esquecida pode ser mais perigosa que uma senha roubada."]],prompt:"Qual desfecho você escolhe para a operação?",options:["Expor tudo publicamente","Entregar o dossiê às autoridades","Negociar com o Curador"],correct:1}
];


const caseHistories = {
  1: {
    title: "O Arquivo Fantasma",
    text: "Nas últimas semanas, uma empresa de análise de dados sofreu uma série de desaparecimentos inexplicáveis. Relatórios importantes eram apagados durante a madrugada e, horas depois, reapareciam em servidores diferentes. O incidente mais recente ocorreu às 03:17, quando um arquivo ligado a uma auditoria interna foi restaurado a partir de uma estação dentro da própria empresa. A equipe de segurança descobriu que a conta de Ravi Costa acessou o diretório, mas ainda não sabe se ele executou a restauração ou se sua sessão foi utilizada por outra pessoa. Lia afirma que estava revisando relatórios, enquanto Nina diz ter recebido uma cópia anônima do arquivo antes do desaparecimento. Você deverá reconstruir a sequência dos acessos, analisar os metadados e descobrir quem restaurou o arquivo — e por qual motivo."
  },
  2: {
    title: "O Cofre de Vidro",
    text: "Uma empresa financeira perdeu o acesso ao seu cofre digital, onde estavam armazenados contratos e chaves de operações importantes. Três relatos entraram em conflito: o diretor diz que pediu apenas uma troca de senha durante o expediente; a especialista em segurança afirma que não estava de plantão no momento da alteração; e o prestador externo garante que seu acesso havia terminado no dia anterior. O sistema, porém, registrou uma alteração às 22:04, originada de um dispositivo externo. A investigação começa com uma pergunta central: alguém esqueceu de revogar uma sessão antiga ou houve uma ação deliberada para assumir o controle do cofre?"
  },
  3: {
    title: "A Cidade Sem Sinal",
    text: "Durante a passagem de um comboio por uma região estratégica, toda a comunicação local caiu por exatamente 18 minutos. O apagão não atingiu a cidade inteira: apenas a rota percorrida pelo comboio ficou sem cobertura. O fato chamou atenção porque duas antenas foram desligadas manualmente, e uma ordem de serviço aparentemente inexistente foi registrada no sistema. Davi, técnico de telecomunicações, aparece como responsável pelo documento; Sara afirma que o comboio não deveria estar naquela janela; e Ícaro considera a interferência seletiva demais para ser uma falha comum. Antes de acusar alguém, você precisa reconstruir a linha do tempo e entender quem tinha interesse em criar uma zona sem sinal."
  },
  4: {
    title: "O Perfil Duplicado",
    text: "Contratos foram enviados a clientes com mensagens falsas, todas aparentemente assinadas por uma funcionária da empresa. O problema não era apenas uma identidade visual copiada: as mensagens saíram de uma sessão antiga que continuava ativa em um computador externo. Um anexo reutilizava uma assinatura digital legítima, tornando os documentos convincentes. Bia percebeu que o tom das mensagens não combinava com a autora; Enzo criou a identidade visual original, mas nega ter participado da fraude; e Helena admite que uma sessão antiga ficou aberta no computador de um cliente. Sua missão é descobrir como o perfil duplicado foi criado e qual vestígio técnico aponta para o responsável."
  },
  5: {
    title: "O Código da Estação",
    text: "Funcionários de uma estação de transporte encontraram uma sequência estranha escondida em anúncios exibidos nos painéis públicos. Os números 08, 13, 21 e 34 pareciam horários, mas se repetiam em momentos que não faziam sentido. Uma análise preliminar revelou que eles apontavam para plataformas específicas e que um bilhete, impresso em uma máquina de uso restrito, estava ligado à mesma sequência. Jonas operava a estação, Mila estudava padrões criptográficos e Tomás foi contratado para entregar um envelope sem conhecer seu conteúdo. Existe uma entrega clandestina em andamento, e você precisa descobrir quem conseguiu programar os anúncios e transformar a estação em um mapa codificado."
  },
  6: {
    title: "O Último Backup",
    text: "Minutos antes de uma invasão, o backup de emergência de uma infraestrutura crítica foi substituído. O arquivo restaurado parecia correto à primeira vista, mas sua assinatura digital não correspondia ao backup oficial. A troca ocorreu durante uma janela de manutenção autorizada, o que dificultou a identificação do responsável. Rosa autorizou a manutenção, Levi deveria validar os hashes e Noah encerrou o plantão antes do horário registrado no sistema. Os registros ainda mostram duas assinaturas de manutenção: uma verdadeira e outra copiada. Você deverá comparar os hashes, reconstruir a janela de alteração e confrontar as contradições dos envolvidos."
  },
  7: {
    title: "Arquivos da Sombra",
    text: "Os seis incidentes anteriores parecem isolados, mas as evidências começam a revelar um padrão: todos envolveram acessos legítimos, sessões esquecidas ou permissões que nunca foram revogadas. Um nome aparece repetidamente nos registros de contingência: O Curador. Essa identidade desconhecida parece coordenar uma operação capaz de capturar sessões e manipular redes, contratos e arquivos. Ravi e Helena voltam a aparecer no dossiê, não necessariamente como culpados, mas como pessoas cujos acessos foram utilizados. Para abrir o arquivo mestre, você deverá reunir evidências de pelo menos três casos anteriores. O desfecho da campanha dependerá da forma como você decidir lidar com a operação."
  }
};

const achievements = [
["primeiro","Primeiro passo","Conclua seu primeiro caso."],
["coletor","Coletor de evidências","Colete 10 evidências."],
["entrevistador","Olho clínico","Entreviste todos os suspeitos de um caso."],
["conexao","Mente conectada","Abra o quadro de evidências."],
["terminal","Operador de terminal","Use cinco comandos no terminal."],
["campanha","Fim da linha","Conclua os sete casos."]
];

let state = JSON.parse(localStorage.getItem("cyberDetectiveV3") || "null") || {
  xp:0, solved:[], evidence:[], interviews:{}, decisions:{}, logs:[], commands:0, boardOpened:false, theme:"dark", currentCase:1
};
state.readCases = Array.isArray(state.readCases) ? state.readCases : [];
let activeCase = null;

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function save(){localStorage.setItem("cyberDetectiveV3",JSON.stringify(state));renderAll();}
function log(msg){state.logs.unshift({time:new Date().toLocaleString("pt-BR"),msg});state.logs=state.logs.slice(0,80);}
function toast(msg){$("#toast").textContent=msg;$("#toast").classList.add("show");setTimeout(()=>$("#toast").classList.remove("show"),2400);}
function level(){return Math.floor(state.xp/100)+1;}
function addXP(n,reason){state.xp+=n;log(`+${n} XP — ${reason}`);toast(`+${n} XP: ${reason}`);}
function go(view){$$(".view").forEach(v=>v.classList.remove("active"));$("#"+view).classList.add("active");$$(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.view===view));if(view==="board")state.boardOpened=true;renderAll();}
function current(){return cases.find(c=>c.id===activeCase)||cases.find(c=>c.id===state.currentCase);}
function unlocked(c){return c.id===1||state.solved.includes(c.id-1);}
function renderAll(){ $("#levelBadge").textContent=`NÍVEL ${level()}`;$("#xpLabel").textContent=`${state.xp} XP`;$("#solvedCount").textContent=`${state.solved.length}/7`;$("#evidenceCount").textContent=state.evidence.length;$("#decisionCount").textContent=Object.keys(state.decisions).length;$("#achievementCount").textContent=achievements.filter(a=>achievementUnlocked(a[0])).length;$("#lastLog").textContent=state.logs[0]?.msg||"Nenhuma atividade registrada.";renderCases();renderBoard();renderJournal();renderAchievements();if(activeCase)renderCaseDetail();}
function renderCases(){$("#caseList").innerHTML=cases.map(c=>{let ok=unlocked(c),done=state.solved.includes(c.id);return `<article class="case-card panel ${ok?"":"locked"}"><span class="eyebrow">${c.code}</span><h3>${c.title}</h3><span class="status">${done?"✓ CONCLUÍDO":ok?"● DISPONÍVEL":"▣ BLOQUEADO"}</span><p>${c.brief}</p><small class="muted">Dificuldade: ${c.difficulty}</small><br><button class="primary" ${ok?"":"disabled"} data-case="${c.id}">${done?"Revisar caso":"Abrir caso"}</button></article>`}).join("");$$("[data-case]").forEach(b=>b.onclick=()=>openCase(+b.dataset.case));}
function openCase(id){
  const selected = cases.find(c=>c.id===id);
  if(!selected || !unlocked(selected)) return;
  activeCase=id;
  state.currentCase=id;
  go("caseDetail");
  log(`Caso aberto: ${selected.title}`);
  save();
}
function renderCaseDetail(){
  const c=current();
  if(!c) return;

  const read = state.readCases.includes(c.id);
  const story = caseHistories[c.id];

  $("#detailCode").textContent=c.code;
  $("#detailTitle").textContent=c.title;
  $("#detailBrief").textContent=c.brief;

  $("#caseStoryTitle").textContent = story ? story.title : c.title;
  $("#caseStoryText").textContent = story ? story.text : "A história deste caso ainda não foi cadastrada.";
  $("#caseStoryGate").classList.toggle("story-read", read);
  $("#caseStoryButton").textContent = read ? "✓ História lida — continuar investigação" : "Li a história — liberar investigação";

  $$(".investigation-content").forEach(el => {
    el.classList.toggle("locked-investigation", !read);
    el.setAttribute("aria-hidden", String(!read));
  });

  let found=state.evidence.filter(e=>e.startsWith(c.id+":")).length;
  let done=state.solved.includes(c.id);
  $("#caseProgress").style.width=`${Math.min(100,found/c.clues.length*100)}%`;
  $("#caseProgress").title=`${found}/${c.clues.length} evidências`;

  $("#suspectList").innerHTML=c.suspects.map((s,i)=>`<div class="suspect"><strong>${s[0]}</strong><small>${s[1]}</small><button class="tool-btn" data-interview="${i}" ${read?"":"disabled"}>Interrogar</button></div>`).join("");
  $$("[data-interview]").forEach(b=>b.onclick=()=>interview(+b.dataset.interview));

  $("#objectiveList").innerHTML=c.objectives.map((o,i)=>`<div class="objective ${found>=i+1?"done":""}">${found>=i+1?"✓":"○"} ${o}</div>`).join("");
  $("#decisionPrompt").textContent=c.prompt;
  $("#decisionOptions").innerHTML=c.options.map((o,i)=>`<button ${done||!read?"disabled":""} data-decision="${i}">${o}</button>`).join("");
  $$("[data-decision]").forEach(b=>b.onclick=()=>decide(+b.dataset.decision));
}
function markStoryAsRead(){
  const c=current();
  if(!c) return;
  if(!state.readCases.includes(c.id)){
    state.readCases.push(c.id);
    addXP(5, "História do caso lida");
    log(`História lida: ${c.title}`);
  }
  save();
  renderCaseDetail();
  toast("Investigação liberada.");
}

function collect(c,idx){let key=`${c.id}:${idx}`;if(!state.evidence.includes(key)){state.evidence.push(key);addXP(20,"Evidência descoberta");log(`Evidência coletada no caso ${c.id}: ${c.clues[idx][0]}`);save();}}
function showClues(){if(!state.readCases.includes(current()?.id)){toast("Leia a história do caso primeiro.");return;}let c=current();openModal(`<h3>Evidências disponíveis</h3>${c.clues.map((cl,i)=>{let has=state.evidence.includes(`${c.id}:${i}`);return `<div class="suspect"><strong>${has?"✓ ":"○ "}${cl[0]}</strong><p>${has?cl[1]:"Evidência ainda não analisada."}</p>${!has?`<button class="answer" data-clue="${i}">Analisar pista</button>`:""}</div>`}).join("")}`);$$("[data-clue]").forEach(b=>b.onclick=()=>{collect(c,+b.dataset.clue);showClues();});}
function interview(i){if(!state.readCases.includes(current()?.id)){toast("Leia a história do caso primeiro.");return;}let c=current(),key=`${c.id}:${i}`;openModal(`<h3>Entrevista: ${c.suspects[i][0]}</h3><p>${c.interviews[i][1]}</p><p class="muted">O relato foi registrado no diário. Compare-o com as evidências antes de tirar conclusões.</p><button class="primary" id="recordInterview">Registrar entrevista</button>`);$("#recordInterview").onclick=()=>{if(!state.interviews[key]){state.interviews[key]=true;addXP(10,"Entrevista registrada");log(`Entrevista realizada com ${c.suspects[i][0]}`);save();}closeModal();};}
function showDevice(){if(!state.readCases.includes(current()?.id)){toast("Leia a história do caso primeiro.");return;}let c=current();openModal(`<h3>Dispositivo recuperado</h3><p>${c.device}</p><p class="muted">Você encontrou uma anomalia. Deseja adicioná-la ao quadro?</p><button class="primary" id="addDevice">Adicionar ao quadro</button>`);$("#addDevice").onclick=()=>{let key=`device:${c.id}`;if(!state.evidence.includes(key)){state.evidence.push(key);addXP(15,"Dispositivo analisado");log(`Dispositivo analisado no caso ${c.id}`);save();}closeModal();};}
function decide(i){let c=current();if(state.solved.includes(c.id))return;state.decisions[c.id]=i;state.solved.push(c.id);addXP(50,"Caso concluído");log(`Decisão final no caso ${c.id}: ${c.options[i]}`);if(i===c.correct){addXP(30,"Linha de investigação coerente");}else{log("O relatório registrou uma decisão alternativa. Nem toda conclusão foi confirmada.");}save();openModal(`<h3>Relatório encerrado</h3><p>Você escolheu: <strong>${c.options[i]}</strong>.</p><p>${i===c.correct?"Sua conclusão está alinhada com as pistas principais.":"Sua hipótese foi registrada, mas existem inconsistências que poderão ser revisitadas."}</p><button class="primary" id="nextBtn">Continuar</button>`);$("#nextBtn").onclick=()=>{closeModal();go("cases");};}
function renderBoard(){let items=[];state.evidence.forEach(key=>{let [a,b]=key.split(":");if(a==="device"){let c=cases.find(c=>c.id===+b);items.push({title:`Dispositivo — ${c.title}`,text:c.device});}else{let c=cases.find(c=>c.id===+a);if(c&&c.clues[+b])items.push({title:`${c.code} — ${c.clues[+b][0]}`,text:c.clues[+b][1]});}});$("#boardItems").innerHTML=items.length?items.map(x=>`<div class="board-item"><h4>${x.title}</h4><p>${x.text}</p></div>`).join(""):`<p class="muted">Nenhuma evidência conectada ainda. Abra um caso e analise as pistas.</p>`;}
function renderJournal(){$("#journalList").innerHTML=state.logs.length?state.logs.map(l=>`<div class="log"><time>${l.time}</time><p>${l.msg}</p></div>`).join(""):`<p class="muted">Seu diário está vazio.</p>`;}
function achievementUnlocked(id){if(id==="primeiro")return state.solved.length>=1;if(id==="coletor")return state.evidence.length>=10;if(id==="entrevistador")return Object.keys(state.interviews).some(k=>{let id=k.split(":")[0];return [0,1,2].every(i=>state.interviews[`${id}:${i}`]);});if(id==="conexao")return state.boardOpened;if(id==="terminal")return state.commands>=5;if(id==="campanha")return state.solved.length===7;return false;}
function renderAchievements(){$("#achievementList").innerHTML=achievements.map(a=>`<div class="achievement ${achievementUnlocked(a[0])?"unlocked":""}"><strong>${achievementUnlocked(a[0])?"★":"☆"} ${a[1]}</strong><p>${a[2]}</p></div>`).join("");}
function openModal(html){$("#modalContent").innerHTML=html;$("#modal").classList.remove("hidden");}
function closeModal(){$("#modal").classList.add("hidden");}
function terminalPrint(s){$("#terminalOutput").textContent+=`\n${s}`;$("#terminalOutput").scrollTop=$("#terminalOutput").scrollHeight;}
function command(cmd){let parts=cmd.trim().split(/\s+/),base=parts[0].toLowerCase();state.commands++;switch(base){case"help":terminalPrint("Comandos: help | case | clues | suspects | status | solve RESPOSTA | clear");break;case"case":{let c=current();terminalPrint(`${c.code} — ${c.title}\n${c.brief}`);break;}case"clues":{let c=current();terminalPrint(c.clues.map((x,i)=>`${i+1}. ${x[0]}`).join("\n"));break;}case"suspects":terminalPrint(current().suspects.map(s=>`${s[0]} — ${s[1]}`).join("\n"));break;case"status":terminalPrint(`Nível: ${level()} | XP: ${state.xp} | Casos: ${state.solved.length}/7 | Evidências: ${state.evidence.length}`);break;case"solve":terminalPrint("A resolução pelo terminal está em modo de consulta. Use o painel de decisão para registrar a conclusão.");break;case"clear":$("#terminalOutput").textContent="";break;default:terminalPrint("Comando não reconhecido. Digite help.");}log(`Terminal: ${cmd}`);save();}
$$(".nav-btn").forEach(b=>b.onclick=()=>go(b.dataset.view));$("#continueBtn").onclick=()=>{openCase(state.solved.length<7?state.solved.length+1:7);};$("#backCases").onclick=()=>go("cases");$("#openClues").onclick=showClues;$("#caseStoryButton").onclick=markStoryAsRead;$("#openDevice").onclick=showDevice;$("#openInterview").onclick=()=>openModal(`<h3>Entrevistas do caso</h3><p>Selecione um suspeito no painel principal para iniciar uma entrevista.</p>`);$("#closeModal").onclick=closeModal;$("#modal").onclick=e=>{if(e.target.id==="modal")closeModal();};$("#terminalForm").onsubmit=e=>{e.preventDefault();let input=$("#terminalInput");if(input.value.trim()){terminalPrint(`> ${input.value}`);command(input.value);input.value="";}};$("#themeBtn").onclick=()=>{state.theme=state.theme==="dark"?"light":"dark";document.body.classList.toggle("light",state.theme==="light");save();};$("#resetBtn").onclick=()=>{if(confirm("Apagar todo o progresso?")){localStorage.removeItem("cyberDetectiveV3");location.reload();}};
if(state.theme==="light")document.body.classList.add("light");terminalPrint("CYBER DETECTIVE FORENSICS TERMINAL v3.0\nDigite help para ver os comandos.");renderAll();
