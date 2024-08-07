# Gympass Style API

### Techs
- [Fastify](https://fastify.dev/docs/v4.18.x)

### Bootstrap do projeto

#### :construction: Instalação das dependências:
```sh
npm i
```
#### :gear: Configuração do banco de dados
1. Construção da imagem do contêiner no Docker
   ```sh
   docker compose build
   ```
2. Execução do contêiner no Docker
   ```sh
   docker compose start
   ```
3. Aplicação das *migrations*
   ```sh
   npx prisma migrate dev
   ```
4. Execução do Prisma Studio
   ```sh
   npx prisma studio
   ```

#### :fire: Execução da API
```sh
npm run start:dev
```

### DEV
[Luiz Fernando](https://github.com/lfnd0)
