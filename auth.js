/* ==========================================================
   CYBER DETECTIVE — TELA INICIAL + LOGIN/CADASTRO
   Versão corrigida: o formulário aparece ao clicar em Entrar
   ou Criar conta. Responsivo para celular e computador.
========================================================== */
(() => {
  'use strict';

  const SUPABASE_URL = 'https://joorehnfqrhhiwenqemy.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_xXjb1TlaAQSLVFyNsTUjJw_knKKlOcF';

  let supabaseClient = null;
  let signupMode = false;

  const css = `
    #cyberWelcome {
      position: fixed;
      inset: 0;
      z-index: 99999;
      overflow-y: auto;
      color: #eef8ff;
      background:
        linear-gradient(90deg, rgba(0,7,15,.98), rgba(0,9,18,.72)),
        radial-gradient(circle at 78% 30%, rgba(0,157,255,.26), transparent 38%),
        #020811;
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    #cyberWelcome *, #cyberWelcome *::before, #cyberWelcome *::after {
      box-sizing: border-box;
    }

    #cyberWelcome .cd-shell {
      min-height: 100dvh;
      display: grid;
      grid-template-columns: 174px minmax(0, 1fr);
      grid-template-rows: 70px 1fr auto;
      background:
        repeating-linear-gradient(0deg, rgba(70,170,255,.025) 0 1px, transparent 1px 5px);
    }

    #cyberWelcome .cd-sidebar {
      grid-column: 1;
      grid-row: 1 / 4;
      padding: 28px 7px;
      border-right: 1px solid rgba(37,124,190,.25);
      background: rgba(1,8,16,.8);
    }

    #cyberWelcome .cd-logo {
      width: 100%;
      margin: 0 auto 42px;
      text-align: center;
      font-weight: 950;
      font-size: 27px;
      line-height: .9;
      letter-spacing: -1.5px;
      color: #f2f8ff;
    }

    #cyberWelcome .cd-logo span,
    #cyberWelcome .cd-hero span {
      color: #10c8ff;
    }

    #cyberWelcome .cd-logo small {
      display: block;
      margin-top: 14px;
      font-size: 7px;
      letter-spacing: 1.6px;
      line-height: 1.5;
      color: #b2cce0;
    }

    #cyberWelcome .cd-side-nav {
      display: grid;
      gap: 8px;
    }

    #cyberWelcome .cd-side-nav button {
      width: 100%;
      padding: 16px 8px;
      border: 0;
      border-left: 2px solid transparent;
      border-radius: 0 8px 8px 0;
      color: #c1d3e4;
      background: transparent;
      text-align: left;
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }

    #cyberWelcome .cd-side-nav button.active,
    #cyberWelcome .cd-side-nav button:hover {
      color: #fff;
      background: rgba(0,145,255,.18);
      border-left-color: #13caff;
    }

    #cyberWelcome .cd-topbar {
      grid-column: 2;
      grid-row: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 24px;
      padding: 12px 25px;
      border-bottom: 1px solid rgba(37,124,190,.3);
      background: rgba(1,8,16,.6);
    }

    #cyberWelcome .cd-topnav {
      display: flex;
      gap: clamp(20px, 3vw, 42px);
      align-items: center;
    }

    #cyberWelcome .cd-topnav button {
      padding: 10px 0;
      border: 0;
      border-bottom: 2px solid transparent;
      color: #e0ebf5;
      background: transparent;
      font: inherit;
      font-size: 14px;
      cursor: pointer;
    }

    #cyberWelcome .cd-topnav button.active,
    #cyberWelcome .cd-topnav button:hover {
      color: #16caff;
      border-bottom-color: #16caff;
    }

    #cyberWelcome .cd-top-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    #cyberWelcome .cd-btn {
      min-height: 46px;
      padding: 12px 24px;
      border: 1px solid #129fff;
      border-radius: 9px;
      color: #effaff;
      background: rgba(2,19,34,.75);
      font: inherit;
      font-weight: 700;
      cursor: pointer;
      transition: .2s ease;
    }

    #cyberWelcome .cd-btn.primary {
      color: #00101c;
      background: linear-gradient(135deg, #19caff, #1479ff);
      box-shadow: 0 0 22px rgba(0,175,255,.25);
    }

    #cyberWelcome .cd-btn:hover {
      transform: translateY(-2px);
      filter: brightness(1.12);
    }

    #cyberWelcome .cd-main {
      grid-column: 2;
      grid-row: 2;
      padding: clamp(35px, 5vw, 72px) clamp(22px, 4vw, 58px);
      display: flex;
      align-items: center;
    }

    #cyberWelcome .cd-content {
      width: min(100%, 1020px);
    }

    #cyberWelcome .cd-kicker {
      color: #1bcaff;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 3px;
    }

    #cyberWelcome .cd-hero {
      max-width: 760px;
      margin: 20px 0 16px;
      color: #f2f8ff;
      font-size: clamp(43px, 6.2vw, 86px);
      line-height: .96;
      letter-spacing: -2px;
      font-weight: 950;
    }

    #cyberWelcome .cd-description {
      max-width: 650px;
      margin: 0 0 28px;
      color: #c0d2e1;
      font-size: clamp(15px, 1.6vw, 20px);
      line-height: 1.6;
    }

    #cyberWelcome .cd-main-actions {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 225px));
      gap: 14px;
      margin-bottom: 38px;
    }

    #cyberWelcome .cd-main-actions .cd-btn {
      width: 100%;
      min-height: 58px;
      font-size: 16px;
    }

    #cyberWelcome .cd-features {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }

    #cyberWelcome .cd-feature {
      min-width: 0;
      padding: 22px 17px;
      border: 1px solid rgba(29,112,170,.45);
      border-radius: 10px;
      background: rgba(2,17,31,.68);
    }

    #cyberWelcome .cd-feature strong {
      display: block;
      margin-bottom: 9px;
      color: #18caff;
      font-size: 14px;
      letter-spacing: 1px;
    }

    #cyberWelcome .cd-feature p {
      margin: 0;
      color: #b6c9da;
      font-size: 12px;
      line-height: 1.6;
    }

    #cyberWelcome .cd-story {
      margin-top: 32px;
      padding: 24px 0 0;
      border-top: 1px solid rgba(37,124,190,.3);
      max-width: 760px;
    }

    #cyberWelcome .cd-story h3 {
      margin: 0 0 10px;
      color: #19caff;
      font-size: 18px;
      letter-spacing: 2px;
    }

    #cyberWelcome .cd-story p {
      margin: 0;
      color: #c0d2e1;
      font-size: 14px;
      line-height: 1.75;
    }

    #cyberWelcome .cd-footer {
      grid-column: 2;
      grid-row: 3;
      display: flex;
      justify-content: space-between;
      gap: 18px;
      padding: 18px 25px;
      border-top: 1px solid rgba(37,124,190,.3);
      color: #91b2ca;
      font-size: 12px;
    }

    /* Modal de login/cadastro — oculto até clicar em Entrar/Criar conta */
    #cyberWelcome .cd-auth-overlay {
      position: fixed;
      inset: 0;
      z-index: 100000;
      display: none;
      place-items: center;
      padding: 18px;
      background: rgba(0,3,9,.82);
      backdrop-filter: blur(9px);
    }

    #cyberWelcome .cd-auth-overlay.open {
      display: grid;
    }

    #cyberWelcome .cd-auth-card {
      width: min(100%, 440px);
      padding: clamp(22px, 5vw, 34px);
      border: 1px solid #1b9ed8;
      border-radius: 16px;
      background: linear-gradient(145deg, #071a2c, #030b15);
      box-shadow: 0 0 60px rgba(0,169,255,.2);
    }

    #cyberWelcome .cd-auth-card h2 {
      margin: 0 0 8px;
      color: #f3fbff;
      font-size: 27px;
    }

    #cyberWelcome .cd-auth-card .cd-auth-subtitle {
      margin: 0 0 22px;
      color: #9bbbd1;
      font-size: 13px;
      line-height: 1.5;
    }

    #cyberWelcome .cd-auth-card form {
      display: grid;
      gap: 10px;
    }

    #cyberWelcome .cd-auth-card label {
      color: #a8c5da;
      font-size: 13px;
    }

    #cyberWelcome .cd-auth-card input {
      width: 100%;
      min-width: 0;
      padding: 14px;
      border: 1px solid #28506d;
      border-radius: 9px;
      outline: none;
      color: #f5fbff;
      background: #061321;
      font: inherit;
      font-size: 16px;
    }

    #cyberWelcome .cd-auth-card input:focus {
      border-color: #18caff;
      box-shadow: 0 0 0 3px rgba(24,202,255,.1);
    }

    #cyberWelcome .cd-auth-message {
      min-height: 22px;
      margin: 8px 0 0;
      color: #1bcaff;
      font-size: 13px;
      line-height: 1.5;
    }

    #cyberWelcome .cd-auth-message.error {
      color: #ff7b85;
    }

    #cyberWelcome .cd-close {
      float: right;
      width: 32px;
      height: 32px;
      border: 1px solid #345873;
      border-radius: 50%;
      color: #c7deed;
      background: transparent;
      cursor: pointer;
      font-size: 18px;
    }

    @media (max-width: 950px) {
      #cyberWelcome .cd-shell {
        grid-template-columns: 145px minmax(0, 1fr);
      }
      #cyberWelcome .cd-features {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      #cyberWelcome .cd-main-actions {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (max-width: 700px) {
      #cyberWelcome .cd-shell {
        display: block;
      }
      #cyberWelcome .cd-sidebar {
        padding: 18px 12px 10px;
        border-right: 0;
        border-bottom: 1px solid rgba(37,124,190,.3);
      }
      #cyberWelcome .cd-logo {
        margin-bottom: 18px;
        font-size: 25px;
      }
      #cyberWelcome .cd-side-nav {
        display: flex;
        overflow-x: auto;
        gap: 6px;
      }
      #cyberWelcome .cd-side-nav button {
        flex: 0 0 auto;
        width: auto;
        padding: 10px 12px;
        border-left: 0;
        border-bottom: 2px solid transparent;
        border-radius: 7px;
        font-size: 12px;
      }
      #cyberWelcome .cd-side-nav button.active {
        border-left: 0;
        border-bottom-color: #13caff;
      }
      #cyberWelcome .cd-topbar {
        display: block;
        padding: 13px 15px;
      }
      #cyberWelcome .cd-topnav {
        justify-content: center;
        gap: 18px;
        margin-bottom: 12px;
      }
      #cyberWelcome .cd-topnav button {
        font-size: 12px;
      }
      #cyberWelcome .cd-top-actions {
        justify-content: center;
      }
      #cyberWelcome .cd-main {
        padding: 34px 16px 40px;
      }
      #cyberWelcome .cd-hero {
        font-size: clamp(40px, 12vw, 68px);
        letter-spacing: -1px;
      }
      #cyberWelcome .cd-description {
        font-size: 15px;
      }
      #cyberWelcome .cd-main-actions {
        grid-template-columns: 1fr;
      }
      #cyberWelcome .cd-features {
        grid-template-columns: 1fr 1fr;
      }
      #cyberWelcome .cd-footer {
        display: block;
        padding: 18px 16px;
        text-align: center;
      }
    }

    @media (max-width: 390px) {
      #cyberWelcome .cd-features {
        grid-template-columns: 1fr;
      }
      #cyberWelcome .cd-topnav {
        gap: 12px;
      }
    }
  `;

  function injectStyles() {
    if (document.getElementById('cyberDetectiveAuthFixStyles')) return;
    const style = document.createElement('style');
    style.id = 'cyberDetectiveAuthFixStyles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function setMessage(messageElement, text, error = false) {
    messageElement.textContent = text;
    messageElement.classList.toggle('error', error);
  }

  function closeAuthModal() {
    document.getElementById('cdAuthOverlay')?.classList.remove('open');
  }

  function openAuthModal(mode) {
    signupMode = mode === 'signup';

    const overlay = document.getElementById('cdAuthOverlay');
    const title = document.getElementById('cdAuthTitle');
    const subtitle = document.getElementById('cdAuthSubtitle');
    const submit = document.getElementById('cdAuthSubmit');
    const switchButton = document.getElementById('cdAuthSwitch');
    const password = document.getElementById('cdAuthPassword');
    const message = document.getElementById('cdAuthMessage');

    title.textContent = signupMode ? 'Criar conta' : 'Entrar no Cyber Detective';
    subtitle.textContent = signupMode
      ? 'Crie sua conta para salvar seu progresso e suas investigações.'
      : 'Entre na sua conta para continuar sua investigação.';
    submit.textContent = signupMode ? 'Criar conta' : 'Entrar';
    switchButton.textContent = signupMode ? 'Já tenho uma conta' : 'Ainda não tenho uma conta';
    password.autocomplete = signupMode ? 'new-password' : 'current-password';
    setMessage(message, '');
    overlay.classList.add('open');
    document.getElementById('cdAuthEmail').focus();
  }

  function buildInterface() {
    if (document.getElementById('cyberWelcome')) return;

    injectStyles();

    const screen = document.createElement('div');
    screen.id = 'cyberWelcome';
    screen.innerHTML = `
      <div class="cd-shell">
        <aside class="cd-sidebar">
          <div class="cd-logo">CYBER<br><span>DETECTIVE</span><small>CRIMES DIGITAIS, VERDADES REAIS</small></div>
          <nav class="cd-side-nav" aria-label="Navegação lateral">
            <button class="active" type="button">⌂ &nbsp; Início</button>
            <button type="button">▣ &nbsp; Casos</button>
            <button type="button">▤ &nbsp; Terminal</button>
            <button type="button">⌘ &nbsp; Quadro de Evidências</button>
            <button type="button">★ &nbsp; Conquistas</button>
            <button type="button">♜ &nbsp; Ranking</button>
          </nav>
        </aside>

        <header class="cd-topbar">
          <nav class="cd-topnav" aria-label="Navegação superior">
            <button class="active" type="button">Início</button>
            <button type="button">Sobre</button>
            <button type="button">Casos</button>
            <button type="button">Ranking</button>
            <button type="button">Ajuda</button>
          </nav>
          <div class="cd-top-actions">
            <button class="cd-btn" id="cdSoundButton" type="button">🔊 &nbsp; Som Ambiente</button>
            <button class="cd-btn primary" id="cdTopLogin" type="button">👤 &nbsp; Entrar</button>
          </div>
        </header>

        <main class="cd-main">
          <div class="cd-content">
            <div class="cd-kicker">FORGE STUDIOS // INVESTIGATION DIVISION</div>
            <h1 class="cd-hero">A verdade está<br>escondida nos <span>dados.</span></h1>
            <p class="cd-description">
              Entre no mundo oculto da investigação digital. Analise pistas,
              conecte informações e descubra a verdade por trás dos casos mais
              intrigantes da era da tecnologia.
            </p>

            <div class="cd-main-actions">
              <button class="cd-btn primary" id="cdMainLogin" type="button">👤 &nbsp; Entrar</button>
              <button class="cd-btn" id="cdMainSignup" type="button">⊕ &nbsp; Criar conta</button>
              <button class="cd-btn" id="cdGuest" type="button">🎮 &nbsp; Jogar sem conta</button>
            </div>

            <section class="cd-features">
              <article class="cd-feature"><strong>⌕ &nbsp; ANALISE</strong><p>Examine pistas e documentos digitais.</p></article>
              <article class="cd-feature"><strong>↗ &nbsp; CONECTE</strong><p>Relacione informações e descubra padrões.</p></article>
              <article class="cd-feature"><strong>💡 &nbsp; DESCUBRA</strong><p>Chegue à verdade e resolva o caso.</p></article>
              <article class="cd-feature"><strong>▥ &nbsp; EVOLUA</strong><p>Ganhe XP, conquistas e novos desafios.</p></article>
            </section>

            <section class="cd-story">
              <h3>▱ &nbsp; HISTÓRIA</h3>
              <p>
                Você é um detetive digital. Em um mundo cada vez mais conectado,
                os crimes também evoluíram. Hackers, fraudes, sequestros de dados
                e conspirações se escondem nas sombras da internet. Sua missão é
                investigar, analisar e revelar a verdade. Cada caso é baseado em
                situações reais inspiradas em crimes cibernéticos.
              </p>
            </section>
          </div>
        </main>

        <footer class="cd-footer">
          <strong>🎮 &nbsp; FORGE STUDIOS — GAMES WITH PURPOSE</strong>
          <span>Cyber Detective © 2026 Forge Studios. Todos os direitos reservados.</span>
        </footer>

        <div class="cd-auth-overlay" id="cdAuthOverlay" role="dialog" aria-modal="true" aria-labelledby="cdAuthTitle">
          <section class="cd-auth-card">
            <button class="cd-close" id="cdAuthClose" type="button" aria-label="Fechar">×</button>
            <h2 id="cdAuthTitle">Entrar no Cyber Detective</h2>
            <p class="cd-auth-subtitle" id="cdAuthSubtitle">Entre na sua conta para continuar sua investigação.</p>

            <form id="cdAuthForm">
              <label for="cdAuthEmail">E-mail</label>
              <input id="cdAuthEmail" type="email" autocomplete="email" placeholder="seu@email.com" required>

              <label for="cdAuthPassword">Senha</label>
              <input id="cdAuthPassword" type="password" minlength="6" autocomplete="current-password" placeholder="Mínimo de 6 caracteres" required>

              <button class="cd-btn primary" id="cdAuthSubmit" type="submit">Entrar</button>
              <button class="cd-btn" id="cdAuthSwitch" type="button">Ainda não tenho uma conta</button>
              <p class="cd-auth-message" id="cdAuthMessage" role="status" aria-live="polite"></p>
            </form>
          </section>
        </div>
      </div>
    `;

    document.body.appendChild(screen);

    document.getElementById('cdTopLogin').addEventListener('click', () => openAuthModal('login'));
    document.getElementById('cdMainLogin').addEventListener('click', () => openAuthModal('login'));
    document.getElementById('cdMainSignup').addEventListener('click', () => openAuthModal('signup'));
    document.getElementById('cdAuthClose').addEventListener('click', closeAuthModal);
    document.getElementById('cdAuthSwitch').addEventListener('click', () => openAuthModal(signupMode ? 'login' : 'signup'));
    document.getElementById('cdGuest').addEventListener('click', () => {
      closeAuthModal();
      screen.remove();
      document.dispatchEvent(new CustomEvent('cyber:auth-ready', { detail: { guest: true } }));
    });

    document.getElementById('cdAuthOverlay').addEventListener('click', event => {
      if (event.target.id === 'cdAuthOverlay') closeAuthModal();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeAuthModal();
    });

    document.getElementById('cdAuthForm').addEventListener('submit', submitAuth);
  }

  async function submitAuth(event) {
    event.preventDefault();

    const email = document.getElementById('cdAuthEmail').value.trim();
    const password = document.getElementById('cdAuthPassword').value;
    const submit = document.getElementById('cdAuthSubmit');
    const message = document.getElementById('cdAuthMessage');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage(message, 'Informe um e-mail válido.', true);
      return;
    }

    if (password.length < 6) {
      setMessage(message, 'A senha deve ter pelo menos 6 caracteres.', true);
      return;
    }

    if (!supabaseClient) {
      setMessage(message, 'O serviço de autenticação ainda não carregou. Recarregue a página.', true);
      return;
    }

    submit.disabled = true;
    setMessage(message, 'Processando...');

    try {
      const result = signupMode
        ? await supabaseClient.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: window.location.origin + window.location.pathname
            }
          })
        : await supabaseClient.auth.signInWithPassword({ email, password });

      if (result.error) {
        setMessage(message, result.error.message, true);
        return;
      }

      if (signupMode && !result.data.session) {
        signupMode = false;
        document.getElementById('cdAuthTitle').textContent = 'Entrar no Cyber Detective';
        document.getElementById('cdAuthSubtitle').textContent = 'Confirme seu e-mail e depois faça login.';
        submit.textContent = 'Entrar';
        document.getElementById('cdAuthSwitch').textContent = 'Ainda não tenho uma conta';
        document.getElementById('cdAuthPassword').value = '';
        setMessage(message, 'Conta criada! Verifique seu e-mail. Depois, volte e faça login.');
        return;
      }

      closeAuthModal();
      document.getElementById('cyberWelcome')?.remove();
      document.dispatchEvent(new CustomEvent('cyber:auth-ready', {
        detail: { user: result.data.user }
      }));
    } catch (error) {
      console.error('[Cyber Detective Auth]', error);
      setMessage(message, 'Não foi possível concluir a operação. Tente novamente.', true);
    } finally {
      submit.disabled = false;
    }
  }

  function loadSupabase() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = async () => {
      try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data, error } = await supabaseClient.auth.getSession();
        if (error) console.error('[Cyber Detective Auth] Sessão:', error);

        const returnedFromConfirmation =
          window.location.hash.includes('access_token') ||
          new URLSearchParams(window.location.search).has('code');

        if (returnedFromConfirmation) {
          await supabaseClient.auth.signOut();
          window.history.replaceState({}, document.title, window.location.pathname);
          buildInterface();
          openAuthModal('login');
          setMessage(document.getElementById('cdAuthMessage'), 'E-mail confirmado! Agora faça login.');
        } else if (!data?.session) {
          buildInterface();
        }
      } catch (error) {
        console.error('[Cyber Detective Auth] Inicialização:', error);
        buildInterface();
      }
    };
    script.onerror = () => {
      console.error('[Cyber Detective Auth] CDN do Supabase indisponível.');
      buildInterface();
    };
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSupabase, { once: true });
  } else {
    loadSupabase();
  }
})();
