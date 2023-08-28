import { autores } from "../models/index.js";
import log from "../config/logger.js";


class AutorController {

  static listarAutores = async (req, res) => {
    const autoresFind = await autores.find();
    log.info(autoresFind);
    res.status(200).send(autoresFind);
  };

  static listarAutorPorId = async (req, res) => {
    const id = req.params.id;

    try {
      const autoresFindId = await autores.findById(id);
      if (!autoresFindId) {
        log.error("Autor não encontrada.");
        res.status(404).send({ message: "Autor não encontrada." });
      } else {
        log.info(autoresFindId);
        res.status(200).send(autoresFindId);
      }
    } catch (err) {
      log.error(err.message);  
      res.status(500).send({ message: `${err.message} - Falha ao buscar Autos por ID.` });
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      const autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (err) {
      log.error(err.message);
      res.status(500).send({ message: `${err.message} - falha ao cadastrar Autor.` });
    }
  };
  
  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (err) {
      log.error(err.message);
      res.status(500).send({ message: err.message });
    }
  };
  
  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (err) {
      log.error(err.message);
      res.status(500).send({ message: err.message });
    }
  };
  
}

export default AutorController;