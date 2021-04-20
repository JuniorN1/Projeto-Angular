import { Router } from 'express';
import PrestadorController from '../controller/PrestadorController';
import LoginController from '../controller/LoginController';
import ContratoController from '../controller/ContratoController';
import CepController from '../controller/CepController';
import UfsCidadesController from '../controller/UfsCidadesController';
import Auth from '../auth'
const router = Router();
const auth                  = new Auth();
const prestadorController   = new PrestadorController();
const loginController       = new LoginController();
const contratoController    = new ContratoController();
const cepController         = new CepController();
const ufsCidadesController  = new UfsCidadesController()
router.post("/login",loginController.show);
router.get("/buscar_cep",auth.verifyAyth,cepController.show);
router.get("/carregar_ufs_cidades",auth.verifyAyth,ufsCidadesController.index);


// ROTAS PRESTADOR
router.post("/adicionar_prestador",auth.verifyAyth,prestadorController.create);
router.put("/atualizar_prestador",auth.verifyAyth,prestadorController.alter);
router.get("/listar_prestador",auth.verifyAyth,prestadorController.index);
// ROTAS CONTRATO
router.post("/adicionar_contrato",auth.verifyAyth,contratoController.create);
router.put("/atualizar_contrato",auth.verifyAyth,contratoController.alter);
router.get("/listar_contrato",auth.verifyAyth,contratoController.index);

export default router;





