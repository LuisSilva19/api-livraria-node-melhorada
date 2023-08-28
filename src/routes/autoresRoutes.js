import express from "express";
import AutorController from "../controllers/autoresController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autores
 *   description: Rotas para gerenciamento de autores.
 */

/**
 * @swagger
 * /autores:
 *   get:
 *     summary: Listar autores
 *     description: Retorna uma lista de autores.
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Lista de autores.
 */
router.get("/autores", AutorController.listarAutores);

/**
 * @swagger
 * /autores/{id}:
 *   get:
 *     summary: Buscar autor por ID
 *     description: Retorna um autor com base no ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Dados do autor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propriedades do autor
 */
router.get("/autores/:id", AutorController.listarAutorPorId);

/**
 * @swagger
 * /autores:
 *   post:
 *     summary: Cadastrar autor
 *     description: Cadastra um novo autor.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             // Esquema do corpo da requisição
 *     tags: [Autores]
 *     responses:
 *       201:
 *         description: Autor cadastrado com sucesso.
 */
router.post("/autores", AutorController.cadastrarAutor);

/**
 * @swagger
 * /autores/{id}:
 *   put:
 *     summary: Atualizar autor
 *     description: Atualiza os dados de um autor existente.
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
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso.
 */
router.put("/autores/:id", AutorController.atualizarAutor);

/**
 * @swagger
 * /autores/{id}:
 *   delete:
 *     summary: Excluir autor
 *     description: Exclui um autor existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Autor removido com sucesso.
 */
router.delete("/autores/:id", AutorController.excluirAutor);

export default router;
