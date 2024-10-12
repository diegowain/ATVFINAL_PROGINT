import {Router} from "express";
import CandidatoCtrl from "../Controle/CandidatoCtrl.js";

const rotaCandidato = Router();
const ctrlCandidato = new CandidatoCtrl();

rotaCandidato
.get("/", ctrlCandidato.consultar)
.get("/:termoBusca", ctrlCandidato.consultar)
.post("/", ctrlCandidato.gravar)
.put("/", ctrlCandidato.alterar)
.patch("/", ctrlCandidato.alterar)
.delete("/", ctrlCandidato.excluir);



export default rotaCandidato;