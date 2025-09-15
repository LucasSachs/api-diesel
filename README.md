Obs: Caso você ainda não tenha o PNPM na sua máquina, você pode instalar a CLI dele usando o seguinte comando:

```bash
    npm i -g pnpm
```

Considerando o uso do PNPM como Package Manager, você pode fazer a instalação dos pacotes usando o seguinte comando:

```bash
    pnpm install
``` 

Faça uma cópia do arquivo .env-example que está dentro do projeto, renomeie essa cópia para .env e configure as variáveis de ambiente para execução do sistema.

Após fazer a instalação dos pacotes necessários para a execução do sistema, você pode buildar o projeto usando o comando:

```bash
    pnpm build
```

E por fim, executar o sistema em sua build de produção usando o comando:

```bash
    pnpm start:prod
```

Com isso, você já tem o back-end rodando em sua máquina, e você pode acessá-lo através do link: http://localhost:8000 (A porta pode variar de acordo com a porta que foi informado no arquivo .env)
