# TheGusta / Confeitaria DaVilla — onde paramos e como continuar

Última atualização: 21/10/2026.

Este documento resume o que foi feito no app e no site, como rodar tudo em outro computador e o que ainda falta. Não tem senhas: elas ficam só nos arquivos `.env` (que não vão para o Git).

---

## 0. Onde paramos (21/10/2026)

- **Tudo em dia (21/10):** app (`194aed4`, publicado em `thegust-app.expo.app`), site (`02610cb`), GitHub e servidor iguais.
- **Zonas de entrega (novo):** a taxa de entrega agora depende da zona do endereço do cliente. Cadastro no painel em **Sistema → Zonas de entrega** (com a caixa "Testar um CEP"). A página **Região** do site, o pedido da API e a Sacola/Pagamento do app usam a mesma regra. Detalhes no item 7.
- **Falta você fazer no painel:** trocar os valores de exemplo das 3 zonas (Grátis / R$ 8 / R$ 15; 0–3 / 3–6 / 6–10 km; bairros) pelos reais da loja. Testar no app com um cliente logado trocando o endereço.
- **Outras mudanças de 21/10 no site:** tela de login do painel sem cortar o botão Entrar; topo do painel com mensagens (Fale conosco) e notificações (pedidos em preparo, depoimentos pendentes, matéria-prima sem estoque) reais; novo visual das páginas do site; menu Região com atalhos para cada parte da página; editar cliente no painel voltou a salvar (inclusive a senha).

### Antes (20/10/2026)

- **Tudo em dia (20/10):** app (`767a016`), site (`1208d0a` — "design modificado"), GitHub e servidor iguais.
- **Não edite arquivos direto no servidor.** Em 20/10 o `git pull` travou porque 16 telas tinham sido alteradas lá. Se acontecer: `git diff origin/main --stat -- src/resources/views` mostra o que é diferente; se não houver nada importante, `git checkout -- src/resources/views` e depois o `git pull`.
- **Falta:** deixar o repositório do site privado (item 8); no painel, os banners inativos sem imagem e os 2 kits; opcional: botão "Instalar" do app na web.

### Antes (18/10/2026)

- **Pedidos cancelados** aparecem no app em **Meus pedidos → aba "Histórico"** (antes chamada "Entregues"), com borda e etiqueta vermelhas "Cancelado". Cada cliente vê só os próprios pedidos.
- **Tradução do navegador (resolvido em 18/10):** o Chrome traduzia o app e deixava textos errados (preço "R$ 0,00" no produto, "Home" virando "Lar"). O arquivo `src/app/+html.tsx` marca o app como pt-BR e "não traduzir". Já publicado.
- **Depois de `git clone` ou `git pull` do app, rode `npm install`.** A pasta `node_modules` não vai para o Git; sem ela o login e o pagamento não funcionam (faltavam `expo-secure-store` e `expo-image-picker`).
- **Tudo em dia (18/10):** app, site, GitHub e servidor iguais. Servidor atualizado para o `982c046` com o comando do item 4 (com a linha do `rm`).
- **Terminal do Plesk cai às vezes** ("Conexão Quebrada"): cole os comandos juntos numa linha só, com `&&`.
- **No painel, falta você fazer:** excluir ou reenviar os 4 banners inativos sem imagem; nos 2 kits, trocar o WhatsApp de exemplo (`5511999999999`) e a foto do "Kit Bolo cenoura".

---

## 1. Os dois projetos

| Projeto | O que é | Repositório |
|---|---|---|
| **thegust-app** (este) | App do cliente em Expo / React Native (Expo SDK 57) | `github.com/Andre-marcelino-dev/thegusta-app` |
| **confeitaria-davilla** | Site + painel admin + API em Laravel 13 (PHP 8.3+) | `github.com/Andre-marcelino-dev/confeitaria-davilla` |

O app conversa com o site pela API (`/api/v1/...`). O endereço do servidor fica num lugar só: `src/config/api.ts` (`SERVIDOR`). Todas as telas usam `API_BASE_URL` de `src/utils/categorias.ts`, que vem desse `SERVIDOR`.

---

## 2. Endereços

| O quê | Endereço |
|---|---|
| Site da confeitaria | `https://ctrlaltdev.tipi5.smpsistema.com.br/confeitaria/` |
| Painel admin | `https://ctrlaltdev.tipi5.smpsistema.com.br/confeitaria/admin` |
| API (o app usa) | `https://ctrlaltdev.tipi5.smpsistema.com.br/confeitaria/api/v1/...` |
| **Documentação da API** (pedida pelo professor) | `https://ctrlaltdev.tipi5.smpsistema.com.br/confeitaria/api/documentacao` |
| App publicado na web | `https://thegust-app.expo.app` (endereço fixo de produção) |

- Os endereços antigos `thegust-app--xxxx.expo.app` são **prévias paradas no tempo**. Não usar.
- O servidor `xyzcode.tipi5.smpsistema.com.br` é de **teste, de terceiros**. Não é o nosso.

---

## 3. Configurar o outro computador

### App (o mínimo para continuar)

```bash
git clone https://github.com/Andre-marcelino-dev/thegusta-app.git
cd thegusta-app
npm install
npx expo start -c
```

- Aperte `w` para abrir no navegador (`http://localhost:8081`) ou leia o QR Code com o **Expo Go**.
- O app já aponta para o servidor de produção (`src/config/api.ts`), então funciona sem rodar o backend local.
- **Sempre teste mudanças pela versão local** (`npx expo start -c`). O `thegust-app.expo.app` só muda quando é publicado de novo (item 5).

### Backend local (opcional, para testar a API antes de subir)

No PC atual ele roda no **WSL + Docker** (pasta `~/dev/senac/confeitaria-davilla`, `docker-compose.yml` na raiz, site em `http://localhost:8081`).

```bash
git clone https://github.com/Andre-marcelino-dev/confeitaria-davilla.git
cd confeitaria-davilla
docker compose up -d
```

- Crie o `src/.env` a partir do `src/.env.example` (no Docker: `DB_HOST=mysql`) e rode `php artisan key:generate` dentro do container PHP.
- **Banco:** os backups `.sql` **não estão mais no Git** (têm dados de clientes). Para ter os dados, exporte um dump do banco `confeitaria` pelo Plesk (Bancos de dados → Exportar dump) e importe no MySQL do Docker.
- O Docker do backend usa a porta **8081**, a mesma do Expo. Se rodar os dois juntos, inicie o Expo em outra porta: `npx expo start -c --port 8082`.

---

## 4. Servidor (Plesk) — como atualizar

- Acesso: painel Plesk → Websites e Domínios → `ctrlaltdev.tipi5.smpsistema.com.br` → **Terminal SSH**.
- O projeto fica em **`~/confeitaria-davilla`**, **fora** da pasta pública.
- `~/ctrlaltdev.tipi5.smpsistema.com.br/confeitaria` é um **atalho (symlink)** para `~/confeitaria-davilla/src/public`. É por isso que o site fica em `/confeitaria`.
- A raiz do domínio é outro site (Ctrl+Alt+Dev) e **não pode ser trocada**.
- O comando `php` do terminal é o PHP 7.2. Use sempre **`/opt/plesk/php/8.4/bin/php`**.
- Banco: MariaDB 10.11, banco `confeitaria`, usuário `confeitaria_user` (senha no `.env` do servidor).

**Depois de cada `git push` do site, rodar no servidor:**

```bash
cd ~/confeitaria-davilla && git pull
rm -f src/bootstrap/cache/packages.php src/bootstrap/cache/services.php
cd ~/confeitaria-davilla/src && /opt/plesk/php/8.4/bin/php artisan optimize:clear
```

- A linha do `rm` apaga a lista de pacotes guardada pelo Laravel (ele recria sozinho). Ela é necessária quando a pasta `vendor` muda no Git; sem ela o site pode sair do ar procurando um pacote que não existe mais. Pode rodar sempre.

- Quando houver **migration nova**, rode também `/opt/plesk/php/8.4/bin/php artisan migrate --force`. (Em 21/10 a página Região deu erro 500 até rodar a migration das zonas de entrega.)
- Quando mudar a regra das zonas de entrega, rode também `/opt/plesk/php/8.4/bin/php artisan cache:clear`: as consultas de CEP ficam guardadas em cache (até 30 dias; "não encontrado" por 1 dia).
- **Nunca** rodar `migrate:fresh`, `migrate:refresh`, `migrate:reset` nem `db:wipe` no servidor: apagam os dados.
- **Nunca** rodar `git clone` dentro da pasta do domínio. Isso já aconteceu e deixou os backups do banco abertos na internet. Para atualizar, é só `git pull`.
- Imagens enviadas pelo painel (banners, fotos de cliente e de produto) ficam só no servidor e aparecem como `??` ou `D` no `git status`. É normal; não precisam ir para o Git.

---

## 5. Publicar o app na web (`thegust-app.expo.app`)

No computador onde a conta Expo (`marcelino77`) estiver logada (`npx eas-cli login`):

```bash
npx expo export -p web
npx eas-cli deploy --prod
```

O plano gratuito tem limite de acessos. Se aparecer *"This deployment is receiving too many requests"*, é só esperar alguns minutos.

---

## 6. O que foi feito

### App (thegust-app)

| Tela / função | Situação |
|---|---|
| Login, Home, Cardápio, banners, categorias | do banco (já existia) |
| Detalhes do produto | do banco; sem produto falso enquanto carrega; quantidade começa em 1; resumo = tamanho + unidade |
| **Sacola** | itens do cliente logado (`tbl_sacola`); +/−/excluir gravam no banco; endereço e telefone reais; cupom validado na API; **taxa e previsão da zona de entrega do endereço** (`GET /entrega/minha`); aviso se o endereço está fora da área |
| **Pagamento** | itens reais da sacola; entrega/retirada; forma de pagamento; **Confirma Pedido grava o pedido**, esvazia a sacola, abre o WhatsApp da loja com o número do pedido e mostra os detalhes; taxa da zona; **fora da área só permite Retirada** |
| **Meus pedidos / Detalhes do pedido** | do banco; etapas pelo status; **Pedir novamente** coloca os itens na sacola (preços atuais); abas "Em preparo" e "Histórico" (entregues e cancelados) |
| **Editar perfil** | carrega e salva nome, telefone e nascimento; e-mail e CPF só leitura; **Alterar foto** com janela para tirar foto ou escolher da galeria (expo-image-picker); "Receber novidades" grava SIM/NAO |
| **Alterar senha** | confere os campos e troca a senha pela API (`PUT /cliente/senha`, pede a senha atual) |
| **Endereços** | lista, adicionar, editar (com número e complemento), excluir, "usar este endereço"; **busca por CEP (ViaCEP)** |
| **Configurações** | cartão do topo com nome, e-mail e foto reais; **Sair da conta** pede confirmação e faz logout de verdade |
| **Fale conosco** | envia pela API (`POST /contato`) para Mensagens de contato do painel + aviso por e-mail; WhatsApp e e-mail reais da loja (vêm de `GET /configuracoes`) |
| **Depoimentos** | envia nota e texto pela API; lista os do cliente com a situação (Em análise / Publicado / Não publicado) |
| Seta de voltar | não dá mais erro `GO_BACK` quando a tela é aberta direto |

Arquivos de apoio em `src/utils/`: `auth.ts`, `sacola.ts`, `pedidos.ts`, `enderecos.ts`, `cupons.ts`, `avisar.ts`, `entrega.ts` (taxa da zona do cliente).

### Site e API (confeitaria-davilla)

**Rotas novas da API** (todas exigem login com token Sanctum, exceto a do login):

| Rota | Para quê |
|---|---|
| `GET/POST /sacola`, `PUT/PATCH/DELETE /sacola/{id}` | sacola do cliente |
| `GET /pedidos`, `GET /pedidos/{id}`, `POST /pedidos` | pedidos (o POST cria a venda a partir da sacola, com preços e desconto calculados no servidor) |
| `POST /cliente/foto` | foto de perfil |
| `GET/POST /enderecos`, `GET/PUT/PATCH/DELETE /enderecos/{id}`, `PATCH /enderecos/{id}/principal` | endereços de entrega |
| `GET /cupons/{codigo}` | valida cupom |
| `GET /configuracoes` (pública) | taxa **padrão** e previsão de entrega, WhatsApp e e-mail da loja |
| `GET /entrega/zonas` e `GET /entrega/consultar?cep=` (públicas) | zonas de entrega com os bairros; em qual zona um CEP cai (máx. 20 consultas por minuto) |
| `GET /entrega/minha` | taxa e previsão do cliente logado, pela zona do endereço principal (é o valor que o `POST /pedidos` cobra) |
| `POST /contato` | Fale conosco do app (máx. 5 por minuto) |
| `GET/POST /depoimentos` | depoimentos do cliente (entram como PENDENTE) |

**Painel admin:**

| Tela | O que faz |
|---|---|
| **Dashboard** | pedidos hoje, em preparo, faturamento do mês, mensagens novas, gráfico dos 6 meses, últimos pedidos |
| **Comercial → Pedidos** | lista, filtro, detalhes (itens, endereço, observação, subtotal + entrega + desconto do cupom + total) e troca de status na lista ou na janela de detalhes |
| **Sistema → Configurações da loja** | taxa de entrega **padrão** (usada só quando não dá para saber a zona), previsão de entrega e localização da loja (latitude/longitude) |
| **Sistema → Zonas de entrega** | criar, editar, ativar/desativar e excluir zonas (km de/até, taxa, prazo, cor, bairros um por linha com faixa de CEP opcional); caixa **Testar um CEP** |
| Topo do painel | mensagens novas do Fale conosco e notificações (pedidos em preparo, depoimentos pendentes, matéria-prima sem estoque), com link para cada tela |
| **Catálogo → Kits** | criar, editar e excluir os kits da Home (produtos do kit, preço promocional, etiqueta, foto) |
| **Sistema → Meu Perfil** | o usuário logado edita nome, e-mail, foto e senha; o topo do painel mostra a foto e o cargo reais |
| **Estoque → Fornecedores / Matérias-primas / Movimentações** | fornecedores (ativar/desativar); matérias-primas com estoque atual; entradas e saídas que atualizam a quantidade e não deixam ficar negativa |
| **Comercial → Novidades e promoções** | clientes ativos que marcaram "Receber novidades" no app; WhatsApp/e-mail de cada um, copiar todos os e-mails (usar no Cco) e baixar planilha |
| **Comercial → Cupons** | criar, editar, ativar/desativar e excluir (só se nunca usado); mostra situação e usos |
| **Conteúdo do Site → Banners** | criar, editar, ativar/desativar e excluir, com miniatura |
| **Conteúdo do Site → Depoimentos** | aprovar (Publicado), recusar ou excluir os depoimentos do app; filtro por situação |
| **Conteúdo do Site → Mensagens de contato** | lista, leitura, status; responder por WhatsApp ou e-mail |
| Menu lateral | removido o menu antigo duplicado do modelo, que escondia o menu certo |

**Site público:** a seção de depoimentos da Home e do Sobre mostra os depoimentos **Publicados** no painel (até 10; foto ou inicial, estrelas, nome curto).  a página **Faça seu pedido** (`/pedidos`) explica como pedir (app, WhatsApp, encomendas) e mostra os produtos reais com o botão "Pedir pelo WhatsApp"; o número do WhatsApp e o link do app ficam em `config/services.php` (`loja`). O carrinho de exemplo do topo do site foi removido. Os **dados da loja** (endereço, telefone/WhatsApp, e-mail) ficam em `config/services.php` (`loja`) e aparecem na página Contato, no rodapé e no mapa. Os formulários da página Contato e do rodapé gravam em `tbl_contato` e **mandam um aviso por e-mail** para a loja.

**Página Região (`/regiao`, "Onde entregamos"):** consulta de CEP feita no servidor, radar e cards das zonas lidos do banco, retirada na loja, WhatsApp e perguntas frequentes. O menu Região do topo tem atalhos para cada parte.

**Documentação da API:** página `/api/documentacao` (arquivo `resources/views/api/documentacao.blade.php`) com todas as rotas. Ao criar uma rota nova, acrescente-a na lista `$grupos` no topo desse arquivo.

**Banco:** tabela nova `tbl_sacola`; coluna nova `tbl_clientes.novidades_cliente` (SIM/NAO, padrão NAO) para o "Receber novidades" do perfil; `tbl_vendas.id_usuario` passou a aceitar vazio (pedido do app não tem funcionário); tabelas novas `tbl_zonas_entrega` e `tbl_bairros_entrega` (21/10).

---

## 7. Decisões importantes

- **Cupom = porcentagem** sobre os **produtos** (a entrega não tem desconto). `valor_desconto_cupom = 10` significa 10%.
- **Status de pedido:** `EM ANDAMENTO` (Em preparo) → `SAIU ENTREGA` (A caminho) → `FINALIZADA` (Entregue), ou `CANCELADA`. O app usa `etapaDoStatus` em `src/utils/pedidos.ts`.
- **Datas** de pedido são gravadas no **horário de Brasília** (o Laravel está em UTC).
- **Taxa de entrega = zona do endereço** (desde 21/10). O servidor (`App\Services\AreaEntrega`) acha a zona de um CEP nesta ordem: 1) faixa de CEP cadastrada em um bairro; 2) nome do bairro dos Correios igual a um bairro cadastrado; 3) distância **em linha reta** até a loja comparada com o km das zonas (endereço pelo ViaCEP, coordenadas pelo OpenStreetMap). Se não der para localizar o CEP, vale a taxa **padrão** de Configurações da loja e o pedido não é recusado; se o endereço estiver fora de todas as zonas, o pedido com entrega é recusado. O app lê a taxa em `GET /entrega/minha` (`src/utils/entrega.ts`) e usa `useConfiguracoes` só enquanto carrega.
- **Mapa:** a BrasilAPI devolve o centro de São Paulo para quase todo CEP, por isso não é usada. O resultado do OpenStreetMap só é aceito se tiver o nome da rua ou do bairro procurado (e, na busca só pela rua, o mesmo começo de CEP). Bairros que o mapa não conhece (ex.: Parque Paulistano): cadastrar o nome na zona certa.
- **E-mail do site:** sai pela conta do Plesk `contato_confeitaria@ctrlaltdev.tipi5.smpsistema.com.br` (SMTPS, porta 465). O destino dos avisos fica em `MAIL_CONTATO_DESTINO` no `.env` do servidor. **Nunca colocar e-mail pessoal ou senha no código**, porque os repositórios são públicos.
- Banners: site e app mostram os ativos pela ordem do campo "Ordem". Imagens ideais: 1920×800 px, até 2 MB.

---

## 8. O que falta (em ordem sugerida)

1. **Segurança do GitHub:** os backups `.sql` saíram do repositório, mas **continuam no histórico** de commits, e o repositório é público. Fazer os 3 passos juntos:
   1. GitHub → `confeitaria-davilla` → Settings → Danger Zone → **Change to private**.
   2. Criar um token fine-grained (`servidor-plesk`) só para esse repositório, com **Contents: Read-only**.
   3. No servidor: `cd ~/confeitaria-davilla && git config credential.helper store && git pull` (usuário `Andre-marcelino-dev`, senha = o token).

   Sem os passos 2 e 3, o `git pull` do servidor para de funcionar depois do passo 1.
2. **Opcionais:**
   - os 4 banners inativos apontam para imagens que não existem (reenviar ou excluir);

---

## 9. Últimos commits

- **App:** `194aed4` — Sacola e Pagamento com a taxa de entrega pela zona do endereço. Publicado em 21/10.
- **Site:** `02610cb` — zonas de entrega acham o CEP também buscando só pela rua (antes: `dad9b1e`, zonas de entrega no painel/site/API). Servidor atualizado em 21/10.

Para ver tudo: `git log --oneline` em cada projeto.
