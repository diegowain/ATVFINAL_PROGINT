import Candidato from "../Modelo/candidato.js";

export default class CandidatoCtrl {
  gravar(requisicao, resposta) {
    if (requisicao.method == "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      const nome = dados.nome;
      const partido = dados.partido;
      const numero = dados.numero;

      if (nome && partido && numero) {
        const candidato = new Candidato(nome, partido, numero);

        candidato
          .incluir()
          .then(() => {
            resposta.status(201).json({
              status: true,
              mensagem: "Candidato incluido com sucesso",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao incluir candidato: " + erro.message,
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
      const partido = dados.partido;
      const numero = dados.numero;
      if (nome && partido && numero) {
        const candidato = new Candidato(nome, partido, numero);
        candidato
          .alterar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Candidato alterado com sucesso",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao alterar candidato: " + erro.message,
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
        const candidato = new Candidato(nome);
        candidato
          .excluir()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Candidato excluido com sucesso",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao excluir candidato: " + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Requisição inválida! Informe o partido do candidato",
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
    console.log("Consultar candidatos com:", termoBusca);

    if (requisicao.method === "GET") {
      const candidato = new Candidato();
      candidato
        .consultar(termoBusca)
        .then((respostaAPI) => {
          console.log("Response API:", respostaAPI);
          if (respostaAPI.length > 0) {
            return resposta.status(200).json({
              status: true,
              listaCandidato: respostaAPI,
            });
          }
          return resposta.status(404).json({
            status: false,
            mensagem: "Nenhum candidato encontrado.",
          });
        })
        .catch((erro) => {
          return resposta.status(500).json({
            status: false,
            mensagem: "Erro ao consultar candidato: " + erro.message,
          });
        });
    } else {
      return resposta.status(405).json({
        status: false,
        mensagem: "Requisição invalida.",
      });
    }
  }
}
