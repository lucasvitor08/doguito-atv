Atividade prática

Erros encontrados

1. Cliente com nome vazio não é cadastrado, mas o erro é tratado apenas com um alert.
2. A validação de email é muito simples e pode aceitar emails inválidos.
3. Cliente VIP é cadastrado, mas não recebe o desconto de 15%.
4. É possível cadastrar um pet sem informar o tipo.
5. A idade do pet não é validada corretamente e pode aceitar valores inválidos.
6. É possível cadastrar um produto sem informar o nome.
7. Produto com preço igual a zero é aceito, mesmo não sendo permitido.
8. Preço de produto inválido, como texto, não é tratado corretamente.
9. O carrinho permite adicionar produtos com preço zero.
10. O botão Remover sempre tira o primeiro produto do carrinho.
11. O sistema não verifica se existe um produto válido antes de adicioná-lo ao carrinho.
12. O código mistura as regras do sistema com a parte visual, dificultando os testes.
13. As funções não são exportadas pelo app.js, impedindo o acesso direto pelo Jest.
14. O carrossel usa setInterval() diretamente, dificultando o teste automático da troca de imagens.
15. O botão Finalizar depende de alert() e do carrinho global, dificultando o teste isolado da função.