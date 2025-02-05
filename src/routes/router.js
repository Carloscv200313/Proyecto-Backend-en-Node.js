import { Router } from "express";
import { obtenerDatos, Veificar } from "../controllers/controladores.js";
const router = Router();
router.post("/credenciales", obtenerDatos )
router.get("/verificar", Veificar)
router.get("/", (req,res)=>{
    res.send("Hola mayckol")
})
export default router