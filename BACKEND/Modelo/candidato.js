import conectar from "../DAO/Conexao.js";
import CandidatoDAO from "../DAO/CandidatoDAO.js";

export default class Candidato {
  #nome;
  #partido;
  #numero;

  constructor(nome, partido, numero) {
    this.#nome = nome;
    this.#partido = partido;
    this.#numero = numero;
  }

  get nome() {
    return this.#nome;
  }
  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get partido() {
    return this.#partido;
  }
  set partido(novoPartido) {
    this.#partido = novoPartido;
  }

  get numero() {
    return this.#numero;
  }
  set numero(novoNumero) {
    this.#numero = novoNumero;
  }

  toString() {
    return `Nome: ${this.#nome} 
                Partido: ${this.#partido}
                Numero do Candidato: ${this.#numero} 
`;
  }

  toJSON() {
    return {
      nome: this.#nome,
      partido: this.#partido,
      numero: this.#numero,
    };
  }

  async incluir() {
    const canDAO = new CandidatoDAO();
    await canDAO.gravar(this);
  }

  async alterar() {
    const canDAO = new CandidatoDAO();
    await canDAO.alterar(this);
  }
  async excluir() {
    const canDAO = new CandidatoDAO();
    await canDAO.excluir(this);
  }

  async consultar(termoBusca) {
    const canDAO = new CandidatoDAO();
    return await canDAO.consultar(termoBusca);
  }
}
