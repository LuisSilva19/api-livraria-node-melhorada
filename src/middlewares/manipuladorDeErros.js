import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros (erro, req, res, next) {
  switch (true) {
  case erro instanceof mongoose.Error.CastError:
    new RequisicaoIncorreta().enviarResposta(res);
    break;
  case erro instanceof mongoose.Error.ValidationError:
    new ErroValidacao(erro).enviarResposta(res);
    break;
  case erro instanceof ErroBase:
    erro.enviarResposta(res);
    break;
  default:
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;