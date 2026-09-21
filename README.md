# Cyber Detective — Supabase Integrado

## Configuração já incluída
- URL do projeto Supabase configurada no `app.js`.
- Chave publishable configurada no `app.js`.
- Tela de login e cadastro.
- Opção de jogar sem conta.
- Logout.
- Carregamento e salvamento do progresso na nuvem.
- Salvamento local como apoio.

## Ativar o banco
1. Abra o Supabase.
2. Entre no projeto Cyber Detective.
3. Vá em **SQL Editor**.
4. Cole e execute o arquivo `supabase_setup.sql`.
5. Em **Authentication > Providers > Email**, escolha se deseja exigir confirmação de e-mail.

## Executar
Extraia o ZIP e abra `index.html`.

Observação: a biblioteca do Supabase é carregada por CDN. Para usar login e sincronização, o navegador precisa de internet.


## Correções desta versão

- `index.html` agora carrega `auth.js`.
- A tela inicial do jogo apresenta a história e os botões de entrar, criar conta e jogar sem conta.
- O gatilho de criação de perfil do Supabase usa `SECURITY DEFINER` para evitar o erro `Database error saving new user`.
- Para corrigir o banco, execute novamente o conteúdo de `supabase_setup.sql` no SQL Editor do projeto Cyber Detective.
- Envie todos os arquivos da pasta para a raiz da branch `main` do GitHub e aguarde o deploy do Render.

## Atualizações desta versão

- Cada caso possui um briefing narrativo com o que aconteceu, como aconteceu e por quê.
- A investigação fica bloqueada até o jogador clicar em “Li a história — liberar investigação”.
- Foi adicionado áudio ambiente sintetizado pelo navegador e sons discretos de clique.
- O áudio é iniciado manualmente pelo botão “Som ambiente”, respeitando as restrições de autoplay dos navegadores.


## Tela inicial responsiva

Esta versão inclui uma tela inicial inspirada no layout cyber-noir de referência, com:
- navegação lateral e superior;
- apresentação do jogo;
- login e criação de conta com Supabase;
- opção de jogar sem conta;
- cartões de recursos;
- adaptação para celular, tablet e computador.

Arquivos principais: `auth.js` e `auth-styles.css`.


## Fluxo de confirmação de e-mail

- Após o cadastro, a interface volta automaticamente para o modo **Entrar**.
- O link de confirmação usa a URL atual do site como destino.
- Ao retornar da confirmação, a sessão temporária é encerrada e a tela informa que o e-mail foi confirmado.
- O jogador precisa fazer login manualmente para acessar o jogo.

**Supabase:** confirme também que a URL do site está cadastrada em Authentication → URL Configuration → Redirect URLs.


## Correção da tela de login

A tela inicial permanece igual ao layout de referência. O formulário de login/cadastro
agora abre em uma janela própria quando o jogador clica em **Entrar** ou **Criar conta**.
O fluxo de confirmação de e-mail continua direcionando o jogador de volta ao login.


## Correção: menu inicial e logout

- O menu inicial com **Entrar**, **Criar conta** e **Jogar sem conta** aparece sempre ao abrir o site.
- Uma sessão anterior não pula mais automaticamente o menu.
- O botão **Sair / Menu de login** foi adicionado à barra lateral do jogo.
- Ao sair, a sessão do Supabase é encerrada e a página retorna ao menu inicial.
