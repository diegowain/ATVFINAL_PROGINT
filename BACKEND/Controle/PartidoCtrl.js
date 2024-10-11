import Partido from "../Modelo/partido.js";

export default class PartidoCtrl {
  gravar(requisicao, resposta) {
    if (requisicao.method == "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const sigla = dados.sigla;
      const registro = dados.registro;

      if (nome && sigla && registro) {
        const partido = new Partido(nome, sigla, registro);

        partido
          .incluir()
          .then(() => {
            resposta.status(201).json({
              status: true,
              mensagem: "Partido incluido com sucesso",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao incluir partido: " + erro.message,
            });
          });
      } else {
        resposta.status(405).json({
          status: false,
          mensagem: "Requisição inválida",
        });
      }
    }
  }
  
  alterar(requisicao, resposta) {
    if (
      requisicao.method == "PUT" ||
      (requisicao.method == "PATCH" && requisicao.is("application/json"))
    ) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const sigla = dados.sigla;
      const registro = dados.registro;
      if (nome && sigla && registro) {
        const partido = new Partido(nome, sigla, registro);
        partido
          .alterar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Partido alterado com sucesso",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao alterar partido: " + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Requisição inválida",
        });
      }
    } else {
      resposta.status(405).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  excluir(requisicao, resposta) {
    if (requisicao.method == "DELETE" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;

      if (nome) {
        const partido = new Partido(nome);
        partido
          .excluir()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Partido excluido com sucesso",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao excluir partido: " + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Requisição inválida! Informe a sigla do partido",
        });
      }
    } else {
      resposta.status(405).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  consultar(requisicao, resposta) {
    let termoBusca = requisicao.params.termoBusca || "";
    console.log("Consulting partidos with term:", termoBusca);

    if (requisicao.method === "GET") {
      const partido = new Partido();
      partido
        .consultar(termoBusca)
        .then((respostaAPI) => {
          console.log("Response API:", respostaAPI);
          if (respostaAPI.length > 0) {
            return resposta.status(200).json({
              status: true,
              listaPartido: respostaAPI,
            });
          }
          return resposta.status(404).json({
            status: false,
            mensagem: "No partidos found.",
          });
        })
        .catch((erro) => {
          return resposta.status(500).json({
            status: false,
            mensagem: "Error while consulting partido: " + erro.message,
          });
        });
    } else {
      return resposta.status(405).json({
        status: false,
        mensagem: "Invalid request method",
      });
    }
  }
}
