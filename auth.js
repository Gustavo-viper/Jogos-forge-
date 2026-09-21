/* Cyber Detective - Autenticação Supabase */
(() => {
  'use strict';

  const SUPABASE_URL = 'https://joorehnfqrhhiwenqemy.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_xXjb1TlaAQSLVFyNsTUjJw_knKKlOcF';

  function message(element, text, error = false) {
    element.textContent = text;
    element.style.color = error ? '#ff6b6b' : '';
  }

  function showAuthScreen(supabase) {
    if (document.getElementById('authScreen')) return;

    const screen = document.createElement('div');
    screen.id = 'authScreen';
    screen.innerHTML = `
      <div class="auth-card">
        <div class="auth-brand">🕵️</div>
        <h1>Cyber Detective</h1>
        <p class="auth-subtitle">Entre na sua conta para salvar seu progresso.</p>
        <form id="authForm">
          <label for="authEmail">E-mail</label>
          <input id="authEmail" type="email" placeholder="seu@email.com" required>
          <label for="authPassword">Senha</label>
          <input id="authPassword" type="password" placeholder="Mínimo de 6 caracteres" minlength="6" required>
          <button type="submit" id="authSubmit">Entrar</button>
          <button type="button" id="authToggle" class="auth-secondary">Criar conta</button>
          <button type="button" id="authGuest" class="auth-guest">Continuar sem conta</button>
          <p id="authMessage" class="auth-message" role="status"></p>
        </form>
      </div>
    `;

    document.body.prepend(screen);

    const form = document.getElementById('authForm');
    const email = document.getElementById('authEmail');
    const password = document.getElementById('authPassword');
    const submit = document.getElementById('authSubmit');
    const toggle = document.getElementById('authToggle');
    const guest = document.getElementById('authGuest');
    const status = document.getElementById('authMessage');

    let signUp = false;

    toggle.addEventListener('click', () => {
      signUp = !signUp;
      submit.textContent = signUp ? 'Cadastrar' : 'Entrar';
      toggle.textContent = signUp ? 'Já tenho uma conta' : 'Criar conta';
      password.autocomplete = signUp ? 'new-password' : 'current-password';
      message(status, '');
    });

    guest.addEventListener('click', () => {
      screen.remove();
      document.dispatchEvent(new CustomEvent('cyber:guest-mode'));
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      submit.disabled = true;
      submit.textContent = signUp ? 'Cadastrando...' : 'Entrando...';
      message(status, '');

      try {
        const result = signUp
          ? await supabase.auth.signUp({ email: email.value.trim(), password: password.value })
          : await supabase.auth.signInWithPassword({ email: email.value.trim(), password: password.value });

        if (result.error) {
          message(status, result.error.message, true);
          return;
        }

        if (signUp && !result.data.session) {
          message(status, 'Cadastro realizado! Confirme seu e-mail para entrar.');
          return;
        }

        screen.remove();
        document.dispatchEvent(new CustomEvent('cyber:authenticated'));
      } catch (error) {
        console.error('[Cyber Detective Auth]', error);
        message(status, 'Não foi possível concluir a operação.', true);
      } finally {
        submit.disabled = false;
        submit.textContent = signUp ? 'Cadastrar' : 'Entrar';
      }
    });
  }

  async function initAuth() {
    if (!window.supabase) return;

    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const { data } = await supabase.auth.getSession();

    if (!data.session) showAuthScreen(supabase);
  }

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  script.onload = initAuth;
  document.head.appendChild(script);
})();
