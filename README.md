# Projeto-Angular

Projeto

Vídeo Configuração do Projeto Com Docker Compose:
   https://www.youtube.com/watch?v=qk0cappjX8o


iniciando o projeto execute o comando 

```git clone  https://github.com/JuniorN1/Projeto-Angular.git```

após executar o comando ```git clone ``` va na pasta do projeto

abra o terminal ou powershell e execute o seguinte comando 
para o sistema linux:
    ```sudo docker-composer up --build```
após ele ira baixas os recursos necessarios e subir os containers poderar demorar um pouco para concluir a tarefa apos isso verifique se está tudo ok para podermos continuar!
podemos testar acessando o localhost:3333 para o back-end e o localhost:4200 para o front-end devese apresenta as telas

para o banco de dados recomendo a instalação de um gerenciador de base muito bom e gratuito chamado DBeaver: https://dbeaver.io/download/ 
pois será necessário inserir no banco o primeiro usuário e pré cadastrar as cidades e estados de exemplo:
conexao com baco:
```
host:      localhost
usuario:   test
senha:     test
banco:     test
```

adicionar estados na tabela uf: 
```
    RN
    PB
   ``` 
adicionar cidades na tebela cidade:
```
    Rafael Fernandes
    João Pessoa
   ```
e também temos que cadastrar o usuário para funcionalidade de autenticação do jwt , embora o projeto não tenha uma tela de login, como informado, somente 3 telas, é necessário criar um usuário na tabela de usuários deixarei um token global pré definido sem criptografia para facilitar a configuração , 
    ``` usuário: junior
    senha    : 12345678``` 
    
utilizando o dbeaver ou outro gerenciador pode esta fazendo a conexão com o banco 
após isso basta abrir a aplicação e testar




#### caso não tenha o docker instalado na sua máquina voce pode tambem optar por instalar sem o uso do docker para isso deve ter o ambiente com node js instalado 

##### Windows:
    no windows se torna relativamente simples pois basta baixar e executar o node.exe que você pode baixar no site oficial
    
https://nodejs.org/en/

após baixar e instalar o node você terá que baixar o postgresql no site oficial, também será de forma simples e fácil  :
https://www.postgresql.org/download/

temos que instalar o Dbeaver ou usar um gerenciador de banco do seu gosto para acessar o banco :

as configurações de acesso ao banco são
```
host:      localhost
usuario:   test
senha:     test
banco:     test
```

estão na tabela usuario deve se cadastrar o seguinte usuário para validar a nossa jwt predefinida já que não foi necessário criar tela de login para o projeto:
na tabela usuario:
   ``` 
   usuário: junior
   senha    : 12345678
```  
adicionar estados na tabela uf: 
```
    RN
    PB
   ``` 
adicionar cidades na tebela cidade:
```
    Rafael Fernandes
    João Pessoa
   ```
pronto o banco já está configurado e pronto para o uso


##### Linux:
    no linux e um pouco mais complexo pois as instalações serão mais via comando:
    primeiro abra o terminal e execute: 
    ```sudo apt install nodejs ```

verifique agora se tudo deu certo e o node foi instalado com o comando no terminal:
```node -v``` 
ele deve retornar a versão do node exemplo: v10.17.0
agora instalaremos o npm utilizando o comando 
```sudo apt install npm``` 

verificamos a versão usando ```npm v``` e teremos um retorno parecido acima

instalando postgresql , já temos um script pronto do site do postgres
que estarei deixando abaixo basta executar os comandos

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

sudo apt-get update
sudo apt-get -y install postgres```

para mais detalhes :
https://www.postgresql.org/download/linux/ubuntu/
```
##### windows e linux

após instalarmos tudo podemos dar o próximo passo 
e rodar o 
```npm install -g @angular/c```
ira rodar em ambos os sistemas
sendo assim somente necessário entrar nos diretórios dos projetos e executar 

o comando ```npm install``` para instalar as dependências tanto no projeto  angular quanto do node js, 
para rodá los do mesmo modo que instalar os módulos basta rodar o comando ```npm start```

com o banco de dados configurado basta testar o mesmo!
