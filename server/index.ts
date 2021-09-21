import express from "express";

const app: express.Application = express();

const port = process.env.PORT || 4100;

app.listen(port, ()=>{
    console.log(`TypeScript with Express
    http://localhost:${port}/`);
});