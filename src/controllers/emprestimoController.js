import { alunos } from "./alunoController.js";
import { livros } from "./livroController.js";

class Emprestimo {
  static idGeral = 0;

  constructor(aluno, livro, dataEmprestimo, dataDevolucao) {
    this.id_emprestimo = ++Emprestimo.idGeral;
    this.aluno = aluno;
    this.livro = livro;
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = dataDevolucao;
  }
}

const emprestimos = [];

function prepararLivrosParaSelecao() {
  return livros.map((livro) => ({
    ...livro,
    // Um livro ocupado só aparece como opção quando já pertence
    // ao empréstimo que está sendo editado.
    selecionado: false,
  }));
}

class EmprestimoController {
  index(req, res) {
    return res.render("emprestimos", {
      emprestimos,
      livros: prepararLivrosParaSelecao().filter((livro) => livro.disponivel),
      alunos,
      titulo: "Empréstimos",
    });
  }

  cadastrarEmprestimo(req, res) {
    const { alunoId, livroId, dataEmprestimo, dataDevolucao } = req.body;

    const aluno = alunos.find((a) => a.matricula === Number(alunoId));
    const livro = livros.find((l) => l.id_livro === Number(livroId));

    if (!aluno || !livro || !livro.disponivel) {
      return res.redirect("/emprestimos");
    }

    const emprestimo = new Emprestimo(
      aluno,
      livro,
      dataEmprestimo,
      dataDevolucao,
    );

    livro.disponivel = false;
    emprestimos.push(emprestimo);

    return res.redirect("/emprestimos");
  }

  editar(req, res) {
    const { id } = req.params;

    const emprestimo = emprestimos.find(
      (e) => e.id_emprestimo === Number(id),
    );

    if (!emprestimo) {
      return res.redirect("/emprestimos");
    }

    const livrosEdicao = livros.map((livro) => ({
      ...livro,
      selecionado: livro.id_livro === emprestimo.livro.id_livro,
    }));

    return res.render("editarEmprestimo", {
      emprestimo,
      livros: livrosEdicao,
      alunos,
      titulo: "Editar empréstimo",
    });
  }

  atualizar(req, res) {
    const { id } = req.params;
    const { dataEmprestimo, dataDevolucao, livroId, alunoId } = req.body;

    const emprestimo = emprestimos.find(
      (e) => e.id_emprestimo === Number(id),
    );

    if (!emprestimo) {
      return res.redirect("/emprestimos");
    }

    const aluno = alunos.find((a) => a.matricula === Number(alunoId));
    const livro = livros.find((l) => l.id_livro === Number(livroId));

    if (!aluno || !livro) {
      return res.redirect("/emprestimos");
    }

    // Se o livro foi trocado, libera o antigo e ocupa o novo.
    if (emprestimo.livro.id_livro !== livro.id_livro) {
      if (!livro.disponivel) {
        return res.redirect(`/emprestimos/${id}/editar`);
      }

      emprestimo.livro.disponivel = true;
      livro.disponivel = false;
      emprestimo.livro = livro;
    }

    emprestimo.aluno = aluno;
    emprestimo.dataEmprestimo = dataEmprestimo;
    emprestimo.dataDevolucao = dataDevolucao;

    return res.redirect("/emprestimos");
  }

  devolver(req, res) {
    const { id } = req.params;

    const i = emprestimos.findIndex(
      (e) => e.id_emprestimo === Number(id),
    );

    if (i === -1) {
      return res.redirect("/emprestimos");
    }

    // Libera o livro ANTES de remover o empréstimo.
    emprestimos[i].livro.disponivel = true;
    emprestimos.splice(i, 1);

    return res.redirect("/emprestimos");
  }
}

export default new EmprestimoController();
