import { Router } from "express";
const router = Router();
router.get("/home", (req, res)=>{
    res.send("hola")
    console.log("entrando a la ruta principal")
})

export default router