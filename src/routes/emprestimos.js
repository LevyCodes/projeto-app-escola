import { Router } from "express";
import emprestimoController from "../controllers/emprestimoController.js";

const router = Router();

router.get("/", emprestimoController.index);
router.post("/", emprestimoController.cadastrarEmprestimo);
router.get("/:id/editar", emprestimoController.editar);
router.put("/:id", emprestimoController.atualizar);
router.delete("/:id", emprestimoController.devolver);

export default router;
