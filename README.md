# ShopLive - Teste de Portabilidade 🚀

Este projeto é uma simulação de uma plataforma moderna de **Live Commerce** desenvolvida como objeto de estudo para a disciplina de Teste de Software da **UNIP**.

O objetivo principal deste repositório é demonstrar a aplicação de **Testes de Portabilidade** (um tipo de teste não-funcional) em um cenário crítico: uma transmissão de Black Friday com 50.000 usuários simultâneos acessando de diferentes dispositivos e sistemas operacionais.

## 🎯 O Cenário

A **ShopLive** simula:
- Catálogo de produtos (focado no ecossistema Apple e no Notebook Neo).
- Chat ao vivo frenético com comentários simulados em tempo real.
- Streaming de vídeo de vendas otimizado.
- Interface rica (Carrinho, Vitrine, Filtros).

## 🧪 O Teste de Portabilidade

A portabilidade garante que a aplicação mantenha estabilidade e experiência consistente para o usuário, independentemente do ambiente. Nós aplicamos este teste em duas frentes práticas:

### 1. Portabilidade de Ambiente de Execução (via Docker)
Garantimos que o projeto não sofre da famosa síndrome do *"na minha máquina funciona"*. Todo o ecossistema e as dependências foram conteinerizados utilizando **Docker** e **Nginx**. 
Seja em um servidor de produção Linux, no Windows de um desenvolvedor, ou no macOS, a plataforma rodará de forma idêntica e previsível, sem conflito de dependências.

### 2. Portabilidade de Dispositivos e Resoluções (Web vs Mobile)
Nós construímos duas versões da mesma aplicação para demonstrar o contraste:
* **Versão A (`/version-a/`):** O layout não possui tratamento de portabilidade. Em dispositivos móveis, os botões de compra ficam ocultos, o player de vídeo causa *overflow* e o chat torna-se inutilizável. (Isto simula o risco real de perda de vendas).
* **Versão B (`/version-b/`):** Desenvolvida com práticas modernas e *Tailwind CSS*. A interface é responsiva, o vídeo ajusta sua proporção dinamicamente e os elementos de tela adaptam sua densidade baseada na *viewport*.

## 🛠️ Como Executar o Projeto

Você não precisa instalar Node.js, NPM ou configurar servidores. A única dependência é ter o [Docker Desktop](https://www.docker.com/products/docker-desktop/) rodando na máquina.

1. Clone este repositório (ou extraia os arquivos):
   ```bash
   git clone https://github.com/SEU_USUARIO/projeto-portabilidade-shoplive.git
   cd projeto-portabilidade-shoplive
   ```

2. Construa a imagem e suba os containers:
   ```bash
   docker compose up --build
   ```

3. Acesse no seu navegador:
   - [http://localhost:8080/version-a/](http://localhost:8080/version-a/) (Cenário de Falha)
   - [http://localhost:8080/version-b/](http://localhost:8080/version-b/) (Cenário de Sucesso)

## 👥 Desenvolvido por
- Gabriel (Teste de Portabilidade)
- *[Adicione os membros do seu grupo aqui]*
