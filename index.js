import express from "express"
import router from "./routes/router.js"
const app = express()
const port = 3000
app.use("/api",router)

app.listen(port, () => {
    console.log(`Escuchando el puerto ${port}`)
})