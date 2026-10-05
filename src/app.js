import express from "express";
import methodOverride from "method-override";
import { engine } from "express-handlebars";
import { resolve } from "path";
import { fileURLToPath } from "url";
// Em ESM não existem __filename e __dirname automáticos.
// As duas linhas abaixo reconstroem esses caminhos.
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

//rotas
import homeRoutes from "./routes/home.js";
import alunoRoutes from "./routes/aluno.js";
import emprestimosRoutes from "./routes/emprestimos.js";
import livroRoutes from "./routes/livro.js";
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.views();
    this.routes();
  }
  middlewares() {
    // Lê dados enviados por formulários HTML
    this.app.use(express.urlencoded({ extended: true }));
    // Lê dados enviados em formato JSON
    this.app.use(express.json());
    // Permite usar PUT e DELETE a partir de formulários
    this.app.use(methodOverride("_method"));

    // Define a pasta de arquivos estáticos
    this.app.use(express.static(resolve(__dirname, "public"))); //quando for usar arquivos estáticos, como imagens, css, js, etc.
  }
  views() {
    this.app.engine(
      "handlebars",
      engine({
        defaultLayout: "main",
        layoutsDir: resolve(__dirname, "views", "layouts"),
        helpers: {
          eq: (a, b) => a === b,
        },
      }),
    );
    this.app.set("view engine", "handlebars");
    this.app.set("views", resolve(__dirname, "views"));
  }
  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/alunos", alunoRoutes);
    this.app.use("/emprestimos", emprestimosRoutes);
    this.app.use("/livros", livroRoutes);
  }
}

export default new App().app;
