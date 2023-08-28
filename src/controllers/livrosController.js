import { autores, livros } from "../models/index.js";
import log from "../config/logger.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros
        .find()
        .populate({ path: "autor", select: "nome", options: { _id: 0 } })
        .populate({ path: "editora", select: "nome", options: { _id: 0 } });

      res.resultado = buscaLivros;

      log.info(buscaLivros);
      next();
    } catch (err) {
      console.log("error");
      log.error(err.message);
      next(err);    
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      const livro = await livros.findById(id).populate("autor", "nome");
  
      if (!livro) {
        res.status(404).send({ message: "Livro não encontrado" });
      } else {
        res.status(200).send(livro);
      }
    } catch (err) {
      log.error(err.message);
      next(err);    
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      const livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (err) {
      log.error(err.message);
      next(err);    
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      log.info("Livro atualizado com sucesso");
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (err) {
      log.error(err.message);
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      log.info("Livro removido com sucesso" );
      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (err) {
      log.error(err.message);
      next(err);    
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      const livrosFind = await livros.find({ "editora": editora });
      log.info(livrosFind);
      res.status(200).send(livrosFind);
    } catch (err) {
      log.error(err.message);
      next(err);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      log.info("entrou");
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = await livros
          .find(busca)
          .populate("autor");

        req.resultado = livrosResultado;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;