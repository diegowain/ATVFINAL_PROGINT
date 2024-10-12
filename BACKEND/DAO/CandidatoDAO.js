import conectar from "../DAO/Conexao.js";
import Candidato from "../Modelo/candidato.js";
export default class CandidatoDAO {
  constructor() {
    this.init();
  }

  async init() {
    try {
      const conexao = await conectar();
      const sql = `
        CREATE TABLE IF NOT EXISTS candidato (
            nome VARCHAR(255) NOT NULL,
            partido VARCHAR(255) NOT NULL,
            numero INT NOT NULL
        );`;
      await conexao.execute(sql);
      await global.poolConexoes.releaseConnection(conexao);
      console.log("O Banco de Dados foi iniciado");
    } catch (erro) {
      console.log("O Banco de Dados não foi iniciado");
    }
  }

  async gravar(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql = `INSERT INTO candidato (nome, partido, numero) VALUES (?, ?, ?)`;
      const parametros = [candidato.nome, candidato.partido, candidato.numero];
      await conexao.execute(sql, parametros);
      await global.poolConexoes.releaseConnection(conexao);
    }
  }

  async alterar(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql = `UPDATE candidato SET nome = ?, numero = ? WHERE partido = ?`;
      const parametros = [candidato.nome, candidato.numero, candidato.partido];
      await conexao.execute(sql, parametros);
      await global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(candidato) {
    if (candidato instanceof Candidato) {
      const conexao = await conectar();
      const sql = `DELETE FROM candidato WHERE nome = ?;`;

      const parametros = [candidato.nome];

      await conexao.execute(sql, parametros);
      await global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(termoBusca) {
    let sql = "";
    let parametros = [];

    if (termoBusca) {
      sql = `SELECT * FROM candidato WHERE partido = ? ORDER BY nome`;
      parametros.push(termoBusca);
    } else {
      sql = `SELECT * FROM candidato ORDER BY nome`;
    }

    const conexao = await conectar();

    const [registros] = await conexao.execute(sql, parametros);
    let listaCandidato = [];

    for (const registro of registros) {
      const candidato = new Candidato(
        registro.nome,
        registro.partido,
        registro.numero
      );
      listaCandidato.push(candidato);
    }

    await global.poolConexoes.releaseConnection(conexao);
    return listaCandidato;
  }
}