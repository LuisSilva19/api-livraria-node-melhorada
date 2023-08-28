import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Rotas para gerenciamento de livros.
 */

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Listar todos os livros
 *     description: Retorna uma lista de todos os livros cadastrados.
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número máximo de livros por página.
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: Número da página a ser retornada.
 *       - in: query
 *         name: ordenacao
 *         schema:
 *           type: string
 *         description: Ordenação dos resultados.
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de todos os livros.
 */
router.get("/livros", LivroController.listarLivros, paginar);


/**
 * @swagger
 * /livros/busca:
 *   get:
 *     summary: Buscar livros por filtro
 *     description: Retorna uma lista de livros com base nos filtros especificados.
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número máximo de livros por página.
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: Número da página a ser retornada.
 *       - in: query
 *         name: ordenacao
 *         schema:
 *           type: string
 *         description: Ordenação dos resultados.
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros de acordo com os filtros.
 */
router.get("/livros/busca", LivroController.listarLivroPorFiltro, paginar);


/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Buscar livro por ID
 *     description: Retorna um livro com base no ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Dados do livro.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propriedades do livro
 */
router.get("/livros/:id", LivroController.listarLivroPorId);

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cadastrar livro
 *     description: Cadastra um novo livro.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             // Esquema do corpo da requisição
 *     tags: [Livros]
 *     responses:
 *       201:
 *         description: Livro cadastrado com sucesso.
 */
router.post("/livros", LivroController.cadastrarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualizar livro
 *     description: Atualiza os dados de um livro existente.
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
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso.
 */
router.put("/livros/:id", LivroController.atualizarLivro);

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Excluir livro
 *     description: Exclui um livro existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Livro removido com sucesso.
 */
router.delete("/livros/:id", LivroController.excluirLivro);

export default router;
