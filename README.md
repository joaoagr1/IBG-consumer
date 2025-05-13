# 📊 Sistema SOA para Análise de Tendência de Nomes no Brasil

### NOME: João Antônio Garcia ROlo
### RA: 220143992

## 🧠 Objetivo

Desenvolver um sistema baseado em arquitetura SOA (Service-Oriented Architecture) para análise da tendência de nomes no Brasil, utilizando dados públicos disponibilizados pelo IBGE por meio de Web Services. O sistema deve ser composto por dois serviços e um cliente consumidor desses serviços.

## 🧩 Estrutura do Sistema

- **Serviço 1 - Consulta Nome IBGE**  
  Consulta os dados de tendência de nomes através do Web Service do IBGE e retorna as informações obtidas.

- **Serviço 2 - Armazenamento Local**  
  Armazena os resultados de pesquisa em um repositório local (arquivo ou banco de dados).

- **Cliente**  
  Permite que o usuário insira um nome e visualize os dados da tendência, consultando o Serviço 1 e armazenando o resultado com o Serviço 2.

## 🔧 Requisitos Funcionais

- O sistema deve permitir que o usuário:
  - Insira um nome a ser pesquisado.
  - Visualize a tendência histórica do nome:
    - Ano
    - Frequência
    - Região (opcional)
  - Armazene a pesquisa localmente para consultas futuras.

- O sistema deve permitir a listagem das consultas realizadas anteriormente:
  - Exibir nome, ano e frequência.
  - Permitir reconsulta ao Web Service IBGE com base em dados armazenados.

## ⚙️ Requisitos Técnicos

- Deve ser implementado em JavaScript.
- Utilizar Web Services RESTful fornecidos pelo IBGE:
  - [https://servicodados.ibge.gov.br/api/v2/censos/nomes/](https://servicodados.ibge.gov.br/api/v2/censos/nomes/)
- Utilizar padrões de projeto voltados a SOA (Separação de serviços e cliente).
- O cliente pode ser implementado com Node.js (CLI ou web frontend simples).
