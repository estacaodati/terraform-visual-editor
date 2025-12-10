# Contribuindo para o Terraform Visual Editor

Obrigado pelo seu interesse em contribuir para o Terraform Visual Editor! Este documento fornece diretrizes e instruções para contribuir com o projeto.

## 🤖 Desenvolvimento Impulsionado por IA

Este projeto foi **orgulhosamente construído com o auxílio de Inteligência Artificial**. 

Acreditamos na democratização do desenvolvimento de software. Nosso objetivo é remover as barreiras técnicas tradicionais e permitir que qualquer pessoa possa contribuir, independentemente de seu nível de conhecimento em programação.

**Sinta-se à vontade para usar ferramentas de IA (como ChatGPT, Claude, Gemini, Copilot, etc.) para criar suas contribuições.** Se você tem uma ideia, mas não sabe como codificá-la, use a IA para ajudar a transformar sua visão em código e submeta seu Pull Request! Valorizamos a criatividade e a solução de problemas acima da sintaxe perfeita.

## 🌟 Maneiras de Contribuir

Existem muitas maneiras de contribuir para este projeto:

- 🐛 **Relatar bugs** e problemas
- 💡 **Sugerir novos recursos** ou melhorias
- 📝 **Melhorar a documentação**
- 🧪 **Escrever testes**
- 💻 **Enviar contribuições de código**
- 🎨 **Melhorar o design UI/UX**
- 🌍 **Traduzir para outros idiomas**

## 🚀 Começando

### 1. Fork e Clone

1. Faça um Fork do repositório no GitHub
2. Clone seu fork localmente:
   ```bash
   git clone https://github.com/SEU_USUARIO/terraform-visual-editor.git
   cd terraform-visual-editor
   ```

### 2. Configurar Ambiente de Desenvolvimento

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra `http://localhost:5173` no seu navegador

### 3. Criar uma Branch

Crie uma nova branch para sua funcionalidade ou correção de bug:

```bash
git checkout -b feature/nome-da-sua-feature
```

Use nomes de branch descritivos:
- `feature/adicionar-modulos-gcp` para novos recursos
- `fix/bug-renderizacao-canvas` para correções de bugs
- `docs/atualizar-readme` para documentação
- `refactor/otimizacao-store` para refatoração

## 📋 Diretrizes de Desenvolvimento

### Estilo de Código

- **TypeScript**: Use TypeScript para todo código novo
- **Formatação**: Siga o estilo de código existente
- **Linting**: Execute `npm run lint` antes de fazer commit
- **Componentes**: Use componentes funcionais com hooks
- **Estado**: Use Zustand para gerenciamento de estado global

### Diretrizes de Componentes

```typescript
// Use exportações nomeadas (named exports)
export function MeuComponente() {
  // Lógica do componente
}

// Use interfaces TypeScript para props
interface MeuComponenteProps {
  titulo: string;
  aoClicar?: () => void;
}

export function MeuComponente({ titulo, aoClicar }: MeuComponenteProps) {
  // Lógica do componente
}
```

### Mensagens de Commit

Use mensagens de commit claras e descritivas seguindo este formato:

```
Tipo: Breve descrição

Explicação detalhada (se necessário)
```

**Tipos:**
- `Add:` Novos recursos
- `Fix:` Correção de bugs
- `Update:` Atualizações em recursos existentes
- `Refactor:` Refatoração de código
- `Docs:` Alterações na documentação
- `Test:` Adição ou atualização de testes
- `Style:` Alterações de estilo de código (formatação, etc.)

**Exemplos:**
```
Add: Módulo de instância de computação GCP

Fix: Zoom do canvas não funcionando em dispositivos móveis

Update: Melhorar validação de conexão de módulos

Docs: Adicionar seção de solução de problemas ao README
```

## 🧪 Testes

Antes de enviar suas alterações:

1. **Teste localmente**: Certifique-se de que o aplicativo roda sem erros
2. **Teste sua funcionalidade**: Verifique se suas alterações funcionam conforme o esperado
3. **Teste casos extremos**: Considere entradas ou cenários incomuns
4. **Verifique a responsividade**: Teste em diferentes tamanhos de tela
5. **Execute o linter**: `npm run lint`

## 📤 Enviando Alterações

### 1. Faça Commit de Suas Alterações

```bash
git add .
git commit -m "Add: descrição da sua funcionalidade"
```

### 2. Envie para o Seu Fork

```bash
git push origin feature/nome-da-sua-feature
```

### 3. Crie um Pull Request

1. Vá para o repositório original no GitHub
2. Clique em "New Pull Request" (Novo Pull Request)
3. Selecione seu fork e branch
4. Preencha o modelo de PR com:
   - **Descrição**: O que este PR faz?
   - **Motivação**: Por que esta alteração é necessária?
   - **Testes**: Como você testou isso?
   - **Screenshots**: Se aplicável, adicione capturas de tela

### 4. Revisão de Código

- Seja receptivo ao feedback
- Faça as alterações solicitadas prontamente
- Mantenha as discussões profissionais e construtivas

## 🎯 Áreas Prioritárias

Agradecemos especialmente contribuições nestas áreas:

### Alta Prioridade
- 🧪 **Testes unitários e de integração**
- 📚 **Documentação e tutoriais**
- 🐛 **Correções de bugs**

### Média Prioridade
- ☁️ **Novos módulos de provedores de nuvem** (GCP, DigitalOcean, etc.)
- 🎨 **Melhorias de UI/UX**
- ⚡ **Otimizações de desempenho**

### Seria Legal Ter (Nice to Have)
- 🌍 **Internacionalização (i18n)**
- 📱 **Melhorias de responsividade móvel**
- 🎬 **Tutoriais em vídeo**

## 💬 Comunicação

- **Issues**: Use GitHub Issues para relatórios de bugs e solicitações de recursos
- **Discussions**: Use GitHub Discussions para perguntas e ideias
- **Pull Requests**: Use PRs para contribuições de código

## 📜 Código de Conduta

### Nossos Padrões

- Seja respeitoso e inclusivo
- Dê boas-vindas aos recém-chegados
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Demonstre empatia pelos outros

### Comportamento Inaceitável

- Assédio ou linguagem discriminatória
- Comentários ofensivos ou insultuosos
- Ataques pessoais ou políticos
- Publicar informações privadas de outras pessoas

## 🏆 Reconhecimento

Os contribuidores serão reconhecidos em:
- README do projeto
- Notas de lançamento
- Página de contribuidores do GitHub

## ❓ Perguntas?

Se você tiver dúvidas sobre como contribuir:

1. Verifique problemas e discussões existentes
2. Abra uma nova discussão no GitHub
3. Entre em contato com [@estacaodati](https://github.com/estacaodati)

---

Obrigado por contribuir para o Terraform Visual Editor! 🎉
