# 🚗 CrudCar

## ⚒️ Ferramentas Utilizadas 
  
  - Node.js
  - Express
  - ORM Sequelize 
  - Mocha
  - PostgreSQL

## 👨‍💻 Executando Manualmente

Assegure-se de ter [Node.js](http://nodejs.org/) instalado

1. Clone seu repositório e instale as dependências  

```console
$ git clone https://github.com/brduarte/CrudCar.git 
$ cd CrudCar
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
$ npm start
```

5. Sua API deve estar sendo executada em [http://localhost:3000](http://localhost:3000/).

        ⚠️ OBS: A API será executada na porta parametrizada na variável `APP_PORT` do projeto. 

![image](https://user-images.githubusercontent.com/29002558/112572587-3873fb00-8dc9-11eb-9312-18d29fc82591.png)


## 🧪 Executando Testes

- Depois de configurar o sistema, basta rodar o comando abaixo.
```console
$ npm run test
```

## 📝 Documentação 

- [Documentação da API](https://documenter.getpostman.com/view/5528641/TzCHAqDw)
- [Como Instalar o Docker/Docker Compose](https://docs.docker.com/engine/install/)
- [Mocha](https://mochajs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/pt-br/)

## Autor

| [<img width="125px" src="https://avatars2.githubusercontent.com/u/29002558?v=4"><br><sub>@brduarte</sub>](https://github.com/brduarte)|
| :---: |
