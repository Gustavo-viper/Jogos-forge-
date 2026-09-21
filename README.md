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
