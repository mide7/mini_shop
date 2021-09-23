import express from "express"
import connect from "./db/connect"
import dotenv from "dotenv"
import productRoutes from "./routes/products.routes"
import authRoutes from "./routes/auth.routes"


const app: express.Application = express()
dotenv.config()
const port = +process.env.PORT as number
const host = process.env.HOST as string



// --------------- MIDDLEWARES -----------------------
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// ---------------- END OF MIDDLEARES ----------------


// ---------------------- ROUTING -----------------------------
// app.use("/products", productRoutes)
app.use("/auth", authRoutes)
// ------------------- END OF ROUTING --------------------------



app.listen(port, host, () => {
    console.log(`TypeScript with Express http://${host}:${port}/`)
    connect()
})