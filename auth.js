/* Cyber Detective - Tela inicial + login/cadastro Supabase */
(() => {
  'use strict';

  const SUPABASE_URL = 'https://joorehnfqrhhiwenqemy.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_xXjb1TlaAQSLVFyNsTUjJw_knKKlOcF';

  const styleText = `
    #cyberWelcome {
      position: fixed; inset: 0; z-index: 99999; overflow-y: auto;
      background: radial-gradient(circle at 50% 0%, #12304d 0%, #050b14 72%);
      color: #eaf4ff; padding: 24px; box-sizing: border-box;
      font-family: inherit;
    }
    #cyberWelcome, #cyberWelcome * { box-sizing: border-box; }
    #cyberWelcome .welcome-wrap {
      width: min(760px, 100%); min-height: 100%; margin: auto;
      display: grid; place-items: center;
    }
    #cyberWelcome .welcome-card {
      width: 100%; padding: clamp(22px, 5vw, 52px);
      border: 1px solid #21476a; border-radius: 20px;
      background: rgba(5, 15, 28, .97);
      box-shadow: 0 0 70px rgba(0, 200, 255, .07);
      text-align: center;
    }
    #cyberWelcome .kicker {
      color: #25d7ff; letter-spacing: 2px; font-size: 11px;
      font-weight: 800; line-height: 1.6;
    }
    #cyberWelcome h1 {
      font-size: clamp(36px, 8vw, 74px); letter-spacing: 4px;
      line-height: 1.05; margin: 18px 0 10px;
    }
    #cyberWelcome h1 span { color: #19c9ff; }
    #cyberWelcome .subtitle {
      color: #c4d8eb; font-size: clamp(15px, 3vw, 21px);
      margin: 0 0 22px;
    }
    #cyberWelcome .story {
      color: #a9bdd1; font-size: 14px; line-height: 1.75;
      max-width: 620px; margin: 0 auto 28px;
    }
    #cyberWelcome .auth-form {
      display: grid; gap: 11px; max-width: 440px; margin: auto;
      text-align: left;
    }
    #cyberWelcome label { color: #91aac2; font-size: 13px; }
    #cyberWelcome input {
      width: 100%; padding: 14px; border-radius: 10px;
      border: 1px solid #294d6b; background: #071321;
      color: #fff; font-size: 16px; outline: none;
    }
    #cyberWelcome input:focus { border-color: #25d7ff; }
    #cyberWelcome button {
      width: 100%; padding: 14px; border-radius: 10px;
      border: 1px solid #19c9ff; background: #19c9ff;
      color: #03101b; font-size: 14px; font-weight: 800; cursor: pointer;
    }
    #cyberWelcome button.secondary {
      background: transparent; color: #d6e7f7; border-color: #36536d;
    }
    #cyberWelcome button.guest {
      background: transparent; color: #91aac2; border-color: #36536d;
      font-weight: 500;
    }
    #cyberWelcome button:disabled { opacity: .6; cursor: wait; }
    #cyberWelcome .switch {
      text-align: center; color: #91aac2; font-size: 13px; margin-top: 5px;
    }
    #cyberWelcome .switch button {
      width: auto; padding: 0; border: 0; background: transparent;
      color: #25d7ff; font-size: 13px;
    }
    #cyberWelcome .message {
      min-height: 22px; text-align: center; font-size: 13px;
      color: #25d7ff; line-height: 1.5;
    }
    #cyberWelcome .message.error { color: #ff7777; }
  `;

  function injectStyles() {
    if (document.getElementById('cyberWelcomeStyles')) return;
    const style = document.createElement('style');
    style.id = 'cyberWelcomeStyles';
    style.textContent = styleText;
    document.head.appendChild(style);
  }

  function closeWelcome() {
    const screen = document.getElementById('cyberWelcome');
    if (screen) screen.remove();
    const style = document.getElementById('cyberWelcomeStyles');
    if (style) style.remove();
    document.dispatchEvent(new CustomEvent('cyber:auth-ready'));
  }

  function showWelcome(supabase) {
    if (document.getElementById('cyberWelcome')) return;

    injectStyles();

    const screen = document.createElement('div');
    screen.id = 'cyberWelcome';
    screen.innerHTML = `
      <div class="welcome-wrap">
        <section class="welcome-card" aria-label="Tela inicial do Cyber Detective">
          <div class="kicker">FORGE STUDIOS // INVESTIGATION DIVISION</div>
          <h1>CYBER <span>DETECTIVE</span></h1>
          <p class="subtitle">A verdade está escondida nos dados.</p>
          <p class="story">
            Uma sequência de crimes digitais ameaça a cidade. Rastros foram apagados,
            identidades foram forjadas e cada pista pode mudar o rumo da investigação.
            Assuma o papel de detetive cibernético, conecte evidências, interrogue
            suspeitos e descubra quem está por trás dos ataques.
          </p>

          <form class="auth-form" id="cyberAuthForm">
            <label for="cyberEmail">E-mail</label>
            <input id="cyberEmail" type="email" autocomplete="email"
                   placeholder="seu@email.com" required>

            <label for="cyberPassword">Senha</label>
            <input id="cyberPassword" type="password" minlength="6"
                   autocomplete="current-password" placeholder="Mínimo de 6 caracteres" required>

            <button id="cyberSubmit" type="submit">Entrar e iniciar investigação</button>
            <button id="cyberMode" class="secondary" type="button">Criar uma conta</button>
            <button id="cyberGuest" class="guest" type="button">Jogar sem conta</button>
            <div id="cyberMessage" class="message" role="status" aria-live="polite"></div>
          </form>
        </section>
      </div>
    `;
    document.body.prepend(screen);

    const form = screen.querySelector('#cyberAuthForm');
    const email = screen.querySelector('#cyberEmail');
    const password = screen.querySelector('#cyberPassword');
    const submit = screen.querySelector('#cyberSubmit');
    const mode = screen.querySelector('#cyberMode');
    const guest = screen.querySelector('#cyberGuest');
    const message = screen.querySelector('#cyberMessage');
    let isSignup = false;

    const setMessage = (text, error = false) => {
      message.textContent = text;
      message.classList.toggle('error', error);
    };

    mode.addEventListener('click', () => {
      isSignup = !isSignup;
      submit.textContent = isSignup ? 'Criar conta e iniciar' : 'Entrar e iniciar investigação';
      mode.textContent = isSignup ? 'Já tenho uma conta' : 'Criar uma conta';
      password.autocomplete = isSignup ? 'new-password' : 'current-password';
      setMessage('');
    });

    guest.addEventListener('click', closeWelcome);

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const userEmail = email.value.trim();
      const userPassword = password.value;

      if (!userEmail || userPassword.length < 6) {
        setMessage('Informe um e-mail válido e uma senha com pelo menos 6 caracteres.', true);
        return;
      }

      submit.disabled = true;
      setMessage('Processando...');

      try {
        const response = isSignup
          ? await supabase.auth.signUp({ email: userEmail, password: userPassword })
          : await supabase.auth.signInWithPassword({ email: userEmail, password: userPassword });

        if (response.error) {
          setMessage(response.error.message, true);
          return;
        }

        if (isSignup && !response.data.session) {
          setMessage('Conta criada! Confirme seu e-mail antes de entrar.');
          return;
        }

        closeWelcome();
      } catch (error) {
        console.error('[Cyber Detective Auth]', error);
        setMessage('Não foi possível concluir a operação. Tente novamente.', true);
      } finally {
        submit.disabled = false;
        submit.textContent = isSignup ? 'Criar conta e iniciar' : 'Entrar e iniciar investigação';
      }
    });
  }

  function loadSupabase() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = async () => {
      try {
        const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const { data, error } = await supabase.auth.getSession();
        if (error) console.error('[Cyber Detective Auth] Sessão:', error);
        if (!data || !data.session) showWelcome(supabase);
      } catch (error) {
        console.error('[Cyber Detective Auth] Inicialização:', error);
        showWelcome(null);
      }
    };
    script.onerror = () => {
      console.error('[Cyber Detective Auth] Não foi possível carregar o Supabase.');
      showWelcome(null);
    };
    document.head.appendChild(script);
  }

  // A tela continua disponível mesmo se o CDN do Supabase falhar.
  loadSupabase();
})();
