import sql from "mssql";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { Conex } from "../Conexion/baseDatos.js";

export const obtenerDatos = async (req, res) => {
    const conx = await Conex();
    const { correo, contrasena } = req.body;
    console.log(correo, contrasena);

    const result = await conx.request()
        .input("correo", sql.VarChar, correo)
        .input("contrasena", sql.VarChar, contrasena)
        .execute("Validar_usuario");

    if (!result.recordset[0].mensaje) {
        const { id, rol } = result.recordset[0];
        const token = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Expira en 1 día
                id,
                rol
            },
            "rol");
        const serialized = serialize("mytoken", token, {
            httpOnly: true, 
            secure: true, 
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000 
        });         
        res.setHeader("Set-Cookie", serialized);
        return res.json({ id, rol });
    }
    res.json({ message: "Usuario no existe" });
};

export const Veificar = (req, res) => {
    const token = req.cookies.mytoken;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Token no encontrado" });
    }
    jwt.verify(token, 'rol', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token no válido" });
        }
        res.json({ message: 'Acceso concedido', user: decoded.rol });
    });
};
