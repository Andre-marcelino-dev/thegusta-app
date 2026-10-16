# TheGusta / Confeitaria DaVilla — onde paramos e como continuar

Última atualização: 16/10/2026.

Este documento resume o que foi feito no app e no site, como rodar tudo em outro computador e o que ainda falta. Não tem senhas: elas ficam só nos arquivos `.env` (que não vão para o Git).

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
cd ~/confeitaria-davilla/src && /opt/plesk/php/8.4/bin/php artisan optimize:clear
```

- Quando houver **migration nova**, rode também `/opt/plesk/php/8.4/bin/php artisan migrate --force`.
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
| **Sacola** | itens do cliente logado (`tbl_sacola`); +/−/excluir gravam no banco; endereço e telefone reais; cupom validado na API |
| **Pagamento** | itens reais da sacola; entrega/retirada; forma de pagamento; **Confirma Pedido grava o pedido**, esvazia a sacola, abre o WhatsApp da loja com o número do pedido e mostra os detalhes |
| **Meus pedidos / Detalhes do pedido** | do banco; etapas pelo status; **Pedir novamente** coloca os itens na sacola (preços atuais) |
| **Editar perfil** | carrega e salva nome, telefone e nascimento; e-mail e CPF só leitura; **Alterar foto** (expo-image-picker) |
| **Endereços** | lista, adicionar, editar (com número e complemento), excluir, "usar este endereço"; **busca por CEP (ViaCEP)** |
| Seta de voltar | não dá mais erro `GO_BACK` quando a tela é aberta direto |

Arquivos de apoio em `src/utils/`: `auth.ts`, `sacola.ts`, `pedidos.ts`, `enderecos.ts`, `cupons.ts`, `avisar.ts`.

### Site e API (confeitaria-davilla)

**Rotas novas da API** (todas exigem login com token Sanctum, exceto a do login):

| Rota | Para quê |
|---|---|
| `GET/POST /sacola`, `PUT/PATCH/DELETE /sacola/{id}` | sacola do cliente |
| `GET /pedidos`, `GET /pedidos/{id}`, `POST /pedidos` | pedidos (o POST cria a venda a partir da sacola, com preços e desconto calculados no servidor) |
| `POST /cliente/foto` | foto de perfil |
| `GET/POST /enderecos`, `GET/PUT/PATCH/DELETE /enderecos/{id}`, `PATCH /enderecos/{id}/principal` | endereços de entrega |
| `GET /cupons/{codigo}` | valida cupom |
| `GET /configuracoes` (pública) | taxa e previsão de entrega |

**Painel admin:**

| Tela | O que faz |
|---|---|
| **Dashboard** | pedidos hoje, em preparo, faturamento do mês, mensagens novas, gráfico dos 6 meses, últimos pedidos |
| **Comercial → Pedidos** | lista, filtro, detalhes (itens, endereço, observação) e troca de status |
| **Sistema → Configurações da loja** | taxa de entrega e previsão de entrega |
| **Comercial → Cupons** | criar, editar, ativar/desativar e excluir (só se nunca usado); mostra situação e usos |
| **Conteúdo do Site → Banners** | criar, editar, ativar/desativar e excluir, com miniatura |
| **Conteúdo do Site → Mensagens de contato** | lista, leitura, status; responder por WhatsApp ou e-mail |
| Menu lateral | removido o menu antigo duplicado do modelo, que escondia o menu certo |

**Site público:** a página **Faça seu pedido** (`/pedidos`) explica como pedir (app, WhatsApp, encomendas) e mostra os produtos reais com o botão "Pedir pelo WhatsApp"; o número do WhatsApp e o link do app ficam em `config/services.php` (`loja`). O carrinho de exemplo do topo do site foi removido. Os **dados da loja** (endereço, telefone/WhatsApp, e-mail) ficam em `config/services.php` (`loja`) e aparecem na página Contato, no rodapé e no mapa. Os formulários da página Contato e do rodapé gravam em `tbl_contato` e **mandam um aviso por e-mail** para a loja.

**Documentação da API:** página `/api/documentacao` (arquivo `resources/views/api/documentacao.blade.php`) com todas as rotas. Ao criar uma rota nova, acrescente-a na lista `$grupos` no topo desse arquivo.

**Banco:** tabela nova `tbl_sacola`; `tbl_vendas.id_usuario` passou a aceitar vazio (pedido do app não tem funcionário).

---

## 7. Decisões importantes

- **Cupom = porcentagem** sobre os **produtos** (a entrega não tem desconto). `valor_desconto_cupom = 10` significa 10%.
- **Status de pedido:** `EM ANDAMENTO` (Em preparo) → `SAIU ENTREGA` (A caminho) → `FINALIZADA` (Entregue), ou `CANCELADA`. O app usa `etapaDoStatus` em `src/utils/pedidos.ts`.
- **Datas** de pedido são gravadas no **horário de Brasília** (o Laravel está em UTC).
- **Taxa e previsão de entrega** são editadas no painel em **Sistema → Configurações da loja** (tabela `tbl_configuracoes`, rota `GET /api/v1/configuracoes`). O pedido cobra a taxa configurada; o app lê pelo hook `useConfiguracoes` (`src/utils/loja.ts`).
- **E-mail do site:** sai pela conta do Plesk `contato_confeitaria@ctrlaltdev.tipi5.smpsistema.com.br` (SMTPS, porta 465). O destino dos avisos fica em `MAIL_CONTATO_DESTINO` no `.env` do servidor. **Nunca colocar e-mail pessoal ou senha no código**, porque os repositórios são públicos.
- Banners: site e app mostram os ativos pela ordem do campo "Ordem". Imagens ideais: 1920×800 px, até 2 MB.

---

## 8. O que falta (em ordem sugerida)

1. **Telas do admin que faltam:** Kits, Estoque (matérias-primas, movimentações, fornecedores) e Meu Perfil.
2. **Segurança do GitHub:** os backups `.sql` saíram do repositório, mas **continuam no histórico** de commits, e o repositório é público. Fazer os 3 passos juntos:
   1. GitHub → `confeitaria-davilla` → Settings → Danger Zone → **Change to private**.
   2. Criar um token fine-grained (`servidor-plesk`) só para esse repositório, com **Contents: Read-only**.
   3. No servidor: `cd ~/confeitaria-davilla && git config credential.helper store && git pull` (usuário `Andre-marcelino-dev`, senha = o token).

   Sem os passos 2 e 3, o `git pull` do servidor para de funcionar depois do passo 1.
3. **Opcionais:**
   - "Receber novidades" no Editar perfil (não há coluna no banco);
   - limitar o telefone do perfil a 14 caracteres (limite da coluna);
   - os 4 banners inativos apontam para imagens que não existem (reenviar ou excluir);
   - apagar `~/confeitaria-davilla-antigo` no servidor (cópia antiga, tem um `.env` com senhas);
   - apagar `~/confeitaria-davilla/src/.env.save` no servidor, se ainda existir.

---

## 9. Últimos commits

- **App:** `5f380e4` — Taxa e previsão de entrega vindas do painel.
- **Site:** `0345584` — Taxa e previsão de entrega configuráveis no painel.

Para ver tudo: `git log --oneline` em cada projeto.
