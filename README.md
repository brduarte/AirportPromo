# 📍 AirportPromo

## ⚒️ Ferramentas Utilizadas 
  
  - Node.js
  - Express
  - ORM Sequelize 
  - PostgreSQL

## 👨‍💻 Executando Manualmente

Assegure-se de ter [Node.js](http://nodejs.org/) instalado

1. Clone seu repositório e instale as dependências  

```console
$ git clone https://github.com/brduarte/AirportPromo.git 
$ cd AirportPromo
$ npm install
```

2. Renome o arquivo .env.example para `.env`
```console
$ cp -v .env.example .env
```

3. Execute o banco de dados. Você pode instanciar o banco de dados onde preferir, mas eu deixei uma configuração do **Docker Compose** para subir um banco de dados para você utilizando os parâmetros configurado no arquivo **.env**, basta você executar o comando abaixo.
         
         ⚠️ OBS: Certifique-se que você tenha o Docker e o Docker Compose instalado em seu computador, caso o contrário você pode encontrar o guia de instalação no índice de documentação.


```console
$ docker-compose up postgres
```

4. Execute o projeto.
```console
$ npx sequelize db:migrate
```

4. Execute o projeto.
```console
$ npm start
```

5. Sua API deve estar sendo executada em [http://localhost:3000](http://localhost:3000/).

        ⚠️ OBS: A API será executada na porta parametrizada na variável `APP_PORT` do projeto. 

![image](https://user-images.githubusercontent.com/29002558/116156101-6fd41100-a6c1-11eb-8c03-e99a0ef095e4.png)



## 🧪 Executando Script de Coleta de Dados

- Depois de configurar o sistema, basta rodar o comando abaixo.
```console
$ npm run start:script
```

## 📝 Documentação 

- [Documentação da API](https://documenter.getpostman.com/view/5528641/TzCHAqDw)
- [Como Instalar o Docker/Docker Compose](https://docs.docker.com/engine/install/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/pt-br/)

