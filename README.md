# Ágora - App

## Introdução
Este projeto consiste em um aplicativo **React Native**, desenvolvido com **Expo**. Deve ser utilizado com o [Agora Api](https://github.com/GabrielPeplinski/agora-api) em execução.

## **Ferramentas Necessárias**
Para instalar e rodar o projeto, será necessário ter as seguintes ferramentas instaladas na sua máquina:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&pli=1)
- [Android Studio (se for usar emulador)](https://developer.android.com/studio)

## Como Instalar e Configurar o Projeto
Após instalar as ferramentas e **clonar o repositório**, siga os passos abaixo para configurar o ambiente:

* Instale as dependências do projeto:
   ```sh
   yarn install

* Para poder acessar localmente é necessário ter a API configurada, para isto acesse: [Agora Api](https://github.com/GabrielPeplinski/agora-api)

* Crie um arquivo, no diretório config/, com o nome:
```environments.ts```baseado no arquivo 'environments.ts.example e atualize a rota base aplicação (caso esteja usando a rota padrão na API não é necessário atualizar!).

## Como Iniciar o Projeto

* Com projeto pode ser iniciado para ser acessado com o aplicativo Expo Go:
    ```sh
   yarn android --tunnel
