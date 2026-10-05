class Aluno {
  static matriculaGeral = 0;

  constructor(nome, idade, nota) {
    this.matricula = ++Aluno.matriculaGeral;
    this.nome = nome;
    this.idade = idade;
    this.nota = nota;
    // aqui estou incrementando a matricula geral a cada vez que um novo aluno é criado, garantindo que cada aluno tenha uma matrícula única.
  }
}

export const alunos = [];

class AlunoController {
  index(req, res) {
    return res.render("alunos", { alunos });
  }
  store(req, res) {
    req.body;
    console.log(req.body);
    const { nome, idade, nota } = req.body;
    const aluno = new Aluno(nome, idade, nota);
    console.log(`Objeto aluno criado: ${JSON.stringify(aluno)}`);
    alunos.push(aluno);
    res.redirect("/alunos");
  }
}

export default new AlunoController();
