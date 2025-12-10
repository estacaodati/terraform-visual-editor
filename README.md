<div align="center">

# 🔷 Editor Visual de Terraform

**Um Designer Visual de Terraform Baseado em Nós, Inspirado no Quartus II**

[![GitHub Stars](https://img.shields.io/github/stars/estacaodati/terraform-visual-editor?style=social)](https://github.com/estacaodati/terraform-visual-editor)
[![Contribuir](https://img.shields.io/badge/Contribuir-Bem--vindo-brightgreen)](https://github.com/estacaodati/terraform-visual-editor)

[🌐 Visite Estação da TI](https://www.estacaodati.com.br/) | [⭐ Estrela no GitHub](https://github.com/estacaodati/terraform-visual-editor) | [🤝 Contribuir](https://github.com/estacaodati/terraform-visual-editor/blob/main/CONTRIBUTING.md)

</div>

---

## 📖 Visão Geral

**Terraform Visual Editor** é um editor visual baseado na web para infraestrutura como código Terraform, inspirado no design intuitivo do **Quartus II** (software de design FPGA da Intel). Esta ferramenta permite que você:

- 🎨 **Projete visualmente** infraestrutura Terraform usando uma tela baseada em nós
- 🔗 **Conecte módulos** graficamente para definir relacionamentos entre recursos
- ⚙️ **Configure propriedades** através de uma interface intuitiva
- 📝 **Gere código Terraform HCL** automaticamente a partir do seu design visual
- 📦 **Importe módulos locais** com detecção automática de entradas/saídas
- ☁️ **Suporte para AWS e Azure** com templates de módulos pré-construídos

Pense nisso como um ambiente de programação visual para infraestrutura - arraste, solte, conecte e gere código Terraform pronto para produção!

---

## ✨ Funcionalidades

- **🎯 Editor de Nós Visual**: Interface de arrastar e soltar alimentada por ReactFlow
- **🧩 Biblioteca de Módulos**: Módulos pré-construídos para recursos AWS e Azure
- **🔌 Conexões Inteligentes**: Conexões visuais entre entradas e saídas de módulos
- **📂 Importação de Módulos Locais**: Analise automaticamente módulos Terraform locais
- **🎨 UI Moderna**: Interface bonita e responsiva construída com React e TailwindCSS
- **⚡ Atualizações em Tempo Real**: Feedback visual instantâneo enquanto você projeta
- **💾 Geração de Código**: Exporte código Terraform HCL limpo e formatado

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **npm** ou **yarn**

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/estacaodati/terraform-visual-editor.git
   cd terraform-visual-editor
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra seu navegador**
   
   Navegue até `http://localhost:5173` (ou a porta mostrada no seu terminal)

### Construindo para Produção

```bash
npm run build
```

Os arquivos prontos para produção estarão no diretório `dist/`.

### Visualizar Build de Produção

```bash
npm run preview
```

---

## 🎮 Como Usar

1. **Inicie a Aplicação**: Execute `npm run dev` e abra o app no seu navegador
2. **Adicione Módulos**: Clique nos módulos da barra lateral para adicioná-los à tela
3. **Configure Propriedades**: Selecione um módulo e edite suas propriedades no painel de propriedades
4. **Conecte Módulos**: Arraste conexões entre saídas e entradas de módulos
5. **Importe Módulos Locais**: Use o botão "Importar Módulo Local" para carregar seus módulos Terraform personalizados
6. **Gere Código**: Exporte seu design visual como código Terraform HCL

---

## 📁 Estrutura do Projeto

```
terraform-visual-editor/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Layout.tsx       # Componente de layout principal
│   │   ├── Sidebar.tsx      # Barra lateral da biblioteca de módulos
│   │   ├── Canvas.tsx       # Tela do editor visual
│   │   └── LocalModuleImporter.tsx  # Importação de módulos locais
│   ├── store/               # Gerenciamento de estado (Zustand)
│   ├── types/               # Definições de tipos TypeScript
│   └── App.tsx              # Componente raiz da aplicação
├── modules/                 # Módulos Terraform de exemplo
│   ├── aws/                 # Templates de módulos AWS
│   └── azure/               # Templates de módulos Azure
├── public/                  # Recursos estáticos
└── package.json             # Dependências do projeto
```

---

## 🤝 Contribuindo

Recebemos contribuições da comunidade! Seja correção de bugs, novos recursos ou melhorias na documentação, sua ajuda é apreciada.

> [!IMPORTANT]
> **Desenvolvimento com IA**: Este projeto foi desenvolvido usando ferramentas de IA e incentivamos que todas as contribuições sejam feitas da mesma forma! Use a ferramenta de IA de sua escolha (Google Antigravity, GitHub Copilot, ChatGPT, Claude, etc.) para contribuir com este repositório.
> 
> **O objetivo é construir este software sem programação manual**, removendo barreiras para contribuir com repositórios públicos ou iniciar novos projetos. Não é necessário ser um programador experiente - se você tem uma ideia, use IA para implementá-la!

### Como Contribuir

1. **Faça um Fork do repositório**
   
   Clique no botão "Fork" no canto superior direito do [repositório GitHub](https://github.com/estacaodati/terraform-visual-editor)

2. **Clone seu fork**
   ```bash
   git clone https://github.com/SEU_USUARIO/terraform-visual-editor.git
   cd terraform-visual-editor
   ```

3. **Crie uma branch de feature**
   ```bash
   git checkout -b feature/nome-da-sua-feature
   ```

4. **Faça suas alterações**
   
   - **Use ferramentas de IA** (Google Antigravity, GitHub Copilot, ChatGPT, Claude, etc.)
   - Escreva código limpo e manutenível
   - Siga o estilo de código existente
   - Adicione comentários onde necessário
   - Teste suas alterações completamente

5. **Faça commit das suas alterações**
   ```bash
   git add .
   git commit -m "Add: descrição da sua feature"
   ```

6. **Envie para seu fork**
   ```bash
   git push origin feature/nome-da-sua-feature
   ```

7. **Crie um Pull Request**
   
   Vá ao repositório original e clique em "New Pull Request"

### Diretrizes de Contribuição

- **🤖 Desenvolvimento com IA**: Use ferramentas de IA para desenvolver suas contribuições
- **Qualidade do Código**: Garanta que seu código segue as melhores práticas de TypeScript e React
- **Testes**: Teste suas alterações localmente antes de enviar
- **Documentação**: Atualize a documentação se estiver adicionando novos recursos
- **Mensagens de Commit**: Use mensagens de commit claras e descritivas
- **Issue Primeiro**: Para mudanças importantes, abra uma issue primeiro para discutir suas ideias

### Áreas para Contribuição

- 🐛 Correção de bugs e resolução de problemas
- ✨ Novos módulos de provedores de nuvem (GCP, DigitalOcean, etc.)
- 🎨 Melhorias de UI/UX
- 📚 Documentação e tutoriais
- 🧪 Testes e garantia de qualidade
- 🌍 Internacionalização (i18n)
- 🤖 Melhorias geradas por IA

---

## 💡 Inspiração

Este projeto é inspirado no **Quartus II**, o poderoso software de design FPGA da Intel. Assim como o Quartus II permite que engenheiros projetem visualmente circuitos digitais complexos, o Terraform Visual Editor permite que engenheiros DevOps e arquitetos de nuvem projetem visualmente infraestrutura com a mesma abordagem intuitiva baseada em nós.

---

## 🛠️ Stack Tecnológica

- **Frontend**: React 19, TypeScript
- **Framework de UI**: TailwindCSS 4
- **Editor Visual**: ReactFlow
- **Gerenciamento de Estado**: Zustand
- **Ferramenta de Build**: Vite
- **Ícones**: Lucide React

---

## 📜 Licença

Este projeto é open source e está disponível sob a [Licença MIT](LICENSE).

---

## 🙏 Agradecimentos

- **Desenvolvimento iniciado por**: [Estação da TI](https://www.estacaodati.com.br/)
- **Desenvolvido com vibecoding usando**: Google Antigravity 🚀

---

<div align="center">

### 👨‍💻 Desenvolvido por

**[@estacaodati](https://github.com/estacaodati)**

*Construído com ❤️ usando vibecoding e Google Antigravity AI*

---

**[⬆ Voltar ao Topo](#-editor-visual-de-terraform)**

</div>
