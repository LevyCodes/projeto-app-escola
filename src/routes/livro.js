import { Router } from "express";
import livroController from "../controllers/livroController.js";

const router = Router();

router.get("/", livroController.index);
router.post("/", livroController.store);
router.get("/:id/editar", livroController.editar);
router.put("/:id", livroController.atualizar);
router.delete("/:id", livroController.excluir);

export default router;
