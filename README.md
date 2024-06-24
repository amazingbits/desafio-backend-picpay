<p align="center">
    <img src="https://cdn.worldvectorlogo.com/logos/picpay-1.svg" width="120px" />
</p>
<br>
<div align="center" style="display: inline-flex; gap: 8px; text-align: center;">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" />
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
</div>

## Desafio back-end: PicPay

Projeto original: <a href="https://github.com/PicPay/picpay-desafio-backend">Link</a>

### O Projeto: PicPay simplificado

O PicPay Simplificado é uma plataforma de pagamentos simplificada. Nela é possível depositar e realizar transferências de dinheiro entre usuários. Temos 2 tipos de usuários, os `comuns` e `lojistas`, ambos têm carteira com dinheiro e realizam transferências entre eles.

#### Requisitos

- Para ambos tipos de usuário, precisamos do `Nome Completo`, `CPF`, `E-mail` e `Senha`. CPF/CNPJ e E-mails devem ser <b>únicos no sistema</b>. Sendo assim, seu sistema deve permitir <b>apenas um cadastro</b> com o mesmo CPF ou endereço de e-mail;

- Usuários podem enviar dinheiro (efetuar transferência) para lojistas e entre usuários;

- Lojistas só recebem transferências, <b>não enviam dinheiro para ninguém</b>;

- Validar se o usuário tem saldo antes da transferência;

- Antes de finalizar a transferência, deve-se consultar um serviço autorizador externo, use este mock https://util.devi.tools/api/v2/authorize para simular o serviço utilizando o verbo `GET`;

- A operação de transferência deve ser uma transação (ou seja, <b>revertida em qualquer caso de inconsistência</b>) e o dinheiro deve <b>voltar para a carteira do usuário que envia</b>;

- No recebimento de pagamento, o usuário ou lojista precisa receber notificação (envio de email, sms) enviada por um serviço de terceiro e eventualmente este serviço pode estar indisponível/instável. Use este mock https://util.devi.tools/api/v1/notify para simular o envio da notificação utilizando o verbo `POST`;

- Este serviço deve ser `RESTFul`.

#### Endpoint da transferência

Você pode implementar o que achar conveniente, porém vamos nos atentar somente ao fluxo de transferência entre dois usuários. A implementação deve seguir o contrato abaixo.

```json
POST /transfer
Content-Type: application/json

{
  "value": 100.0,
  "payer": 4,
  "payee": 15
}
```

#### Requisitos para rodar o projeto

- `NodeJS` (foi utilizada a versão 20).
- Um servidor local `MySQL` configurado.

#### Como rodar o projeto

- Clone este repositório para a sua máquina.
- No terminal, vá até o diretório deste projeto e digite o comando `npm install` para instalar todas as dependências do projeto.
- Renomeie o arquivo `.env.example` para `.env`.
- No arquivo `.env`, na variável `DATABASE_URL`, substitua os seguintes valores:

`{DB_USER}`: nome de usuário do banco de dados.<br><br>
`{DB_PASSWORD}`: senha de usuário do banco de dados.<br><br>
`{DB_HOST}`: host do banco de dados.<br><br>
`{DB_PORT}`: porta de acesso ao banco de dados (MySQL utiliza `3306` por padrão).<br><br>
`{DB_NAME}`: nome do banco de dados a ser utilizado no projeto.<br><br>

- Crie um banco de dados `MySQL` com o mesmo nome que você colocou no valor `{DB_NAME}` do arquivo `.env`.
- Crie as tabelas do banco de dados com o comando `npm run migrate -- init`.
- Crie as `seeds` necessárias com o comando `npm run seed`.
- Inicie o servidor com o comando `npm run dev` ou faça uma `build`, rodando-a em seguida com o comando `npm run start`.

