import express from "express";
import editorasController from "../controllers/editorasController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Editoras
 *   description: Rotas para gerenciamento de editoras.
 */

/**
 * @swagger
 * /editoras:
 *   get:
 *     summary: Listar editoras
 *     description: Retorna uma lista de editoras.
 *     tags: [Editoras]
 *     responses:
 *       200:
 *         description: Lista de editoras.
 */
router.get("/editoras", editorasController.listaEditoras);

/**
 * @swagger
 * /editoras/{id}:
 *   get:
 *     summary: Buscar editora por ID
 *     description: Retorna uma editora com base no ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Editoras]
 *     responses:
 *       200:
 *         description: Dados da editora.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propriedades da editora
 */
router.get("/editoras/:id", editorasController.listareditoraPorId);

/**
 * @swagger
 * /editoras:
 *   post:
 *     summary: Cadastrar editora
 *     description: Cadastra uma nova editora.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             // Esquema do corpo da requisição
 *     tags: [Editoras]
 *     responses:
 *       201:
 *         description: Editora cadastrada com sucesso.
 */
router.post("/editoras", editorasController.cadastrarEditora);

/**
 * @swagger
 * /editoras/{id}:
 *   put:
 *     summary: Atualizar editora
 *     description: Atualiza os dados de uma editora existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             // Esquema do corpo da requisição
 *     tags: [Editoras]
 *     responses:
 *       200:
 *         description: Editora atualizada com sucesso.
 */
router.put("/editoras/:id", editorasController.atualizarEditora);

/**
 * @swagger
 * /editoras/{id}:
 *   delete:
 *     summary: Excluir editora
 *     description: Exclui uma editora existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Editoras]
 *     responses:
 *       200:
 *         description: Editora removida com sucesso.
 */
router.delete("/editoras/:id", editorasController.excluirEditora);

export default router;
