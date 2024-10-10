import conectar from "../DAO/Conexao.js"
import PartidoDAO from "../DAO/PartidoDAO.js"

export default class Partido{

    #nome
    #sigla
    #registro

    constructor(nome, sigla, registro){
        this.#nome = nome
        this.#sigla = sigla
        this.#registro = registro
       

    }

    get nome (){
        return this.#nome
    }
    set nome (novoNome){
        this.#nome = novoNome
    }

    get sigla (){
        return this.#sigla  
    }
    set sigla (novoSigla){
        this.#sigla = novoSigla
    }

    get registro (){
        return this.#registro
    }
    set registro (novoRegistro){
        this.#registro = novoRegistro
    }

    toString(){
        return `Nome: ${this.#nome} 
                Sigla: ${this.#sigla}
                Numero de Registro: ${this.#registro} 
`
    }

    toJSON(){
        return {
           nome: this.#nome,
           sigla: this.#sigla,
           registro: this.#registro

        }
    }

    async incluir(){
        const parDAO = new PartidoDAO();
        await parDAO.gravar(this);
    }

    async alterar(){
        const parDAO = new PartidoDAO();
        await parDAO.alterar(this);
    }
    async excluir(){
        const parDAO = new PartidoDAO();
        await parDAO.excluir(this);
    }


    async consultar (termoBusca) {
        const parDAO = new PartidoDAO();
        return await parDAO.consultar(termoBusca)
   
    }

}