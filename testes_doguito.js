// TESTES CLIENTES

const {
  criarCliente
} = require("../app")

describe("Testes de Cliente", () => {
  test("1. Deve permitir criar cliente com nome válido", () => {
    const cliente = criarCliente("João", "joao@email.com")

    expect(cliente.nome).toBe("João")
  })

  test("2. Não deve permitir cliente com nome vazio", () => {
    expect(() => criarCliente("", "joao@email.com"))
      .toThrow("Nome inválido")
  })

  test("3. Deve permitir cadastrar cliente com email válido", () => {
    const cliente = criarCliente("João", "joao@email.com")

    expect(cliente.email).toBe("joao@email.com")
  })

  test("4. Não deve permitir email inválido", () => {
    expect(() => criarCliente("João", "joaoemail.com"))
      .toThrow("Email inválido")
  })

  test("5. Deve permitir marcar cliente como VIP", () => {
    const cliente = criarCliente("João", "joao@email.com", true)

    expect(cliente.vip).toBe(true)
  })
})

// TESTES PETS

const {
  cadastrarPet
} = require("../app")

describe("Testes de Pet", () => {
  test("6. Deve permitir cadastrar um pet", () => {
    const pet = cadastrarPet("Rex", "cachorro", 5)

    expect(pet).toEqual({
      nome: "Rex",
      tipo: "cachorro",
      idade: 5
    })
  })

  test("7. Pet deve possuir nome obrigatório", () => {
    expect(() => cadastrarPet("", "cachorro", 5))
      .toThrow("Pet precisa de nome")
  })

  test("8. Pet deve possuir tipo", () => {
    expect(() => cadastrarPet("Rex", "", 5))
      .toThrow("Pet precisa de tipo")
  })

  test("9. Pet deve possuir idade válida", () => {
    expect(() => cadastrarPet("Rex", "cachorro", NaN))
      .toThrow("Idade inválida")

    expect(() => cadastrarPet("Rex", "cachorro", -1))
      .toThrow("Idade inválida")
  })
})

// TESTES PRODUTOS

const {
  criarProduto
} = require("../app")

describe("Testes de Produto", () => {
  test("10. Deve permitir criar produto com nome", () => {
    const produto = criarProduto("Ração", 50)

    expect(produto.nome).toBe("Ração")
  })

  test("11. Produto deve possuir preço maior que zero", () => {
    const produto = criarProduto("Ração", 50)

    expect(produto.preco).toBeGreaterThan(0)
  })

  test("12. Produto não pode possuir preço negativo", () => {
    expect(() => criarProduto("Ração", -10))
      .toThrow("Preço inválido")
  })

  test("13. Produto deve aparecer na lista de produtos cadastrados", () => {
    const produtos = []
    const produto = criarProduto("Ração", 50)

    produtos.push(produto)

    expect(produtos).toContain(produto)
  })
})

// TESTES CARRINHO

const {
  criarProduto,
  adicionarProdutoCarrinho,
  removerProdutoCarrinho,
  calcularTotal,
  finalizarCompra
} = require("../app")

describe("Testes de Carrinho", () => {
  test("14. Deve permitir adicionar produto ao carrinho", () => {
    const carrinho = []
    const produto = criarProduto("Ração", 50)

    adicionarProdutoCarrinho(carrinho, produto)

    expect(carrinho).toHaveLength(1)
    expect(carrinho[0]).toBe(produto)
  })

  test("15. Deve permitir remover produto do carrinho", () => {
    const produto = criarProduto("Ração", 50)
    const carrinho = [produto]

    removerProdutoCarrinho(carrinho)

    expect(carrinho).toHaveLength(0)
  })

  test("16. Carrinho deve listar todos os produtos adicionados", () => {
    const produto1 = criarProduto("Ração", 50)
    const produto2 = criarProduto("Brinquedo", 30)
    const carrinho = []

    adicionarProdutoCarrinho(carrinho, produto1)
    adicionarProdutoCarrinho(carrinho, produto2)

    expect(carrinho).toEqual([produto1, produto2])
  })

  test("17. Carrinho deve calcular o valor total da compra", () => {
    const carrinho = [
      criarProduto("Ração", 50),
      criarProduto("Brinquedo", 30)
    ]

    expect(calcularTotal(carrinho)).toBe(80)
  })
})

// TESTES REGRAS DE NEGÓCIO

const {
  criarCliente,
  criarProduto,
  adicionarProdutoCarrinho,
  calcularTotal
} = require("../app")

describe("Testes de Regras de Negócio", () => {
  test("18. Compra acima de R$100 deve aplicar desconto de 10%", () => {
    const carrinho = [
      criarProduto("Ração", 100),
      criarProduto("Brinquedo", 20)
    ]

    expect(calcularTotal(carrinho)).toBe(108)
  })

  test("19. Cliente VIP deve receber desconto de 15%", () => {
    const cliente = criarCliente(
      "João",
      "joao@email.com",
      true
    )

    const carrinho = [
      criarProduto("Ração", 100)
    ]

    expect(calcularTotal(carrinho, cliente)).toBe(85)
  })

  test("20. Carrinho não deve aceitar produto com preço igual a zero", () => {
    const carrinho = []
    const produto = {
      nome: "Produto grátis",
      preco: 0
    }

    expect(() => adicionarProdutoCarrinho(carrinho, produto))
      .toThrow("Produto inválido")
  })

  test("21. Carrinho vazio deve retornar total igual a 0", () => {
    expect(calcularTotal([])).toBe(0)
  })

  test("22. Ao finalizar compra o carrinho deve ser limpo", () => {
    const carrinho = [
      criarProduto("Ração", 50)
    ]

    finalizarCompra(carrinho)

    expect(carrinho).toHaveLength(0)
  })
})
