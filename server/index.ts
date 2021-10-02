import express from "express"
import connect from "./db/connect"
import dotenv from "dotenv"
import csurf from "csurf"
import productRoutes from "./routes/products.routes"
import authRoutes from "./routes/auth.routes"
import brandRoutes from "./routes/brands.routes"
import cartRoutes from "./routes/cart.routes"
import categoryRoutes from "./routes/categories.routes"
import session from "express-session"
import MongoDBStore from "connect-mongodb-session"
import cors from "cors"
const mongoStore = MongoDBStore(session)


const app: express.Application = express()
dotenv.config()
const port = +process.env.PORT as number
const host = process.env.HOST as string

const csrfProtection = csurf()


// --------------- MIDDLEWARES -----------------------
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

declare module 'express-session' {
    export interface SessionData {
        isLoggedIn: boolean;
    }
}

app.use(session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        uri: process.env.DBURI,
        collection: process.env.SESSIONCOLLECTION,
        databaseName: process.env.DBNAME
    })
}))
// app.use(csrfProtection)
// app.use((req, res, next) => {
//     res.locals.isAuth = req.session.isLoggedIn
//     res.locals.cToken = req.csrfToken()
//     next()
// })
// ---------------- END OF MIDDLEARES ----------------


// ---------------------- ROUTING -----------------------------
// app.get("/form", csrfProtection, (req, res) => {
//     res.send({ csrfToken: req.csrfToken() })
// })
app.use("/products", productRoutes)
app.use("/auth", authRoutes)
app.use("/brands", brandRoutes)
app.use("/categories", categoryRoutes)
app.use("/cart", cartRoutes)
// ------------------- END OF ROUTING --------------------------



app.listen(port, host, () => {
    console.log(`TypeScript with Express http://${host}:${port}/`)
    connect()
})