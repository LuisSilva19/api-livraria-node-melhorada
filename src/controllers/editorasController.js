import log from "../config/logger.js";
import { editoras } from "../models/index.js";

class editorasController {
  static listaEditoras = async (req, res) => {
    try {
      const newEditoras = await editoras.find();
      log.info(newEditoras);
      res.status(200).json(newEditoras);
    } catch (err) {
      log.error(err.message);
      res.status(500).send({ message: `${err.message} - Falha ao buscar editoras.` });
    }
  };
    
  static listareditoraPorId = async (req, res) => {
    const id = req.params.id;
    
    try {
      const editoraFindId = await editoras.findById(id);
      if (!editoraFindId) {
        log.error("Editora não encontrada.");
        res.status(404).send({ message: "Editora não encontrada." });
      } else {
        log.info(editoraFindId);
        res.status(200).send(editoraFindId);
      }
    } catch (err) {
      log.error(err.message);
      res.status(500).send({ message: `${err.message} - Falha ao buscar editora por ID.` });
    }
  };
    
  static async cadastrarEditora(req, res) {
    try {
      let editoraSave = new editoras(req.body);
      await editoraSave.save();
      log.info(editoraSave);
      res.status(201).send(editoraSave.toJSON());
    } catch (err) {
      log.error(err.message);
      res.status(500).send({ message: `${err.message} - falha ao cadastrar Editora.` });
    }
  }

  static atualizarEditora = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedEditora = await editoras.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      
      if (updatedEditora) {
        log.info(updatedEditora);
        res.status(200).send({ message: "Editora atualizada com sucesso", editora: updatedEditora });
      } else {
        log.error("Editora não encontrada");
        res.status(404).send({ message: "Editora não encontrada" });
      }
    } catch (err) {
      log.error(err.message);
      res.status(500).send({ message: err.message });
    }
  };
      
    
  static excluirEditora = async (req, res) => {
    try {
      const id = req.params.id;
      
      const deletedEditora = await editoras.findByIdAndDelete(id);
      
      if (deletedEditora) {
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        res.status(404).send({ message: "Autor não encontrado" });
      }
    } catch (err) {
      log.error(err.message);
      res.status(500).send({ message: err.message });
    }
  };
    
}

export default editorasController;