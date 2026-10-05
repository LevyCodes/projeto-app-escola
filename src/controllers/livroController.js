class Livro {
  static idGeral = 0;

  constructor(titulo, autor, ano, genero) {
    this.id_livro = ++Livro.idGeral;
    this.titulo = titulo;
    this.autor = autor;
    this.ano = ano;
    this.genero = genero;
    this.disponivel = true;
  }
}

export const livros = [];

class LivroController {
  index(req, res) {
    return res.render("livros", {
      livros,
      titulo: "Livros",
    });
  }

  store(req, res) {
    const { titulo, autor, ano, genero } = req.body;

    if (!titulo || !autor || !ano || !genero) {
      return res.redirect("/livros");
    }

    const livro = new Livro(titulo, autor, ano, genero);
    livros.push(livro);

    return res.redirect("/livros");
  }

  editar(req, res) {
    const livro = livros.find((l) => l.id_livro === Number(req.params.id));

    if (!livro) return res.redirect("/livros");

    return res.render("editarLivro", {
      livro,
      titulo: "Editar livro",
    });
  }

  atualizar(req, res) {
    const livro = livros.find((l) => l.id_livro === Number(req.params.id));

    if (!livro) return res.redirect("/livros");

    const { titulo, autor, ano, genero } = req.body;
    livro.titulo = titulo;
    livro.autor = autor;
    livro.ano = ano;
    livro.genero = genero;

    return res.redirect("/livros");
  }

  excluir(req, res) {
    const index = livros.findIndex(
      (l) => l.id_livro === Number(req.params.id)
    );

    if (index !== -1) {
      const livro = livros[index];

      // Não permite excluir livro que esteja emprestado.
      if (!livro.disponivel) return res.redirect("/livros");

      livros.splice(index, 1);
    }

    return res.redirect("/livros");
  }
}

export default new LivroController();
