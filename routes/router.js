import { Router } from "express";
import { obtenerDatos, Veificar } from "../controllers/controladores.js";
const router = Router();
router.post("/credenciales", obtenerDatos )
router.get("/verificar", Veificar)
export default router