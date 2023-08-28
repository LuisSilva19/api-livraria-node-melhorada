import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import log from "../config/logger.js";

async function paginar(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

    let [campoOrdenacao, ordem] = ordenacao.split(":");
    log.info(campoOrdenacao);
    log.info(ordem);

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = res.resultado;

    if (limite > 0 && pagina > 0) {
      log.info(resultado);

      const resultadoPaginado = await resultado.find()
        .sort({ [campoOrdenacao]: ordem })
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();

      log.info(resultadoPaginado);
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (erro) {
    log.error(erro);
    next(erro);
  }
}

export default paginar;