/* Cyber Detective — tela inicial responsiva + autenticação Supabase */
(() => {
  'use strict';

  const SUPABASE_URL = 'https://joorehnfqrhhiwenqemy.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_xXjb1TlaAQSLVFyNsTUjJw_knKKlOcF';

  const $ = (selector, root = document) => root.querySelector(selector);

  function setMessage(element, text, isError = false) {
    element.textContent = text;
    element.classList.toggle('error', isError);
  }

  function removeWelcome() {
    document.getElementById('cyberWelcome')?.remove();
  }

  function renderWelcome(supabase) {
    if (document.getElementById('cyberWelcome')) return;

    const root = document.createElement('div');
    root.id = 'cyberWelcome';
    root.innerHTML = `
      <div class="cyber-welcome-shell">
        <aside class="cyber-sidebar" aria-label="Navegação">
          <div class="cyber-brand">
            <h2 class="cyber-brand-title">CYBER<br><span>DETECTIVE</span></h2>
            <small class="cyber-brand-subtitle">CRIMES DIGITAIS, VERDADES REAIS</small>
          </div>
          <nav class="cyber-sidebar-nav">
            <a href="#inicio" class="active">⌂ Início</a>
            <a href="#casos">▣ Casos</a>
            <a href="#terminal">▤ Terminal</a>
            <a href="#evidencias">⌘ Evidências</a>
            <a href="#conquistas">★ Conquistas</a>
            <a href="#ranking">♜ Ranking</a>
          </nav>
        </aside>

        <header class="cyber-topbar">
          <nav class="cyber-topnav" aria-label="Menu principal">
            <a href="#inicio" class="active">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#casos">Casos</a>
            <a href="#ranking">Ranking</a>
            <a href="#ajuda">Ajuda</a>
          </nav>
          <div class="cyber-top-actions">
            <button type="button" class="cyber-sound-button" id="cyberAmbientButton">🔊 Som Ambiente</button>
            <button type="button" class="cyber-login-button" id="cyberHeaderLogin">👤 Entrar</button>
          </div>
        </header>

        <main class="cyber-main">
          <div class="cyber-main-inner">
            <div class="cyber-kicker">FORGE STUDIOS // INVESTIGATION DIVISION</div>
            <h1 class="cyber-hero-title">A verdade está<br>escondida nos <span>dados.</span></h1>
            <p class="cyber-hero-description">
              Entre no mundo oculto da investigação digital. Analise pistas,
              conecte informações e descubra a verdade por trás dos casos mais
              intrigantes da era da tecnologia.
            </p>

            <section class="cyber-auth-panel" id="cyberAuthPanel" aria-label="Login e cadastro">
              <form id="cyberAuthForm" novalidate>
                <label for="cyberEmail">E-mail</label>
                <input id="cyberEmail" type="email" autocomplete="email" placeholder="seu@email.com" required>

                <label for="cyberPassword">Senha</label>
                <input id="cyberPassword" type="password" minlength="6" autocomplete="current-password" placeholder="Mínimo de 6 caracteres" required>

                <div class="cyber-auth-actions">
                  <button type="submit" class="cyber-main-button" id="cyberSubmit">Entrar</button>
                  <button type="button" class="cyber-secondary-button" id="cyberMode">Criar conta</button>
                </div>

                <button type="button" class="cyber-guest-button" id="cyberGuest">🎮 Jogar sem conta</button>
                <p class="cyber-auth-message" id="cyberMessage" role="status" aria-live="polite"></p>
              </form>
            </section>

            <div class="cyber-feature-grid" aria-label="Recursos do jogo">
              <article class="cyber-feature-card"><strong>⌕ ANALISE</strong><p>Examine pistas e documentos digitais.</p></article>
              <article class="cyber-feature-card"><strong>↗ CONECTE</strong><p>Relacione informações e descubra padrões.</p></article>
              <article class="cyber-feature-card"><strong>💡 DESCUBRA</strong><p>Chegue à verdade e resolva o caso.</p></article>
              <article class="cyber-feature-card"><strong>▥ EVOLUA</strong><p>Ganhe XP, conquistas e novos desafios.</p></article>
            </div>
          </div>
        </main>

        <footer class="cyber-footer">
          <strong>FORGE STUDIOS // GAMES WITH PURPOSE</strong>
          <span>Cyber Detective © 2026 Forge Studios</span>
        </footer>
      </div>
    `;

    document.body.appendChild(root);

    const form = $('#cyberAuthForm', root);
    const email = $('#cyberEmail', root);
    const password = $('#cyberPassword', root);
    const submit = $('#cyberSubmit', root);
    const mode = $('#cyberMode', root);
    const guest = $('#cyberGuest', root);
    const message = $('#cyberMessage', root);
    const headerLogin = $('#cyberHeaderLogin', root);
    const ambientButton = $('#cyberAmbientButton', root);

    let signupMode = false;

    const showForm = () => $('#cyberAuthPanel', root)?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    headerLogin.addEventListener('click', showForm);
    mode.addEventListener('click', () => {
      signupMode = !signupMode;
      submit.textContent = signupMode ? 'Cadastrar' : 'Entrar';
      mode.textContent = signupMode ? 'Já tenho uma conta' : 'Criar conta';
      password.autocomplete = signupMode ? 'new-password' : 'current-password';
      setMessage(message, '');
    });

    guest.addEventListener('click', removeWelcome);

    ambientButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('cyber:toggle-ambient-sound'));
      ambientButton.textContent = ambientButton.textContent.includes('🔊')
        ? '🔇 Som Ambiente'
        : '🔊 Som Ambiente';
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const userEmail = email.value.trim();
      const userPassword = password.value;

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
        setMessage(message, 'Informe um e-mail válido.', true);
        return;
      }

      if (userPassword.length < 6) {
        setMessage(message, 'A senha deve ter pelo menos 6 caracteres.', true);
        return;
      }

      if (!supabase) {
        setMessage(message, 'Serviço de autenticação indisponível. Recarregue a página.', true);
        return;
      }

      submit.disabled = true;
      setMessage(message, 'Processando...');

      try {
        const result = signupMode
          ? await supabase.auth.signUp({ email: userEmail, password: userPassword })
          : await supabase.auth.signInWithPassword({ email: userEmail, password: userPassword });

        if (result.error) {
          setMessage(message, result.error.message, true);
          return;
        }

        if (signupMode && !result.data.session) {
          setMessage(message, 'Conta criada! Confirme seu e-mail antes de entrar.');
          return;
        }

        removeWelcome();
        document.dispatchEvent(new CustomEvent('cyber:auth-ready', {
          detail: { user: result.data.user }
        }));
      } catch (error) {
        console.error('[Cyber Detective Auth]', error);
        setMessage(message, 'Não foi possível concluir a operação.', true);
      } finally {
        submit.disabled = false;
      }
    });
  }

  function loadSupabase() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = async () => {
      try {
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data, error } = await client.auth.getSession();
        if (error) console.error('[Cyber Detective Auth] Sessão:', error);
        if (!data?.session) renderWelcome(client);
      } catch (error) {
        console.error('[Cyber Detective Auth] Inicialização:', error);
        renderWelcome(null);
      }
    };
    script.onerror = () => renderWelcome(null);
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSupabase, { once: true });
  } else {
    loadSupabase();
  }
})();
