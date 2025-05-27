# IBG Consumer

## 📋 Descrição
O IBG Consumer é uma aplicação web desenvolvida em Angular que permite visualizar e analisar dados relacionados a nomes e suas evoluções ao longo do tempo. A aplicação oferece diferentes visualizações e comparações de dados através de gráficos interativos, permitindo uma análise profunda das tendências de nomes em diferentes regiões do Brasil.

## 🚀 Funcionalidades
- **Comparação de Nomes**: Compare a popularidade de diferentes nomes ao longo dos anos
- **Ranking por Localidade**: Visualize os nomes mais populares em diferentes regiões
- **Evolução de Nomes**: Acompanhe a evolução da popularidade de nomes específicos
- **Visualizações Gráficas**: Gráficos interativos e responsivos para melhor análise dos dados

## 📖 Guia de Uso

### Comparação de Nomes
1. Acesse a seção "Comparação de Nomes"
2. Digite os nomes que deseja comparar no campo de busca
3. Selecione o período de análise desejado
4. Visualize o gráfico comparativo gerado
5. Use os controles interativos para ajustar a visualização

### Ranking por Localidade
1. Navegue até "Ranking por Localidade"
2. Selecione a região desejada
3. Escolha o ano de referência
4. Explore o ranking dos nomes mais populares
5. Filtre por gênero ou período específico

### Evolução de Nomes
1. Acesse "Evolução de Nomes"
2. Digite o nome que deseja analisar
3. Selecione a localidade (opcional)
4. Visualize a evolução da popularidade ao longo dos anos
5. Compare com a média nacional

## 🛠️ Tecnologias Utilizadas
- Angular 19
- TypeScript
- Chart.js
- ng2-charts
- RxJS
- Express (para SSR)

## 📦 Pré-requisitos
- Node.js (versão LTS recomendada)
- npm ou yarn
- Navegador moderno (Chrome, Firefox, Edge ou Safari)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

## 🏗️ Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run test`: Executa os testes unitários
- `npm run watch`: Compila o projeto em modo de observação

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── comparacao-nomes/     # Componente para comparação de nomes
│   │   ├── ranking-localidade/   # Componente para ranking por região
│   │   └── nome-evolucao/        # Componente para evolução temporal
│   └── ...
└── ...
```

## 🔍 Dicas de Uso
- Use os filtros disponíveis para refinar suas buscas
- Exporte os gráficos em diferentes formatos
- Compare múltiplos nomes simultaneamente
- Utilize os atalhos de teclado para navegação rápida
- Salve suas análises favoritas para acesso rápido

## 🤝 Contribuição
1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença
Este projeto está sob a licença [inserir tipo de licença].

## ✨ Agradecimentos
- Equipe de desenvolvimento
- Contribuidores
- Comunidade Angular
- IBGE por disponibilizar os dados

## 📞 Suporte
Para reportar problemas ou sugerir melhorias, por favor:
1. Abra uma issue no GitHub
2. Descreva detalhadamente o problema ou sugestão
3. Inclua screenshots quando relevante
4. Especifique a versão do navegador e sistema operacional
