# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente
Não deve ser possível alterar a placa de um carro já cadastrado.
Não deve ser possível cadastrar um carro com uma categoria inexistente
O Carro deve ser cadastrado, por padrão, com disponibilidade.
O Usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo nome da categoria
Deve ser possível listar todos os carros disponíveis pelo nome da marca
Deve ser possível listar todos os carros disponíveis pelo nome do carro



**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para o carro


**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O Usuário responsável pelo cadastro deve ser um usuário administrador.


# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro

**RNF** 
Utilizar o multer para o upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
o usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possível  cadastrar o aluguel de um carro

**RNF**

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.


# Listagem de Alugueis para usuário

**RF** 
Deve ser possível realizar a busca de todos os aluguei para o usuário

**RN**
O Usuário deve estar logado na aplicação

# Recuperar Senha

**RF**
- Deve ser possível recuperar a senha informando o email
- O Usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O Usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- o link enviado para a recuperação deve expirar em 3 horas