Takontroll

1. Descrição

Takontroll é uma aplicação web desenvolvida para gerenciar transações financeiras. O sistema permite aos usuários autenticados cadastrar, visualizar, editar e excluir transações. O saldo total é exibido dinamicamente com base nas transações cadastradas, e os valores podem ser convertidos de diferentes moedas (USD, EUR, BRL) para reais (BRL) com base em taxas de câmbio predefinidas.

2. Funcionalidades

Autenticação de Usuário:

Login e logout utilizando Firebase Authentication.

Gerenciamento de Transações:

Listar todas as transações do usuário logado.

Adicionar novas transações (renda ou despesa).

Editar transações existentes.

Excluir transações.

Saldo Total Dinâmico:

Exibição do saldo total com conversão automática de moedas para BRL (real).

3. Tecnologias Utilizadas

Frontend:

HTML, CSS, JavaScript.

Backend (Firebase):

Firebase Authentication.

Firebase Firestore.

4. Configuração e Instalação

Clone este repositório:

git clone https://github.com/rthll/takontroll.git
cd takontroll

Configure o Firebase:

Crie um projeto no Firebase Console.

Habilite Authentication com o provedor desejado.

Configure o Firestore e crie a coleção transactions.

Copie as credenciais do projeto e configure o arquivo firebase-init.js.

Inicie um servidor local:

Utilize a extensão Live Server do VSCode ou qualquer outro servidor web para testar a aplicação localmente.

5. Uso

Abra o arquivo home/home.html no navegador.

Autentique-se com o seu e-mail e senha.

Gerencie suas transações:

Clique no botão + para adicionar uma nova transação.

Clique no botão Editar para modificar uma transação existente.

Clique no botão Excluir para remover uma transação.

Confira o saldo total na área central da página inicial.

