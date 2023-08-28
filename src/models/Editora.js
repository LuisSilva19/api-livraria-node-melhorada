import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {type: String, required: true},
    livro: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "livros",
    },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"]
    }
  },
  {
    versionKey: false
  }
);

const editoras = mongoose.model("editoras", editoraSchema);

export default editoras;